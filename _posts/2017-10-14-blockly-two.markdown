---
layout: post
title:  "Google Blockly Reimplementation with Unity/C#(2)"
date:   2017-10-14 12:00:00 +0800
categories: Unity/C#
---

## Google Blockly Model

核心Model模块完全参考Google Blockly。正如[前文框架图]({% post_url 2017-10-11-blockly-one %}#framework_design)所示，Blockly主要包括模型：`Workspace`,`Variable`, `Block`, `Connection`, `Input`, `Field`。

* Workspace相当于一个容器，包含Blocks, Variables。
  * 一个Workspace可以存储为一个Xml文件，保留Blocks之间的连接关系，以及属性信息。反过来也可以从一个格式正确的Xml文件重建一个Workspace。
  * Code Generator&Interpreter从遍历一个Workspace的顶层Block开始，根据Blocks之间的连接关系依次深度优先向下执行。
  * 一个Workspace在UI上显示为可供编辑Block的区域，其中还包含一个Toolbox，提供Block原型的容器。

* Variable是作用在一个Workspace中的全局变量。

* Block代表一段可执行程序。
  * 类比于一个方法，可以有输出（作为另一个Block的输入使用），也可以是没有输出（作为一个命令接在另一个Block下面执行）。
  * Blocks之间的关系有两种：输入/输出，前/后。Blocks在一个Workspace中的结构如下：
    ```
    hierarchy of blocks:

    - Block(Topmost in workspace)
      - ConnectionOutput
      - ConnectionPrev
      - ConnectionNext
        - Block(Next)
      - Input
        - Field 
        - Field 
          ...
        - ConnectionInput
          - Block(Input)
      - Input
        ...
    - Block
      ...
    - Block
      ...
    ```

* Connection是实现Blocks之间的连接的关键，方式如下： 

  *todo*

  ```
  Block.ConnectionOutput -> Block.Input.ConnectionInput
  Block.ConnectionPrev <-> Block.ConnectionNext
  ```

* Input

* Field




### Mutator特性

