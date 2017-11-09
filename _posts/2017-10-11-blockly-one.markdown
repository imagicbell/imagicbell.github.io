---
title:  "Google Blockly Reimplementation With Unity/C#(1)"
date:   2017-10-11 20:00:00 +0800
categories: Unity
---



## 前言

现在所在的公司，是一家专注儿童科技、娱乐、教育的公司，而**编程**是时下比较热门的一个寓教于乐的领域，因此在公司项目中占比很高。公司初期的编程项目采用的是“自己造的轮子”，功能覆盖范围窄，扩展性小，无法满足后期越来越复杂多变的编程需求，因此决定借鉴[Google Blockly](https://developers.google.com/blockly/)。

Google Blockly现开发的有3个版本：

* Web： 支持动态生成`JavaScript`, `Python`, `PHP`, `Lua`, `Dart`，直接在浏览器中跑`JavaScript`。
* iOS/Android: 动态生成`JavaScript`，然后嵌入js runtime跑生成代码。

直接在Unity中使用Google Blockly有几个问题：

* Web版本需要借助第三方插件。
* iOS/Android版本需要通过插件的方式接入，扩展block的复杂度极高。
* 无法支持Unity的特性，例如Coroutine。
* 无法使用UGUI，UI交互设计灵活性低。

因此，我们决定参考Google Blockly的设计思路，用C#重新实现一套Blockly，目标是在Unity、.Net环境中使用。



## Demo 展示

![]({{ "/assets/img-blockly/Demo.png" | absolute_url }}) ![]({{ "/assets/img-blockly/DemoLog.png" | absolute_url }})



## <a id="framework_design">框架设计</a>

框架分三个模块：Blockly Model、Code Generator & Interpreter、UI，原则是以**Model**为核心驱动，模块彼此独立，开发者可自定义后面两个模块。

![Module]({{ "/assets/img-blockly/ModuleDesign.png" | absolute_url }})



## 使用、扩展

1. 使用json定义Block结构。
2. 如果使用C#，解释该Block为执行代码(code interpreter)。
3. 如果使用Lua，为该Block生成Lua代码(code generator)。
4. 如果是特殊的block（带有变形功能），需要提供可供编辑变形的UI。



接下来的博文会详细提供做法，以及难点解决方案。

