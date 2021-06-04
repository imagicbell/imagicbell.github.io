---
title:  "How To Build My Own Website (1) - Next.js"
date:   "2021-03-10T20:00:00+08:00"
categories: Front-End
---



## Contents

1. The choice of Next.js
2. [Parse and Display Markdown]({%POST_URL%}/2021-3-12-build-my-website-markdown)
3. [Style my website]({%POST_URL%}/2021-3-14-build-my-website-style)

<br>



I had always dreamed of building my own website, to express myself, to keep memory of what I have done, and to make others know me faster. Although I had self-learned web developing technologies, e.g. html/css, javascript, react, redux, jquery, etc, for a long time, there wasn't a golden chance to start this "huge" thing, regarding to the styling, routing, deploying and so on... *All beginnings are hard*:smile:

I used [Jekyll](https://jekyllrb.com/) for my Blog. It's like this:

![](/blog/assets/img-my-website/1.jpg)

But I am not satisfied with it. To customize the page, I need to give a HTML file, which is inconvenient.

Recently I met with [Next.js](https://nextjs.org/). It is a [React](https://reactjs.org/) framework, which means I can write **React Components**:v:. After walking through its starter tutorial, which is to create a very simple **blog app**, I found it is the perfect framework that helps me to start my website building. 

This article mainly talks about some **basic features** making it perfect for my website building. Next two articles: [1]({%POST_URL%}/2021-3-12-build-my-website-markdown), [2]({%POST_URL%}/2021-3-14-build-my-website-style) will illustrate how I deal with **Markdown** and **Style**.

In this article, firstly I will talk about some **basic features** making it perfect for my website building. Then I will illustrate how I deploy it to **Github Pages**. 

## Page-based Routing System

In [Next.js](https://nextjs.org/), a [page](https://nextjs.org/docs/basic-features/pages) is a React Component placed under `/pages` directory. This hierarchy makes it clear to separate the page components with those feature components. 

However, what the most powerful  is that it supports [**dynamic routes**](https://nextjs.org/docs/routing/dynamic-routes). So:

* a page defined as `/pages/posts/[slug].js` can power all my blog post pages, like `/posts/2021-3-10-build-my-website-nextjs`, `/posts/2021-2-19-mock-requestanimationframe-in-jest`, etc.

* a page defined as `/pages/blog/[[...page]].js` can power not only  `/blog/*`, but also `/blog` and `/blog/*/*`. So my paginated blog pages can be

  - `/blog`
  -  `/blog/page/2`, `/blog/page/3`, `...`
  -  `/blog/front-end`, `blog/unity`
  - `/blog/front-end/2`, `blog/unity/2`, `...`

  ~~*In `next.config.js`, I can define `/blog/page/1` redirecting to `/blog`, `/blog/front-end/1` redirecting `blog/front-end`. This is common web flavored*.  ~~

  *The `redirects` in next.config.js only works in Node.js environment, and do not affect client-side routing, see [this](https://nextjs.org/docs/api-reference/next.config.js/redirects). My website is statically exported, so when it is published on Github Pages, the `redirects` fails. Also I tried `rewrites`, but the result is not what I want, and it also fails to refresh by browser.*

* in React Component, I can obtain the route data by `query` object, which is accessed by the `useRouter` hook in [`next/router`](https://nextjs.org/docs/api-reference/next/router). So for the above multi-format routes, I can distinguish them by:

    ```javascript
    // "/blog"
    query: { "page": false }
    query: { "page": null }
    query: { "page": [] }
    query: { "page": undefined }

    // "/blog/page/2", "/blog/page/3" ...
    query: { "page": [ 'page', '2'] }
    query: { "page": [ 'page', '3'] }

    // "/blog/front-end", "/blog/unity"
    query: { "page": [ 'front-end' ] }
    query: { "page": [ 'unity' ] }

    // "/blog/front-end/2", "/blog/unity/2"
    query: { "page": [ 'front-end', '2' ] }
    query: { "page": [ 'unity', '2' ] }
    ```

  

## Pre-rendering

[Next.js](https://nextjs.org/) generates HTML for each page in advance. There are two forms: **Static Generation** and **Server-side Rendering**. 

> The difference is in **when** it generates the HTML for a page.
>
> - [**Static Generation (Recommended)**](https://nextjs.org/docs/basic-features/pages#static-generation-recommended): The HTML is generated at **build time** and will be reused on each request.
>
> - [**Server-side Rendering**](https://nextjs.org/docs/basic-features/pages#server-side-rendering): The HTML is generated on **each request**.

Commonly a personal website is static, which is generated at build time. 

### Data Fetching
[Next.js](https://nextjs.org/) also provides two ways to [fetch external data](https://nextjs.org/docs/basic-features/data-fetching) for pre-rendering, with which I can generate blog pages by reading the local markdown files. 

1. `getStaticPaths` to specify which paths to pre-render. For example, in `/pages/posts/[slug].js`, the below code includes paths for all post pages.

     ```javascript
     export async function getStaticPaths() {
       const posts = getAllPosts(['slug'])

    return {
         paths: posts.map((post) => {
           return {
             params: {
               slug: post.slug,
             },
           }
         }),
         fallback: false,
       }
     }
    ```

2. `getStaticProps` to pass external data to the `props` of the page's React Component. For example, in `/pages/posts/[slug].js`, the below code passes the `post` data to the `Post` component for rendering.

      ```javascript
      function Post({ post }) {
        //render the post
      }
      
      export async function getStaticProps({ params }) {
        let post = getPostBySlug(params.slug);
        return {
          props: {
            post,
          }
        }
      }
      ```

   The parameter `params` is from the `params` in the returned object of `getStaticPaths`.



## Fast Refresh

[Next.js](https://nextjs.org/) enables [Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh) to allow me to glance at what I have just done. Think about this scenario: 

*I am writing this blog, and I want to see what it is like when it deploys.*

*ps. [Jekyll]([Jekyll](https://jekyllrb.com/) ) enables fast refresh, too.*



## It's React!

There is no need to illustrate how [React](https://reactjs.org/) makes it easier to develop web pages here. I just want to say it is at the top of my list.

## Deploy To Github Pages

Next.js app is recommended to deploy on [Vercel](https://vercel.com/), because it is an all-in-one platform developed by the same team. However, in spite of  [Vercel](https://vercel.com/), I also want to deploy it on Github Pages, where my old Blog is, until I have my own domain.

[Here](https://github.com/imagicbell/deploy-nextjs-to-github-pages) is how I did.



## Why Not Use Existing Website Builder

#### 1. It is Pricey!
Although some popular website builders, like [Wix](https://www.wix.com/) and [WordPress](https://wordpress.com/), provide free services to create websites, the services are limited, unless you purchase for the Premium Plans. *This is always what happens*:sweat_smile:. ​

#### 2. I am Not Advertising.

In my plans for the website, there is no intension for any advertisement. So it doesn't need to be fancy. In fact, I prefer it to be simple but tech-favored.

#### 3. It is Not Under My Control.

There are indeed many templates on those website builders, which save us plenty of time to design and development websites. But they are just as what they are. I'd like to do what ever I want on my own website. It should be limitless:wink:.



