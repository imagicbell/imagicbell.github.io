---
title:  "Introduction of uBlockly - Reimplementation of Google Blockly in Unity"
date:   "2021-06-10T20:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
---



## Contents

1. Introduction
2. [Blockly Model]({%POST_URL%}/2021-6-11-ublockly-model)
3. [Code Interpreter and Runner]({%POST_URL%}/2021-6-12-ublockly-interpreter-runner)
4. [UGUI Design]({%POST_URL%}/2021-6-13-ublockly-ugui)

For Chinese:

1. [Introduction]({%POST_URL%}/2017-10-11-blockly-one)
2. [Blockly Model]({%POST_URL%}/2017-10-14-blockly-two)
3. [Code Interpreter and Runner]({%POST_URL%}/2017-10-22-blockly-three)
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)



<br>



Block-based programming language has seen a growing popularity nowadays, both in Kids' education and Robot for fun industries. [Google Blockly](https://developers.google.com/blockly/) has provided a fundamental solution facilitating building flexible and interactive Web Block-based Programming Apps. So I decided to move it to Unity. However, due to the incompatibility and dissimilarity of the two platforms, I have to reimplement the core logic in C#, and provide specific impementations for the code runner and UI, which make up [UBlockly](https://github.com/imagicbell/ublockly).



## Showcase

![](/blog/assets/img-blockly/Demo.png)



## Modularization

UBlockly consists of 3 modules: Blockly Model, Code Interpreter and Runner, UI. 

Blockly Model is the core logic, which is translated from Google Blockly. 

Code Interpreter is *IEnumerator*-based mechanism for interpreting block behaviors in C# functions. Code Runner is a controllable runtime for running those interpreters.

UI is implemented in UGUI, facilitating automatic block generation and dynamic layout.

The details of these 3 modules will be given in the [following 3 blogs](#section-contents).

![Module](/blog/assets/img-blockly/ModuleDesign.png)

## How to Use

Check [README](https://github.com/imagicbell/ublockly#readme) for how to use this cool project!

