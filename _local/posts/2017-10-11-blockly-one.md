---
title:  "Google Blockly Reimplementation With Unity/C#(1)"
date:   "2017-10-11T20:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
locale: cn
---



## Contents

1. Introduction
2. [Blockly Model]({%POST_URL%}/2017-10-14-blockly-two)
3. [Code Generator, Interpreter and Runner]({%POST_URL%}/2017-10-22-blockly-three)
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)

For English:

1. [Introduction]({%POST_URL%}/2021-6-10-ublockly-introduction)
2. [Blockly Model]({%POST_URL%}/2021-6-11-ublockly-model)
3. [Code Interpreter and Runner]({%POST_URL%}/2021-6-12-ublockly-interpreter-runner)
4. [UGUI Design]({%POST_URL%}/2021-6-13-ublockly-ugui)

<br>



## 前言

之前在公司接触了两款带可视化编程的项目，其编程实现不是很理想，扩展性小，无法满足后期越来越复杂多变的编程需求。当我了解了[Google Blockly](https://developers.google.com/blockly/)之后，决定尝试实现一套Unity的版本。

Google Blockly现开发的有3个版本：

* Web： 支持动态生成`JavaScript`, `Python`, `PHP`, `Lua`, `Dart`，直接在浏览器中跑`JavaScript`。
* iOS/Android: 动态生成`JavaScript`，然后嵌入js runtime跑生成代码。

直接在Unity中使用Google Blockly有几个问题：

* Web版本需要借助第三方插件。
* iOS/Android版本需要通过插件的方式接入，扩展block的复杂度极高。
* 无法支持Unity的特性，例如Coroutine。
* 无法使用UGUI，UI交互设计灵活性低。



## Demo 展示

![](/blog/assets/img-blockly/Demo.png) 



## 框架设计

框架分三个模块：Blockly Model、Code Generator & Interpreter、UI，原则是以**Model**为核心驱动，模块彼此独立，开发者可自定义后面两个模块。

![Module](/blog/assets/img-blockly/ModuleDesign.png)



## 使用、扩展

1. 使用json定义Block结构。
2. 如果使用C#，解释该Block为执行代码(code interpreter)。
3. 如果使用Lua，为该Block生成Lua代码(code generator)。
4. 如果是特殊的block（带有变形功能），需要提供可供编辑变形的UI。



接下来的博文会详细提供做法，以及难点解决方案。
