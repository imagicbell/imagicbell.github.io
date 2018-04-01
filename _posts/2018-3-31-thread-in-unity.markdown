---
title:  "Use Thread In Unity"
date:   2018-3-31 13:00:00 +0800
categories: Unity
---



It's been a long time since my last blog, as I've recently spent plenty of time to save a dying project that my ex-colleague left. When confronted with a file transferring bug, I found some essential caveats in Thead usage in Unity. 

As we all know that, Unity has its own main thread, where all its lifecycle functions and features are been executed. In early time, we were told not to use **thread**, but **coroutine** as much as possible, because Unity is not thread-safe. However, coroutine can't always play the role whereas it runs at specific period during the lifecycle in main thread. Consider the scenario of those executions blocking the thread. If we do the socket connecting in main thread, the app will be stuck. So we should feel free to use thread correctly and safely in Unity.

The bug I fixed was about stopping the thread. I found that calling `Thread.Abort()` to stop the previous thread and `Thread.Start()` to start a new thread with the same task function afterwards will cause unexpected results in the variables in the task function. 

```c#
Thread taskThread;

void Task()
{
  //do something, and have local variables.
  while(true)
  {
    //...
  }
}

void StartTask()
{
  if (taskThread != null && taskThread.IsAlive)
	taskThread.Abort();
  taskThread = new Thread(Task);
  taskThread.Start();
  //there appears some unexpected results in local variables in Task()
}

//called somewhere in Unity's monobehavior
StartTask();
```

Maybe I should wait a while to check `Thread.IsAlive` after calling `Thread.Abort()`. But there is a [best way to stop the thread](https://social.msdn.microsoft.com/Forums/en-US/e3e443e1-09a0-435a-8124-6fc19d9bd759/best-way-to-stop-a-thread?forum=csharpgeneral). Set a boolean flag! Calling `Thread.Abort()` may throw a `ThreadAbortException` exceptions. So my solution is as below:

```c#
bool runThread = false;
Thread taskThread;
Coroutine startTaskCoroutine;

void Task()
{
  //do something, and have local variables.
  while(runThread)
  {
    //...
  }
}

IEnumerator StartTask()
{
  runThread = false;
  while(taskThread != null && taskThread.IsAlive)
  	yield return null;
  
  runThread = true;
  taskThread = new Thread(Task);
  taskThread.Start();
}

//called somewhere in Unity's monobehavior
if (startTaskCoroutine != null)
  StopCoroutine(startTaskCoroutine);
startTaskCoroutine = StartCoroutine(StartTask());
```



### Conclusion

* When should we use **thread** instead of **coroutine**?
  1. Executions blocking the main thread.
  2. Complicated calculations that could be run in background.
  3. Communications with a native code plugin without Unity APIs.
* What the caveats are?
  1. Avoid Unity APIs in custom threads.
  2. Use boolean flag to stop the thread instead of `Thread.Abort()`.
  3. Be attention with the usage of [`lock()`](https://www.cnblogs.com/lionwang/p/4643706.html).