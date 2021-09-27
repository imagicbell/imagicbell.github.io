---
title:  "The Blockly Model of uBlockly - Reimplementation of Google Blockly in Unity"
date:   "2021-06-11T20:00:00+08:00"
categories: "Unity"
ogImage: /blog/assets/img-blockly/Demo.png
---



## Contents

1. [Introduction]({%POST_URL%}/2021-6-10-ublockly-introduction)
2. Blockly Model
3. [Code Interpreter and Runner]({%POST_URL%}/2021-6-12-ublockly-interpreter-runner)
4. [UGUI Design]({%POST_URL%}/2021-6-13-ublockly-ugui)

For Chinese:

1. [Introduction]({%POST_URL%}/2017-10-11-blockly-one)
2. [Blockly Model]({%POST_URL%}/2017-10-14-blockly-two)
3. [Code Interpreter and Runner]({%POST_URL%}/2017-10-22-blockly-three)
4. [UGUI Design]({%POST_URL%}/2017-10-31-blockly-four)

<br>



The Blockly Model is translated from Google Blockly. As showed [here]({%POST_URL%}/2021-6-10-ublockly-introduction#section-modularization), the main models include: `Workspace`,`Variable`, `Block`, `Connection`, `Input`, `Field`.

#### Workspace

A workspace is a container for blocks and variables.

* A workspace can contain multiple excutable programs made by blocks connecting one another. 
* The variables are shared and consistent inside a workspace. 

A workspace can be serialized into an **XML** file. The process can be reversed.

Code Runner starts from the top blocks of the workspace and executes the interpreter of each block in a depth-first manner.

#### Variable

Variables are global in a workspace. They are stored in a dictionary, where the key is a unique name for indexing and the value is the real value of that variable.

#### Block

A block represents a piece of executable program.

A block acts like a function. It can either have a return, which can be used as an input for another block, or no return, which can be executed after another block.

Thus, the connections between blocks are defined as two: 

* input/output
* previous/next

The structure of a block is like this:

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

#### Connection

The connection is how blocks are mutually connected.

  ```
  Block.ConnectionOutput <-> Block.Input.ConnectionInput
  Block.ConnectionPrev <-> Block.ConnectionNext
  ```

#### Input

As shown in the above block structure, apart from connections, inputs are the elementary units that form a block. 

An input consists of multiple fields and a connection for the input block. 

If an input doesn't need to connect an input block, it is called *dummy input*.

The inputs are built in the order defined in the [Block JSON Definition](#section-block-json-definition). Let's see an example:

```
"message0": "%{BKY_COROUTINE_WAIT_TITLE} %1 %2",
"args0": [
  {
    "type": "input_value",
    "name": "TIME",
    "check": "Number"
  },
  {
    "type": "field_dropdown",
    "name": "UNIT",
    "options": [
      ["%{BKY_TIME_UNIT_MILLISECOND}", "MILLISECOND"],
      ["%{BKY_TIME_UNIT_SECONDS}", "SECONDS"],
      ["%{BKY_TIME_UNIT_MINUTES}", "MINUTES"],
      ["%{BKY_TIME_UNIT_TOO_HIGH}", "TOOHIGH"]
    ]
  }
],
```

This block will be rendered as below:

![](/blog/assets/img-blockly/JsonDef_1.png)

The `message0` defines the shape of the block.

* `%{BKY_COROUTINE_WAIT_TITLE}`: the key for multi-language translations.
* `%1`: `input_value`
* `%2`: `field_dropdown`

So the block has two inputs:

1. `input_value` for an input block.
2. *dummy input*. Because the last `field_dropdown` has no input after it, we append a dummy input to hold this field.

#### Field

Fields defind the properties or states of a block. In the above example, 

`field_dropdown` provides a dropdown menu for selecting the time units.

There are more fields, like `field_variable`, `field_number`, `field_textinput` and so on. More customized fields can be added.



## Block JSON Definition

The format of a Block JSON Definition:

```
"type": "[CategoryName]_[BlockName]",
"message0": [Message],
"args0":[
    {
        "type": [Type]
        "name": [Name]
        "message": [ArgMessage]
        "check": [Check]
        "variable": [Variable]
        "options": [Options]
    },
    ...
],
"message1": [Message]
"args1":[
      {
        "type": [Type]
        "name": [Name]
        "message": [ArgMessage]
        "check": [Check]
        "variable": [Variable]
        "align": [Align]
        "options": [Options]
    },
    ...
]
....
"messageN: [Message],
"argsN": [
    ...
],
"previousStatement": [PreviousStament],
"nextStatement": [NextStatement],
"output": [Output],
"inputsInline": [InputsInline],
"mutator" :  [Mutator],
"colour" : [Colour],
```

* `type`: the unique id for identifying a block. It follows the format `[CategoryName]_[BlockName]`.
* `messageN`: defines the shape of a line in the block.
* `argsN`: list the inputs and fields corresponding to `messageN`.
* `previousStatement`:  whether it has a previous connection.
* `nextStatement`: whether it has a next connection.
* `output`: whether it returns a value, which means that it can act as an input block.
* `inputsInline`: whether the inputs are aligned in one line. This is for UI display.
* `mutator`: whether it has a [mutation feature](#section-mutation). This feature will be explained later in this article.

Here is an example:

```
"type": "controls_whileUntil",
"message0": "%1 %2",
"args0": [
  {
    "type": "field_dropdown",
    "name": "MODE",
    "options": [
      ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
      ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]
    ]
  },
  {
    "type": "input_value",
    "name": "BOOL",
    "check": "Boolean"
  }
],
"message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
"args1": [{
  "type": "input_statement",
  "name": "DO"
}],
"previousStatement": null,
"nextStatement": null,
"colour": "%{BKY_LOOPS_HUE}",
```

It results:

![](/blog/assets/img-blockly/JsonDef_2.png)

[This doc](https://hackmd.io/@beBvDP44ShyK5VorFbhGcw/H1Qbb1HBu#Create-a-new-block) provides a detailed explaination and instruction on the JSON definition.



## Mutation

First we see an example.

![](/blog/assets/img-blockly/Mutator_IfElse_1.png)

This is a `if` condition program. What if we need a `if/else`, or `if/elseif/else`, `if/elseif/elseif/...../else`. Do we have to add a JSON definition for each? 

Obviously not. This is where **mutation** comes out.

Let's see the JSON definition:

```
"type": "controls_if",
"message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
"args0": [
  {
    "type": "input_value",
    "name": "IF0",
    "check": "Boolean"
  }
],
"message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
"args1": [
  {
    "type": "input_statement",
    "name": "DO0"
  }
],
"previousStatement": null,
"nextStatement": null,
"colour": "%{BKY_LOGIC_HUE}",
"mutator": "controls_if_mutator",
```

We add a `mutator` which has a value `controls_if_mutator`. This is used to identify which mutation feature this block uses. We need to implement the behavior for each mutation feature. 

In our `controls_if_mutator`, we enable to configure how many `elseif` there is, and whether there is a `else`. Then the block will be mutated according to the configuration.

![](/blog/assets/img-blockly/Mutator_IfElse_3.png)

![](/blog/assets/img-blockly/Mutator_IfElse_2.png)

### Procedure(function)

Functions, which is called procedures in Google Blockly, are implemented based on mutation. A procedure is configured with a name and inputs.

![](/blog/assets/img-blockly/Mutator_Procedure_1.png)

The above configuration produces a `swap` function, which has two arguments, `x` and `y`.

![](/blog/assets/img-blockly/Procedure_1.png)

There are two types of procedures: 

* *Procedure Definition*: use mutation to define the function.
* *Procedure Call*: make a function call defined by *Procedure Definition*, passing in arguments. After configuring a *Procedure Definition*, a *Procedure Call* is produced in the *Toolbox*, which can be dragged out to make the function call.

### Customize Mutation

More mutation features can be added by

1. add the `mutator` property in the JSON definition.

2. implement the mutator behavior (reference the existing mutators).

   
