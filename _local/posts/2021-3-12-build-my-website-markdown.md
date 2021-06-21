---
title:  "How To Build My Own Website (2) - Markdown"
date:   "2021-03-12T20:00:00+08:00"
categories: Front-End
---



## Contents

1. [The choice of Next.js]({%POST_URL%}/2021-3-10-build-my-website-nextjs)
2. Parse and Display Markdown
3. [Style my website]({%POST_URL%}/2021-3-14-build-my-website-style)
4. [Image Optimization]({%POST_URL%}/2021-6-5-build-my-website-image-opti)

<br>



Parsing and displaying **Markdown** files are one of the most important things in building a personal website, because all my blogs are written in Markdown. This article illustrates several things that I did in processing Markdown files.

## Parse YAML Front Matter

**[ gray-matter](https://github.com/jonschlinkert/gray-matter)** is a useful tool to parse [YAML](https://yaml.org/) front matter. As my old Blog Website is built by [Jekyll](https://jekyllrb.com/), which supports parsing YAML by default, all my blog posts used YAML to carry meta information, like this:

```yaml
---
title:  "How To Build My Own Website (2) - Markdown"
date:   "2021-03-12T20:00:00+08:00"
categories: Front-End
---
```

with **gray-matter** parsing:

```javascript
import matter from 'gray-matter';

const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
```

the `data` object is the result of parsing front-matter, and the `content` is the post content with front-matter stripped.

```json
data: {
  title: "How To Build My Own Website (2) - Markdown",
  date: "2021-03-12T20:00:00+08:00",
  categories: "Front-End",
},	
```

<a id="excerpt"></a>The object returned by **gray-matter** also has a `excerpt` property, which can extract excerpt from Markdown files if excerpt is provided in a [specified format](https://github.com/jonschlinkert/gray-matter#optionsexcerpts). However, my old posts didn't have excerpt, and it takes time to fill it again. So I decide to extract several lines of the first paragraph as the excerpt, see [below](#section-extract-plain-text) for details.

## Convert Markdown To HTML

I chose [showdown](https://github.com/showdownjs/showdown) to help me convert **Markdown** content to **HTML**. The [Next.js tutorial](https://nextjs.org/learn/basics/dynamic-routes/render-markdown) uses [remark](https://github.com/remarkjs/remark) library, which is also cool. However, I prefer **showdown**, because：

1. it has the most stars in Github.

2. it has plenty of [options](https://github.com/showdownjs/showdown#valid-options) for me to tweak the result of HTML.

3. it has **[Github Flavored Markdown](https://github.com/showdownjs/showdown#flavors)**. 

     ```javascript
     showdown.setFlavor('github');
     ```

4. it enables defining [extensions](https://github.com/showdownjs/showdown/wiki/extensions#creating-showdown-extensions), so I can manipulate the internal links among posts. The below extension enables `{%POST_URL%}/2021-3-10-build-my-website-nextjs` to jump to my previous post.

     ```javascript
     extensions: [
      {
        type: 'lang',
        regex: /\{\%\s*POST_URL\s*\%\}/g,
        replace: '/posts'
      },	
     ],
     ```

## Github Flavored Style

I am used to **Github Flavored Markdown** style. However, I also use [tailwindcss](https://tailwindcss.com/) as the styling framework in my website. It has default styles which is not suitable for Markdown. So I use [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) to override the default style, making it Github Flavored. The usage is simple. Import it where the Markdown content renders.

```javascript
import 'github-markdown-css/github-markdown.css';

export default function MarkdownContent({ content }) {
	return (
		<div
			className="markdown-body"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
```

*There is a little tweak here. After I apply this .css, I found all the `list-style` are gone, like this:*

![](/blog/assets/img-my-website/2.jpg)

*After debugging with the browser developer tools, I found that the `list-style` is given `none` by **tailwindcss**, and [github-markdown-css](https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css) doesn't override it.*

![](/blog/assets/img-my-website/3.jpg)

![](/blog/assets/img-my-website/4.jpg)

*So I added a [Component-Level CSS](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) to override the tailwindcss.*

```css
.markdown ol {
  list-style: decimal; 
}
.markdown ul {
  list-style: disc;
}
```

```javascript
import 'github-markdown-css/github-markdown.css';
import markdownStyles from './markdown-styles.module.css';

export default function MarkdownContent({ content }) {
	return (
		<div
			className={`markdown-body ${markdownStyles.markdown}`}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
```

 

## Render [LaTeX](https://www.latex-project.org/) Math

[showdown](https://github.com/showdownjs/showdown) doesn't have a built-in **LaTex** parser. Fortunately there is an extension called [showdown-katex](https://github.com/obedm503/showdown-katex) that renders [LaTeX](https://www.latex-project.org/) math and [AsciiMath](http://asciimath.org/) using [KaTeX](https://khan.github.io/KaTeX/). For usage, add it to the `extensions`'s array in the `showdown.Converter`'s construction function:

```javascript
import showdownKatex from 'showdown-katex';

extensions: [
  showdownKatex({
    delimiters: [
      { left: "$", right: "$" },
    ],
  }),   
],
```



## Extract Plain Text

As mentioned [above](#excerpt), I need to extract several lines of the first paragraph as the excerpt. However, in spite of the plain text, Markdown contains syntax, which shouldn't be counted. So **how to count the plain text in Markdown**?

Thanks to **[mdast](https://github.com/syntax-tree/mdast)**, which stands for **M**ark**d**own **A**bstract **S**yntax **T**ree, the Markdown content can be converted to a syntax tree. Then I can extract only text value by traversing all nodes in the tree. In my case, I only take into account those nodes with a `value` property. For example,

```javascript
//text
{type: 'text', value: 'This is text'}

//code
{
  type: 'code',
  lang: 'javascript',
  meta: 'highlight-line="2"',
  value: 'foo()\nbar()\nbaz()'
}

//inline code
{type: 'inlineCode', value: 'foo()'}
```

Below are examples of nodes without a `value` property.

```javascript
//paragraph
{
  type: 'paragraph',
  children: [{type: 'text', value: 'This is text'}]
}

//emphasis
{
  type: 'emphasis',
  children: [{type: 'text', value: 'alpha'}]
},
  
//list
{
  type: 'list',
  ordered: true,
  start: 1,
  spread: false,
  children: [{
    type: 'listItem',
    spread: false,
    children: [{
      type: 'paragraph',
      children: [{type: 'text', value: 'foo'}]
    }]
  }]
}
```

*For details of every node, please check its doc.*

To parse Markdown content into **mdast**, I use [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse), a parser for [unified](https://github.com/unifiedjs/unified).

```javascript
import unified from 'unified';
import markdownParse from 'remark-parse';

const tree = unified().use(markdownParse).parse(content);
```



***

Ok, these are the main things that I did with Markdown.

Again, many thanks to those cool guys who contributed to the Markdown work:+1::coffee:

