---
title:  "How To Build My Own Website (3) - Style"
date:   "2021-03-14T20:00:00+08:00"
categories: Front-End
excerpt: This article illustrates how I style my own website using Tailwindcss framework and making theme color configurable.
---



## Tailwindcss

When considering styling, what comes in my mind is to choose a CSS framework. [Tailwindcss](https://tailwindcss.com/) wins against other popular frameworks, like [Bootstrap](https://getbootstrap.com/) and [Foundation](https://get.foundation/). The main reasons are:

1. I have used **Bootstrap** for beginning, as it is the most widely used CSS framework and has [React supported](https://react-bootstrap.github.io/). However, I found it is too powerful, making customization difficult. 

2. I haven't used **Foundation**. I am happy to try it, but it seems a little hard to start with. 

3. **Tailwindcss** is light, and most importantly it is highly customizable. As it says:

     >Rapidly build modern websites without ever leaving your HTML.
     >
     >A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.

4. I am familiar with the raw CSS styles. **Tailwindcss** pre-defines almost all the common styles in so called **utility classes**. So I can quickly style an element without writing any CSS code. Besides, VSCode has [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) to help me quickly tap utility classes.

Below is an example of using **tailwindcss** in my website.

```html
<div className="text-xs text-theme-meta absolute bottom-2 flex flex-col sm:flex-row sm:items-center">
  <DateFormatter dateString={post.date} />
  <Dot className="mx-2 border-theme-meta hidden sm:block"/>
  <span>{`${post.readTime}min read`}</span>
</div>
```

In this block of code, I used 

1. [customized color](https://tailwindcss.com/docs/customizing-colors): `theme-meta`, so `text-theme-meta` makes the color of the text as I defined.
2. [responsive design](https://tailwindcss.com/docs/responsive-design): `sm:flex-row sm:items-center`, so the `flex-direction` is `col` when the screen width is smaller than 640px, otherwise `row`, and the `align-items` is `start` when the screen width is smaller than 640px, otherwise `center`.



## Theme Color Configurable

As **Tailwindcss** enables highly customization, I can define my own favor [theme](https://tailwindcss.com/docs/theme) in `tailwind.config.js`. This configuration file is javascript, which means I can use variables, functions, etc. So it is easy to make my theme color configurable.

```javascript
const colors = require('tailwindcss/colors');
const themeColor = colors.red;

module.exports = {
  theme: {
    extend: {
      colors: {
        theme: {
          meta: colors.coolGray[500],
          link: {
            DEFAULT: themeColor[500],
            highlight: themeColor[700],
            disable: themeColor[400],
          },
          bg: {
            DEFAULT: themeColor[300],
            light: themeColor[200],
            strong: {
              DEFAULT: themeColor[500],
              text: colors.white,
            }
          },
          border: {
            DEFAULT: themeColor[300],
          },
          line: {
            DEFAULT: themeColor[200]
          }
        },
      },
    },
  },
}
```

So if I change the `themeColor` from `colors.red` to `colors.lightBlue`, the result will be like this:

![](/blog/assets/img-my-website/5.jpg)

It looks also pretty cool. The color can be any color you what, in **hex** or **rgb**.

In addition to `colors`, there are many more properties can be extended or overrided, like `padding`, `fontSize`, `boxShadow`, etc. For details, check the [doc](https://tailwindcss.com/docs/theme).

 