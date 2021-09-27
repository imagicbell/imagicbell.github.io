---
title:  "The UGUI Design of uBlockly - Reimplementation of Google Blockly in Unity"
date:   "2021-06-13T20:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
---



## Contents

1. [Introduction]({%POST_URL%}/2021-6-10-ublockly-introduction)
2. [Blockly Model]({%POST_URL%}/2021-6-11-ublockly-model)
3. [Code Interpreter and Runner]({%POST_URL%}/2021-6-12-ublockly-interpreter-runner)
4. UGUI Design

For Chinese:

1. [Introduction]({%POST_URL%}/2017-10-11-blockly-one)
2. [Blockly Model]({%POST_URL%}/2017-10-14-blockly-two)
3. [Code Interpreter and Runner]({%POST_URL%}/2017-10-22-blockly-three)
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)

<br>



UBlockly UI is a solution to the following problems:

* **Automatic block generation**. The blocks can be automatically generated into prefabs in advance in Editor, or into gameObjects dynamically in run mode.  
* **Dynamic layout**. The layout of the workspace can be dynamically adjusted after adding, moving, deleting, and changing blocks.
* **Adjusted block background**. The background of blocks can be dynamically adjusted after changing the size or contents of the blocks.
* **Modularization**. The UI module is separated from the core logic module, as mentioned [here]({%POST_URL%}/2021-6-10-ublockly-introduction/#section-modularization), by applying observer design pattern.
* **Automatic snap**. Search the nearest connectable block, and then snap automatically.
* **Workspace reconstruction**. The workspace can be serialized into an XML file([#]({%POST_URL%}/2021-6-11-ublockly-model/#section-workspace)). Also the workspace can be reconstructed from that XML file.



## Hierarchy of Block View

First we need a block view with the hierarchy not only adapting to the [block model structure]({%POST_URL%}/2021-6-11-ublockly-model/section-block), but also working with the UGUI Transform Hierarchy to calculate the dynamic layout.

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

Compared to the structure of block model, we add  `LineGroup` inside the block view. Because there might be more than one line in a block, it is better to use a container for layout calculation.

#### Abstract BaseView

Every element in the above hierarchy is a *view*. The *view* should:

* have basic UGUI transform behaviors. 

  *It is inherited from `MonoBehavior`.*

* have *Chainable Structure*, in order to facilitate iterative traversal among blocks in a workspace. 

  *It has `Parent`,  `Childs`, `Previous`, `Next`.*

* be able to calculate the appearance dynamically, including the size for layout calculation and the background mesh.

#### All Views

There are 6 views in all.

![](/blog/assets/img-blockly/Layout_9.png)

The *Connection View* inside the *Input View* is implemented as `ConnectionInputView`. It is inherited from `ConnectionView`, which is inside a *Block View*. Apart from the basic connection behaviors, the `ConnectionInputView` also behaves like a slot, caring about the size of input blocks.



## Automatic Block Generation

Based on the structure of Block Model, a block view can be built as the hierarchy mentioned above. The building order is from top to bottom:

*Block* -> *Connection, LineGroup* -> *Input* -> *Field* 

The chainable structure is also taken into account. All the info can be serialized by `Monobehavior` into prefabs.



## Dynamic Layout

What is **Dynamic Layout** actually doing? Let's first see two examples:

[Before](/blog/assets/img-blockly/Layout_1.png) -> ![After](/blog/assets/img-blockly/Layout_2.png)

![Before](/blog/assets/img-blockly/Layout_3.png) -> ![After](/blog/assets/img-blockly/Layout_4.png)

We can see that

1. The size of blocks is changable to adjust the size of the content inside.
2. The positions of each content inside a block and the connections between blocks are updated accordingly.

As a result, it makes the layout of the workspace look natural and compact.

We know that UGUI itself can calculate the layout automatically by appropriate settings of the `RectTransform`. But it does not work here, because we need a specific order to calculate the positions and sizes of each element based on the *Chainable Structure*.

The order is *From-Bottom-to-Top*. Remember we mentioned above in [Abstract BaseView](#section-abstract-baseview), that every element is a view and the view has *Chainable Structure*. Thus here we forget about whether it is a block, or an input, or a field. They are all views with positions, sizes, parents, childs, previous, and next. With the *Chainable Structure* we iteratively update the positions and sizes of all elements that are affected util reaching the root element.

![](/blog/assets/img-blockly/Layout_10.png)

```
public void UpdateLayout(Vector2 startPos)
{
    XY = startPos;
    Size = CalculateSize();

    switch (Type)
    {
        case ViewType.Field:
        case ViewType.Input:
        case ViewType.ConnectionInput:
        case ViewType.LineGroup:
        {
            if (m_Next == null /*|| (!changePos && !changeSize)*/)
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
}
```



## Adjusted Background

After the block views are dynamically layouted, their background should be re-rendered to fit the content as well. It relies on a technique called [9-slicing](https://docs.unity3d.com/Manual/9SliceSprites.html). 

However, the default 9-slicing method does not work here. Let's first see an example:

![](/blog/assets/img-blockly/Layout_5.png)

We only need one raw image to render above backgrounds.

![](/blog/assets/img-blockly/Layout_6.png)

The solution is pretty simple. We override the function `OnPopulateMesh(VertexHelper)` in UGUI `Image`. In this function, we calculate vertices and uvs for each 9-slicing. [This article]({%POST_URL%}/2017-12-1-unity-image-manipulation) gives details on the implementation。

![](/blog/assets/img-blockly/Layout_7.png)  ->  ![](/blog/assets/img-blockly/Layout_8.png)

This solution has following pros:

* save resources.
* reduce drawcalls.



## Observer Pattern

Observer design pattern is a common technique to facilitate the communication between models and views. We will save words on the details here.



## Binary Search Nearest

When dragging a block, we provide the ability to automatically snap the block to the nearest connectable block. This involves the search algorithm. A straightforward search algorithm is to traverse all connection  points one by one. It takes time $O(n)$, which is obviously of not good performance. Google Blockly came out with a more optimal algorithm, *binary search*.

One primary condition of binary search is that the sequence is ordered. Thus we need to order all the connection points in advance. The solution is:

1. Connection points are ordered only by `y` coordinates. This means that connection points with same `y` are put together.
2. Each time a connection is added or changed, we use binary search to find the appropriate position in the array for this connection.

3. To search the nearest connection, we use binary search to find a position in the array, and then search forwards and backwards from that position util beyond the range for the shortest distance. In this process, the compatibility between connections are also taken into account.

The time complexity is $O(logn)$. In the meantime, the amount of distance calculation is largely reduced.



## Workspace Reconstruction

The features of automatic block generation and dynamic layout facilitate the workspace reconstruction from XML file. The process is:

1. XML content is deserialized into a workspace. *Block Model*.
2. Block views are generated from Block Models. From the topmost blocks of the workspace, generate block views iteratively until reaching the last one.
3. Connect blocks based on the connection data, and use dynamic layout to calculate the final positions and sizes.



<br>

The entire UI solution is inspired by the flow design of HTML file. Technologies are mutually linked:smile:.

