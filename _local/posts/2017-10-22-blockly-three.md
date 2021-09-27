---
title:  "Google Blockly Reimplementation with Unity/C#(3)"
date:   "2017-10-22T16:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
locale: cn
---



## Contents

1. [Introduction]({%POST_URL%}/2017-10-11-blockly-one)
2. [Blockly Model]({%POST_URL%}/2017-10-14-blockly-two)
3. Code Generator, Interpreter and Runner
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)

For English:

1. [Introduction]({%POST_URL%}/2021-6-10-ublockly-introduction)
2. [Blockly Model]({%POST_URL%}/2021-6-11-ublockly-model)
3. [Code Interpreter and Runner]({%POST_URL%}/2021-6-12-ublockly-interpreter-runner)
4. [UGUI Design]({%POST_URL%}/2021-6-13-ublockly-ugui)

<br>



## Code Generator, Interpreter and Runner

对于像Google Blockly一样使用动态语言，那么**Generator**就足够了。我们在Unity中支持了Lua，但是考虑到Lua对Unity特性使用的局限性，以及性能问题，我们决定提供一套**C# Interpreter&Runner**的解决方案。

### Generator

Generator是将Block翻译成动态脚本的一套解决方案。根据Block Model的属性、状态、连接（见[Block Model详解]({%POST_URL%}/2017-10-14-blockly-two)），将Block翻译成对应的代码。

为一个Workspace生成代码时，首先从Top block开始调用对应的代码生成方法，如遇到有其他block作为该block的输入，则嵌套调用输入block的代码生成方法，并处理返回的赋值。完成后继续调用next block的代码生成方法，直到最后。

经过Generator处理后，Workspace被翻译成了一串Lua脚本的字符串，在Unity中使用[uLua](https://github.com/topameng/tolua)执行即可。

#### Naming机制

为了防止命名冲突，以及错误使用语言的关键词(keyword)，维护了一个Naming机制。

1. 加后缀：分别在变量名、函数名后加指定的后缀，避免冲突及关键词使用；
2. 加数字：在相同命名后加数字区分，避免重命名；



### Interpreter

因为C#是静态语言，不能像Lua, JavaScript一样动态执行生成代码，因此需要将Block解释成C#的执行方法，我们称之为Block的Interpreter。相应的，也是通过Block Model的属性、状态、连接来进行解释的。

#### IEnumerator的使用

重点介绍下，我在实现Interpreter时使用的一个C#特性：IEnumerator。为什么要用？原因主要有两点：

1. Block执行的过程性，不限于一帧；
2. Blocks之间的连接性，需要解释方法可重入。


以下是部分摘自for-loop block的解释代码：

```c#
protected override IEnumerator Execute(Block block)
{
    int repeats = int.Parse(block.GetFieldValue("TIMES"));
    for (int i = 0; i < repeats; i++)
    {
        yield return CSharp.Interpreter.StatementRun(block, "DO");
    }
}
```

其中展示了围绕IEnumerator使用设计的三个方面：

1. Block的解释方法返回IEnumerator，供嵌套调用，实现可重入。

2. Block的解释方法是类方法，因为需要保存数据、状态，也便于复杂Block解释程序的扩展。

3. 嵌套调用需要返回执行结果数据的Block的解释方法时，使用了`CustomEnumerator`类，它继承自IEnumerator，并且可以携带数据。

   ```c#
   public class CustomEnumerator : IEnumerator
   {
       private IEnumerator mItor;
   
       public Cmdtor Cmdtor { get; set; }
       public DataStruct Data { get { return Cmdtor.Data; } }
   
       public CustomEnumerator(IEnumerator itor)
       {
           mItor = itor;
       }
   
       public bool MoveNext()
       {
           return mItor.MoveNext();
       }
   
       public void Reset()
       {
           mItor = null;
       }
   
       public object Current
       {
           get { return mItor.Current; }
       }
   }
   ```

   以上for-loop block的解释代码中，当`TIMES`是另一个Block的输出时，可以通过`CustomEnumerator`来异步获取：

   ```c#
   protected override IEnumerator Execute(Block block)
   {
       CustomEnumerator ctor = CSharp.Interpreter.ValueReturn(block, "TIMES", new DataStruct(0));
       yield return ctor;
       DataStruct repeatData = ctor.Data;
       int repeats = (int) repeatData.NumberValue.Value;
       //...
   }
   ```

   

#### Data In Blockly

因为JavaScript动态类型的特性，并且基本类型只包括：Boolean, Number, String, Object，因此Google Blockly在生成代码时不需要考虑数据类型，这一切交给JavaScript的runtime interpreter就行。同理Lua。

但是C#是静态类型并且强类型的，因此我们在解释Block时需要对数据类型加一层处理，和一点约束。

我们为Blockly定义了5个数据类型： `Undefined`,  `Boolean`, `Number`, `String`, `List`，并且定义了`DataStruct`用来包裹数据。

##### Undefined

表示未定义数据，DataStruct的默认类型。

##### Boolean

C#的原型bool类型，作为逻辑运算true、false的基本类型。

##### Number

为了统一数字类型，我们定义了一个Number类，将传入的原数据（boolean, int, float, double, string…）通过强转或解释的方式，存储为float型，并基于此重载了基本数学运算等方法。

##### String

C#的原型string类型，用作表示字符串，字符也将被转换为该类型。

##### List

C#的ArrayList，之所以用ArrayList，是因为它允许元素类型的多样化。但是在对`List`做数学运算、字符拼接等操作时，会相应的先将元素转换为统一类型。

##### DataStruct

作为包裹数据的载体，包含数据本身，和数据类型，用作解释Block时的统一数据存储类型，实现变量的动态赋值，可以看作是`var`.

Blockly中的变量在一个Workspace中是全局的，因此在解释Block时需要管理一个相对Workspace的全局数据容器，通过key:value（变量名：数据）的方式存储，并提供增删改查。

### Runner

将Blocks分别解释成对应的C#的执行方法后，需要一个Runner来运行这些方法，以及控制Start, Pause, Resume, Stop等状态。因为Block的解释方法返回的是IEnumerator，因此利用Unity的Coroutine，我们可以简单的实现部分需求。但是有两个问题:

1. 无法实现Pause, Resume的功能。
2. 直接使用StartCoroutine(IEnumerator)，在遇到嵌套IEnumerator调用时至少需要花费一帧，即使嵌套方法在实际执行中没有执行到`yield return`。

因此，我们参考Unity Coroutine的实现原理，做了适当的调整，模拟了一套满足以上需求的Runner解决方案。具体方案解析，详见[这篇]({%POST_URL%}/2017-10-30-nested-ienumerator)。



当然开发者在扩展Blocks时，只需按照既定的方式提供Block的解释方法即可。如果有更好的设计，也欢迎指出，互相学习～

