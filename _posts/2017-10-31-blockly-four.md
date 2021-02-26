---
title:  "Google Blockly Reimplementation with Unity/C#(4)"
date:   "2017-10-31T20:00:00+08:00"
categories: "Unity"
---

## UGUI Design

在设计Blockly UI时，主要考虑解决以下几个问题：

1. <a id="q1"></a>自动生成Block View，可以在Editor里预生成Prefab，也可以Runtime时动态生成GameObject。
2. <a id="q2"></a>动态Layout，根据Block View的实际计算大小，以及View之间的相互连接，实现动态布局、缩放。
3. <a id="q3"></a>动态Layout后，Block View底图的实时绘制。
4. <a id="q4"></a>独立Blockly Model模块，采用观察者模式监听Model的变化。
5. <a id="q5"></a>Block View最近连接的搜索。
6. <a id="q6"></a>可重建Workspace，可复制Block View，可变形Block View。




### Hierarchy of Views

首先，需要设计一套View Hierarchy，既能符合Block Model的结构，表现Blocks之间的Connection，又能结合UGUI Transform Hierarchy，实现动态Layout计算。

回顾[讲解Block Model的章节]({%POST_URL%}/2017-10-14-blockly-two#block)中关于Block Hierarchy的介绍，可知Block包括Connections、Inputs，而Inputs包括Fields、Connections，Connections可以连接其他Blocks，这些元素均需在UI上体现出来。在此基础上，我们还增加了一个LineGroup，因为某些Block View需要将Inputs分布在多行，LineGroup是用来包裹一行的Inputs。因此，最终的<a id="view-hierarchy">View Hierarchy</a>如下：

```
hierarchy of view:

- Block
  - ConnectionOutput
  - ConnectionPrev  
  - ConnectionNext
    - Block(Next)

  - LineGroup
    - Input
      - Field 
      - Field 
      ...
      - ConnectionInput
        - Block(Input)
    - Input
      ...
  - LineGroup
    ...
  ...
- Block
  ... 
```

#### 抽象基类BaseView

Hierarchy中的每一个元素，都是一个View，因此我们抽象了基类`BaseView`，它继承`MonoBehaviour`，管理了：

* 链式结构：Parent, Childs, Previous, Next。
* 自下而上的迭代式Layout Update，[详见这里](#layout-example1)。

#### 子类Views类型

依据[Hierarchy](#view-hierarchy)，设计了6个基本的View类型：

`BlockView`, `ConnectionView`, `LineGroupView`, `InputView`,`FieldView`, `ConnectionInputView`

其中ConnectionInputView继承自ConnectionView，在Model中都体现为Connection，但在UI表现上ConnectionInputView是包裹输入Block的，而ConnectionView是挂载Next Block。

基于这样的设计，可以很好的解决问题[1](#q1)、[2](#q2)、[3](#q3)。



### Auto Build Block View

无论是Editor预生成Prefab，还是Runtime动态生成，Block View是依赖于Block Model来生成的。依照自上而下的顺序依次创建：

*Block* -> *Connection, LineGroup* -> *Input* -> *Field* 

并且同时设置好链式关系，通过`MonoBehaviour`序列化保存下来。

### Dynamic Layout

为什么需要Dynamic Layout，它需要做什么？先看下面两个例子：

<a id="layout-example1">例1</a>

![](/blog/assets/img-blockly/Layout_1.png) -> ![](/blog/assets/img-blockly/Layout_2.png)

<a id="layout-example2">例2</a>

![](/blog/assets/img-blockly/Layout_3.png) -> ![](/blog/assets/img-blockly/Layout_4.png)

可以看出：

1. Block的Size会根据其自身Fields大小，以及其Child Blocks大小进行缩放；
2. Block自身Fields的起始位置，以及Blocks相互之间的起始位置，都会根据缩放后的大小进行重新摆放；

因此经过Dynamic Layout之后，布局更紧凑，更美观！那么如何实现的？

UGUI有一套Layout机制，是依赖于Transform Hierarchy，在每一个生命周期的Update之后统一计算的，先后不可控，因此无法根据View的依赖关系按照正确的顺序计算。

什么是正确的顺序？四个字概括：自下而上。依赖已经建立好的[Hierarchy](#view-hierarchy)，先从最小的元素Fields开始，计算起始位置和大小，然后遍历Next，依次叠加大小来计算起始位置，然后Parent，迭代下去，直到结束。代码大致如下：

```c#
Vector2 newSize = CalculateSize();
if (XY != startPos) XY = startPos;
if (Size != newSize) Size = newSize;

switch (Type)
{
    case ViewType.Field:
    case ViewType.Input:
    case ViewType.ConnectionInput:
    case ViewType.LineGroup:
    {
        if (m_Next == null)
        {
            //reach the last child, or no change in current hierarchy, update it's parent view
            m_Parent.UpdateLayout(m_Parent.SiblingIndex == 0 ? m_Parent.HeaderXY : m_Parent.XY);
        }
        else
        {
            //update next
            if (Type != ViewType.LineGroup)
            {
                // same line
                startPos.x += Size.x + BlockViewSettings.Get().ContentSpace.x;
            }
            else
            {
                // start a new line
                startPos.y -= Size.y + BlockViewSettings.Get().ContentSpace.y;
            }

            BaseView topmostChild = m_Next.GetTopmostChild();
            if (topmostChild != m_Next)
            {
                //need to update from its topmost child
                m_Next.XY = startPos;
                topmostChild.UpdateLayout(topmostChild.HeaderXY);
            }
            else
            {
                m_Next.UpdateLayout(startPos);
            }
        }
        break;
    }
    case ViewType.Connection:
    case ViewType.Block:
    {
        //no need to update its m_Next, as it is handled by Unity's Transform autolayout 
        //update its parent directly
        if (m_Parent != null)
        {
            m_Parent.UpdateLayout(m_Parent.SiblingIndex == 0 ? m_Parent.HeaderXY : m_Parent.XY);
        }
        break;
    }
}
```



### Custom Background Draw

动态Layout之后，带来的就是底图的实时绘制，当然采用了九宫格的方式，但是简单的九宫格缩放不能满足需求，看这个：

![](/blog/assets/img-blockly/Layout_5.png)

而这里只用了一张原图：

![](/blog/assets/img-blockly/Layout_6.png)

当然颜色是自定义设置的，通过UGUI Image面板设置。

其实方法很简单，参照UGUI中绘制`Image`的方法，重载`OnPopulateMesh(VertexHelper)`方法，按照九宫格的方式设置好顶点、uv，即可：

![](/blog/assets/img-blockly/Layout_7.png)  ->  ![](/blog/assets/img-blockly/Layout_8.png)

上图用圆点标记的，是由外部Layout计算好之后的每一个LineGroup的顶点min, max。分析与代码详见[这篇]({%POST_URL%}/2017-12-1-unity-image-manipulation)。

动态绘制底图还有一个好处是：不需要拼接图片，减少了资源量，并且避免了Draw Call的增加。



### Observer Pattern

因为一开始设计的初衷是Model模块完全独立于另外两个模块Interpreter、UI，如果想要移植，完全可以以Model为核心，重新设计这两个模块。因此需要实现Model模块的完全解耦，而Google Blockly Web版是将UI与Model耦合在一起了，也许并不需要考虑移植。

观察者模式，是实现UI与Model之间通信的最好方式，Model是事件的发布者，是任何变化、计算的核心，而UI是监听者，监听Model的变化更新表现，以及将用户输入转化为通知Model变化的信号。

这是个经典的设计模式，在此不再赘述。

### Binary Search Nearest

搜索最近连接，如果全局遍历所有的Connection Point，时间复杂度为*O(n)*，并且需要计算距离进行比对，无疑是一项耗cpu的操作。所幸的是Google Blockly提供了一套算法方案，二分搜索法。

二分搜索法的前提是，有序序列，因此需要对Workspace中的所有Connection Point进行排列。做法是：

1. 基于Point的`y`坐标，维护一个有序的Connection Point Map。
2. 每当Block改变时（增、删、移动），将其Connection Point插入到Map中合适的位置，这个位置也是通过二分搜索法查找，只考虑`y`坐标。

当要搜索Connection时，先通过`y`坐标找到其在Map中的位置，然后向两边查找。时间复杂度为*O(logn)*。

当要搜索最近Connection时，也是先通过`y`坐标找到其在Map中的位置，然后向两边通过比对距离来查找，也考虑Connection的兼容性（例如：数学运算符两边只允许数字输入）。时间复杂度为*O(logn)*，并且也平均减少了计算量。

### Manipulate Views

基于以上，操作Block View就变得很方便，因为自动化，动态，并且极大程度的优化了性能。

#### 重建Workspace

Model层可以将Workspace保存为Xml文件，Xml文件可以再重建Workspace（见[前文]({%POST_URL%}/2017-10-14-blockly-two#workspace_xml)）。通过Workspace中Block Models，可以动态创建Block Views，并依据Connections，以及顶层Blocks的位置，实现自动Layout。

#### 复制Block View

Workspace可以保存为Xml文件，当然是基于Block可以保存为一个Xml Node，因此复制Block可以通过将原Block保存为Xml Node，然后从Xml Node重建一个新的Block，再通过Block动态创建Block View。

#### 变形Block View

Block具有[Mutation特性]({%POST_URL%}/2017-10-14-blockly-two#mutation)，可以动态修改Block结构，因此动态生成Block View的功能为此提供了便利，可以动态增删Input Views。



UI部分还有很多可以优化，暂时先介绍这么多。当然如果有更好的设计方案，也欢迎指出，互相学习～
