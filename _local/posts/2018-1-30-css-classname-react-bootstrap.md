---
title:  "Customize CSS Class In React-Bootstrap Under CSS-Modules"
date:   "2018-01-30T13:00:00+08:00"
categories: Front-End
---



For a quick start, I used [**electron-react-boilerplate**](https://github.com/chentsulin/electron-react-boilerplate) as the basis for developing my tiny **smart-todo** app, which however brought me some trouble with css class names.

1. css won't work when assigning class names of string type directly to 'className' prop of the react component.
2. css won't work when customizing css class of the children inside the react component.

After a hard search and try, I found the reason and solution.

First I will introduce some concept and packages.

#### 1. css in react

There are basically 2 ways to style in react components:

1. **[regular css stylesheets](https://reactjs.org/docs/faq-styling.html)**

   By importing css stylesheets files, we can pass a string as the `className` prop of a component.

   Class names can be multiple. There's an effective package [classnames](https://github.com/JedWatson/classnames) for conditionally joining classNames together.

2. **[inline styles](https://reactjs.org/docs/dom-elements.html#style)**

   We can pass a js object as the `style` prop of the component.

#### 2. [css-modules](https://github.com/css-modules/css-modules)

A css module is a CSS file in which all class names and animation names are scoped locally by default. It added additional naming strategies to the class names, which can also customized by developers themselves.

```
/* home.css */
.container {
  ...
}
.mainSection {
  ...
}
.toolSection {
  ...
}
```

```javascript
import styles from './home.css'

...
<div className={styles.container}>
  <div className={styles.mainSection}><MainSection/></div>
  <div className={styles.toolSection}><ToolSection/></div>
</div>
...
```

![](/blog/assets/img-css-classnames/css-module-name.png)

In webpack config, the <a id="webpack-cssmodule">naming strategy</a> can be customized:

```javascript
{
  test: /^((?!\.global).)*\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      }
    },
  ]
},
```

It also provide a way to speicify `global` and `local` to the selectors in a css module.

```
:global(.globalclassname) {
  ...
}
:local(.localclassname) {
  ...
}
```

If `global` specified, the selector is scoped globally, whose identifier name will not be changed by the naming strategy.

#### 3. [react-css-modules](https://github.com/gajus/react-css-modules)

By introducing css-modules, there are some annoy limitations for styling components. This is a convinient utility to make up for the disadvantages. 

I used the light package called **[babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)**,  as it has a lot smaller performance overhead and fullfills my requirements.

I can modify the example above as follows:

```javascript
import './home.css'

...
<div styleName='container'>
  <div styleName='mainSection'><MainSection/></div>
  <div styleName='toolSection'><ToolSection/></div>
</div>
...
```

**Attention here!** See [How does it work](https://github.com/gajus/babel-plugin-react-css-modules#how-does-it-work).

The `styleName` will be parsed to the `className` finally. If the result className doesn't meet the rules of the css-modules naming strategy, the right css style will not be found. So a configuration in `.babelrc` is required:

```javascript
"plugins": [
  ["react-css-modules", {
    "generateScopedName":"[name]__[local]__[hash:base64:5]"
  }]
],
```

The value of `generateScopedName` should be the same as that of `localIdentName` decribed [above](#webpack-cssmodule).



#### Solutions to the 2 Questions 

1. In **electron-react-boilerplate**, it uses css-modules. So all selectors defined in `*.css` files are locally scoped and changed by name, whereby the string value directly passed to the `className` don't match the changed selector's name. 

   We should use `className={styles.classname}`, or we can ask [react-css-modules](https://github.com/gajus/react-css-modules) for help.

2. The child component of a react component sometimes is classNamed with a globally scoped class (see some source code examples in [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap). If we want to override the styles, we can't specify the selector's name directly in a css module because it is locally scoped and will be changed name. 

   We should use `:global(.classname)` instead.



#### Analogy between css and shader

As before I wrote some shaders for Unity games, it is seemly same annoying to write css styles. They are both used to define the looks of elements to render. They are both difficult to debug like scripts. Maybe most of fresh developers waste lots of time in try. But after working out a friendly style, it is considerably satified. How do you think?

