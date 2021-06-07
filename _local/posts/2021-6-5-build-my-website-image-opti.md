---
title:  "How To Build My Own Website (4) - Image Optimization"
date:   "2021-06-05T20:00:00+08:00"
categories: Front-End
excerpt: This article illustrates how I applied image optimization to improve the performance of my website.
---



## Contents

1. [The choice of Next.js]({%POST_URL%}/2021-3-10-build-my-website-nextjs)
2. [Parse and Display Markdown]({%POST_URL%}/2021-3-12-build-my-website-markdown)
3. [Style my website]({%POST_URL%}/2021-3-14-build-my-website-style)
4. Image Optimization

<br>



I didn't have much consideration about image optimization when developing my website using [Next.js](https://nextjs.org/), because it provides a component  [`next/image`](https://nextjs.org/docs/api-reference/next/image) which is an extension of  the HTML `<img>` element and encapsulates image optimization. But when I exported my website project to static HTML for publishing on Github pages, an error prompted.

>Error: Image Optimization using Next.js' default loader is not compatible with `next export`.

Then I found the caveat on Next's document:

> The [`next/image`](https://nextjs.org/docs/api-reference/next/image) component's default loader is not supported when using `next export`. However, other [loader](https://nextjs.org/docs/basic-features/image-optimization#loader) options will work.

However, currently I didn't intend to rely on third-party image optimizer, as:

1. it might need additional configuration, like registering account on their platform, supplying images somewhere on the cloud storage, etc.
2. I'm not making a big website having large amount of images on one page. Actually, there might be at most 5 images.

There must be some easier ways. I found issues on Next.js GitHub project that discussed on it. Some guys recommended to use [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images), which could be a replacement.

It works quite well. It supports automatic optimization of images of different types, like jpeg, png, etc, as well as provides webp converting, which largely reduces the size of images. It also enables to generate a low quality image as a placeholder until the real big image has load. Here is one of my usage:

My original homepage image, which was 8mb, took tons of seconds to load. I used the webp conversion, which resulting much smaller size with 330kb, and provided the fallback jpeg image using `<picture>` considering that webp is not supported by all the browsers right now. The resulted TTFB of this image at my home network was reduced to around 300ms and the download time was about 500-1000ms. It was much faster than before. I also applied the `?lqip` query to generate a placeholder and displayed it under the real image, so the screen won't be blank during this waiting time.

But when it came to display images of my blog, which was written in markdown, troubles came. [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) uses `require` to assign the image url, which only accepts static path:

```jsx
<img src={require('./images/my-image.jpg')} />
```

But the markdown files are parsed and converted to HTML to display in browsers. The image urls defined in markdown files are fetched and stored in variables. How to `require` a variable then?

It seemed impossible. But maybe I could add an additional step in the [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) working pipeline, to load all the images from my blogs before the optimization process. It involved too much work though. There must be some easier ways again.

Then I found off-line image optimization tools. I used [ImageOptim](https://imageoptim.com/mac). Similar to next-optimized-images, they share most of the dominating optimization tools for reducing images' size. So the results were almost the same. Just one more step to drag and drop though. 

## Next Thoughts

My solution to the image optimization currently won't run in a long way. If in the future the website grows, having more images or videos, the page load speed might not be ideal. There are at least two things I could do:

1. use third-party image optimization service.
2. support responsive images for screens of difference sizes.

