---
title:  "Serialization For Dynamically Created MonoBebavior Scripts"
date:   "2017-11-08T20:30:00+08:00"
categories: "Unity"
---





在Unity项目开发过程中，特别是UI开发，我们会做一些Automation Work，提高开发效率。比如我们做了一个标记UI Element并自动生成脚本获取的功能，操作步骤如下：

1. 在制作UI Prefab时，在挂载UI Element（Button, Image, InputField...）的GameObject上挂载**UIMark** MonoBehavior Script；
2. 制作完成后，自动生成（增量式）对应每个Prefab的**UIComponents**  MonoBehavior Script，并为该Prefab下所有标记过**UIMark**的GameObject生成对应的成员变量，并且记录获取路径；
3. UI逻辑代码可以直接通过**UIComponents**的成员变量获取所需的UI Element；

看到这里，对性能有要求的同学是不是觉得有些问题？

是的，在第2步结尾，只记录*获取路径*，意味着运行时会有一次查找操作`Transform.Find(relativePath)`，才能得到目标UI GameObject，并且也并没有做到即用即取，是在`Awake()`时一起查找的，这无疑增加了Instantiate过程的时间。

于是，我采用Serialization来解决这个问题，将以上第2步结尾改为：

*在Editor模式下，直接将UI Element序列化给对应的成员变量。*

**But**，这看似很简单的task，在实现过程中却有一个棘手的问题：

*UIComponent脚本是动态生成的，需要编译之后才能进行序列化操作，而**动态生成脚本->编译->序列化**这三步，我们要求是**Done By One Click**，如何做到？*



### 解决方案

其实问题的根本，在于中间的编译环节，如何启动编译，以及如何获得编辑结束的回调？

Fortunately，强大的Unity完美的提供了解决方案：

1. 有任意脚本改变时，Unity会自动编译；

2. Unity Editor提供了一个定义回调的[方法](https://docs.unity3d.com/ScriptReference/Callbacks.DidReloadScripts.html):

   ```c#
   [UnityEditor.Callbacks.DidReloadScripts]
   private static void CallbackMethod() { }
   ```

好了，问题解决了一大半。剩下来还有一个问题：

*编译过程是异步的，因此如何连接上下文？*

换句话说：*任何脚本的改动都会引起编译，编译结束后都会有该回调，如何判断是否需要执行下一步？*

我利用了`EditorPrefs`：

1. 每次自动生成脚本后，我会将相关信息（该脚本所挂载的UI Prefab路径），增量记录在一个key值里；
2. 在编译结束后的回调中检查该key是否存在，如果存在，即对key值里保存的UI Prefab进行序列化操作。

Done!!!