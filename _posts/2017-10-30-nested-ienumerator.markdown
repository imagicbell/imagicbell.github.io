---
layout: post
title:  "Unity协程：解决嵌套IEnumerator导致多一帧的问题"
date:   2017-10-30 15:00:00 +0800
categories: Unity/C#
---



在Unity中，我们经常会用到Coroutine。利用C#语言提供的IEnumerator特性，它提供了很多便利：

* 方便实现延时，`yield return new WaitForSeconds()`；
* 方便实现异步，一个方法不限于在一帧内执行；
* 方便实现重入，在一个方法的执行过程中可插入执行另一个方法，并等待执行结束后返回到当前方法的中断点继续执行。

在此不加赘述使用方法，可参考[官方文档](https://docs.unity3d.com/Manual/Coroutines.html)，并且这里有一篇不错的[博文](https://www.alanzucconi.com/2017/02/15/nested-coroutines-in-unity/)。

这里我主要介绍一下我在使用的过程中遇到的一个问题，以及解决办法。

### Why One More Frame

下面看一个例子：

测试代码

```c#
IEnumerator Task1()
{		
    Debug.Log(">>>Task1---1---" + Time.time);
    yield return Task2(false);

    Debug.Log(">>>Task1---2---" + Time.time);
    yield return Task2(true);

    Debug.Log(">>>Task1---3---" + Time.time);
}

IEnumerator Task2(bool skip)
{
    Debug.Log(">>>Task2---1---skip: " + skip + "  " + Time.time);
    if (!skip)
        yield return 0;
    Debug.Log(">>>Task2---2---skip: " + skip + "  " + Time.time);
}

IEnumerator Start () 
{
    yield return new WaitForSeconds(1);
    StartCoroutine(Task1());
}
```

Log输出

![]({{ "/assets/img-coroutine/Log1.png" | absolute_url }})

从Log中可以看出，当`Task2`里没有执行任何`yield return`时，返回到`Task1`时仍然等了一帧往下执行。

那么问题来了：是不是嵌套一次`yield return IEnumerator`就要至少花费一帧呢？我稍微改动了测试代码：

```c#
IEnumerator Task1()
{
    Debug.Log(">>>Task1---begin---" + Time.time);
    yield return Task2();
    Debug.Log(">>>Task1---end---" + Time.time);
}
IEnumerator Task2()
{
    Debug.Log(">>>Task2---1---" + Time.time);
    if (counter++ < 3)
        yield return Task2();
    Debug.Log(">>>Task2---2---" + Time.time);
}
```

Log输出

![]({{ "/assets/img-coroutine/Log2.png" | absolute_url }})

并没有！无论迭代嵌套多少次`Task2`都没有叠加一帧，而只是第一次返回调用点放在了下一帧执行。

再次改动测试代码：

```c#
IEnumerator Task1()
{
    Debug.Log(">>>Task1---begin---" + Time.time);
    while (counter2++ < 2)
    {
        counter = 0;
        Debug.Log(">>>Task1---1---" + Time.time + "---count2: " + counter2);
        yield return Task2();
        Debug.Log(">>>Task1---2---" + Time.time + "---count2: " + counter2);
    }	
    Debug.Log(">>>Task1---end---" + Time.time);
}
IEnumerator Task2()
{
    Debug.Log(">>>Task2---begin---" + Time.time);
    yield return Task3();
    Debug.Log(">>>Task2---end---" + Time.time);
}
IEnumerator Task3()
{
    Debug.Log(">>>Task3---begin---" + Time.time+ "---count: " + counter);
    if (counter++ < 1)
        yield return Task3();
    Debug.Log(">>>Task3---end---" + Time.time+ "---count: " + counter);
}
```

Log输出

![]({{ "/assets/img-coroutine/Log3.png" | absolute_url }})

可以看出，无论怎么深入、迭代嵌套下去，第一次返回调用点（yield return）总是在下一帧执行。这就带来了一个问题，当在最上层多次调用`yield return IEnumerator`，并且下层在嵌套调用时并没有真正执行`yield return Coroutine/YieldInstruction/null/value`时，就会多出不必要的帧，可能会导致与预期结果的偏差。我在[实现Blockly Code Runner]({% post_url 2017-10-22-blockly-three %})时遇到了这个问题，因为采用了协程的方式执行Block的解释方法，但是一部分Block的解释方法是没有yield return的，理应执行完后立即执行下一个Block的方法，实际上却等了一帧。

了解Coroutine执行原理的都知道，它是依赖于IEnumerator运作的，在Unity Monobehavior的一个生命周期中的某个时间点执行`MoveNext()`，返回`false`则结束。如果遇到嵌套IEnumerator调用，则应该是将其推入栈顶，先执行嵌套，等待执行完后推出。从这里可以推断出，推出后返回上一层IEnumerator后，需要在下一帧执行`MoveNext()`返回`false`才结束，因此才产生了这个问题。



### Solution

鉴于以上反推出的可能原因，我修改了执行代码，在嵌套IEnumerator执行结束后立即推出并返回上一层，并且上一层立即执行`MoveNext()`，做到嵌套IEnumerator的推入、推出都是在一帧内连续的，只有在遇到除了IEnumerator外的yield return才等待。测试结果达到预期。

```c#
IEnumerator SimulateCoroutine(IEnumerator itorFunc)
{
    Stack<IEnumerator> stack = new Stack<IEnumerator>();
    stack.Push(itorFunc);
    while (stack.Count > 0)
    {
        IEnumerator itor = stack.Peek();
        bool finished = true;
        while (itor.MoveNext())
        {
            if (itor.Current is IEnumerator)
            {
                stack.Push((IEnumerator) itor.Current);
                finished = false;
                break;
            }

            yield return itor.Current;
        }

        if (finished)
        {
            stack.Pop();
        }
    }
}
```

第三个测试代码Log输出

![]({{ "/assets/img-coroutine/Log4.png" | absolute_url }})

可能我的理解和推导不完全正确，如果错误，欢迎指出～