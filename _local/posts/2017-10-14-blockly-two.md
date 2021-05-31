---
title:  "Google Blockly Reimplementation with Unity/C#(2)"
date:   "2017-10-14T12:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
locale: cn
---

## Contents

1. [Introduction]({%POST_URL%}/2017-10-11-blockly-one)
2. Blockly Model
3. [Code Generator, Interpreter and Runner]({%POST_URL%}/2017-10-22-blockly-three)
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)

<br>



## Google Blockly Model

核心Model模块完全参考Google Blockly。正如[前文框架图]({%POST_URL%}/2017-10-11-blockly-one#section-框架设计)所示，Blockly主要包括模型：`Workspace`,`Variable`, `Block`, `Connection`, `Input`, `Field`。

* Workspace相当于一个容器，包含Blocks, Variables。
  * 一个Workspace可以存储为一个<a id="workspace_xml">Xml</a>文件，保留Blocks之间的连接关系，以及属性信息。反过来也可以从一个格式正确的Xml文件重建一个Workspace。
  * Code Generator&Interpreter从遍历一个Workspace的顶层Block开始，根据Blocks之间的连接关系依次深度优先向下执行。
  * 一个Workspace在UI上显示为可供编辑Block的区域，其中还包含一个Toolbox，提供Block原型的容器。

* Variable是作用在一个Workspace中的全局变量。

* <a id="block">Block</a>代表一段可执行程序。
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

  ```
  Block.ConnectionOutput -> Block.Input.ConnectionInput
  Block.ConnectionPrev <-> Block.ConnectionNext
  ```

* Input是Block的基本单元。

  * 一个Input包含若干Field，以及一个Connection用来连接输入Block。

  * 依照json定义Block的描述，按顺序创建Input。

    <a id="json_message">一个例子：</a>

    ```
    "message0": "%1 %2 %{BKY_LISTS_SPLIT_WITH_DELIMITER} %3"
    ```

    * `%1`: field_dropdown
    * `%2`: input_value
    * `%{BKY_LISTS_SPLIT_WITH_DELIMITER}`: 多语言的key
    * `%3`: input_value

    因此该Block有两个Input:

    1. 包括field_dropdown，Input Connection；
    2. 包括field_label（文字用label实现），Input Connection；

* Field描述Block的属性、状态，拿上例解释：

  * field_dropdown：提供menu选择，不同选项代表了该Block执行不同的功能，比如算术运算的`+`, `-`, `*`, `/`。
  * field_label: 提供文字表达，用来补充描述该Block的功能。

  除此之外，还有`field_variable`, `field_number`, `field_textinput`等，开发者也可自己定义。




### Json语义定义

一个Block是由json语义来定义的，主要有如下属性：

* type，用来识别Block的类型标识符；
* Input/Field，如[上例](#json_message)，以及对每个field, input属性、输入类型的描述；
* Block Output Connection，或者Previous/Next Connection；
* UI背景色；
* <a id="json-special-define">特殊属性</a>；

开发者可通过自定义Json描述，来定义一个新的Block。



### Mutation特性

上文Json定义中提到了[特殊属性](#json-special-define)，其中Mutation就是一个，它提供了动态修改Block结构的功能。

IF/ELSE就是一个典型的需要Mutation的例子：

​	![初始结构](/blog/assets/img-blockly/Mutator_IfElse_1.png) => ![Mutate后结构](/blog/assets/img-blockly/Mutator_IfElse_2.png)

用户在编辑时，只需要指定`else if`的个数，以及是否有`else`，Mutation根据这些变量重构Block结构。

#### 函数

**Mutation**特性给**函数Block**的实现提供了便利。

下图定义了一个Swap(x, y)的函数，调用结果为将传入的x, y的值互换。

![函数实现](/blog/assets/img-blockly/Procedure_1.png)

函数Block（Google Blockly称“Procedure”）分为两大类：

* 函数声明*Procedure Definition*: 利用Mutation功能可以允许用户定义函数名、参数，供所在的Workspace全局调用。见上图右。
* 函数调用*Procedure Call*: 对应每个声明的函数，都会自动定义一个函数调用Block供用户选择。Block中只包含函数名、参数Input，见上图左；

#### 自定义Mutation

开发者可以定义更多的Mutation，而具体Mutation的功能需自己实现。



以上简单介绍了Blockly的模型结构，下一篇博文会介绍Code Generator, Interpreter 以及 Runner的实现方法。