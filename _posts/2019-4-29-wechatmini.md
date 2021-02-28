---
title:  "微信小程序尝试"
date:   "2019-04-29T10:00:00+08:00"
categories: Front-End
description: Some tiny projects built in Wechat Mini Program.
---



最近得空尝试了下微信小程序的开发。初衷是想做一个微信小游戏，分享给周围的朋友玩，可是发现小游戏版本已经有一段时间不更新了，并且开发了两天后发现并没有太多的技术收获，于是转投小程序。相比之下，小程序生态更活跃一些，但是总体体验下来，还是无法与react这类大咖相比，做一些简单的小工具够用，这也是它的设计初衷。



### 上手

快速看了下官方开发指南，便开了一个工程，准备做一个简易计算器。以下是完成界面：

![](/blog/assets/img-wechatmini/calculator.png)

界面以及交互是完全参考iPhone的内置竖屏计算器。这个小工具主要是熟悉了一遍小程序Page构造，Page数据处理、事件通信、生命周期等，以及wxml、wxss的写法。wxss基本与css无异，wxml的组件需要用小程序包装后的组件，或者可以自定义组件，但也逃不开小程序的组件机制。

此外，计算器数字的显示需要对实际数字进行格式化（如上图的“,”），因此需要监听输入改变来格式化出显示的文字，其实就是需要vue.js的**computed**功能，可惜的是小程序并不自带，我引入了别人实现的一套[**watch/computed**机制](https://github.com/donghaohao/vuefy)。

##### *Tips*

1. 使用js浮点数运算得出来的结果会有误差，需要引入第三方十进制运算库，我用的是[decimal.js](https://github.com/MikeMcl/decimal.js)。

   

### 进阶

接下来该尝试些复杂的功能。我最近在怀孕期间，对体重、血糖的控制非常严格，因此，我分别做了个简单的体重、血糖记录仪，配以图表显示。以下是完成界面：

![](/blog/assets/img-wechatmini/weightscale_1.png) ![](/blog/assets/img-wechatmini/weightscale_2.png)

![](/blog/assets/img-wechatmini/bloodsugarscale_1.png) ![](/blog/assets/img-wechatmini/bloodsugarscale_2.png)

图表功能，我使用的是[ECharts](https://echarts.baidu.com/feature.html)，它做了小程序的兼容版本[echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)，其API、配置项是一致的。在刚开始使用ECharts的时候，为了实现某些显示效果，查找文档、trial and error的过程其实是挺痛苦漫长的，不过*this is a matter of experience*，用多了熟悉了也就信手拈来。

这两个小工具都涉及到对时间的manipulation，而js自带的Date api不能很方便的满足各种计算、format需求，因此我引入了广泛被使用的[Moment.js](https://momentjs.com/)。

做H5项目一般都会使用一个UI库，比如bootstrap, Framework7, Amaze UI等，因为它们会提供一些比较常见的设计样式、组件，而不需要我们*Do it from scratch*，在浪费时间精力的前提下还做不好web、app中约定俗成的用户界面。小程序有一套同微信原生视觉体验一致的基础样式库[WeUI](https://github.com/Tencent/weui-wxss)，作为学习用途，我体验了下，基本上一些常用的组件、交互元素都有，满足小工具的开发足够了。

小程序框架提供了Page与Component之间的事件通信，但是没有提供直接的Page与Page之间的，猜测是因为其设计初衷就是把Page作为独立的个体而存在，尽量避免Page之间的相互依赖，而Page可以包含Component。但是到了实际开发中，Page之间的通信总是避免不了，尤其是父子Page之间。所幸解决方案也是有很多的，大体上就是依靠globalData、storageData的共享性来实现。我实现了一个global的事件publication/subscription机制，把它的实例挂在globalData上面，在任何地方都可以注册/取消监听、派发事件，只要Page没有被销毁都能收到相应的事件。代码如下：

```js
export default class PubSub {
  constructor() {
    this.PubSubCache = {
      $uid: 0
    };
  }

  on(type, handler) {
    let cache = this.PubSubCache[type] || (this.PubSubCache[type] = {});
    handler.$uid = handler.$uid || this.PubSubCache.$uid++;
    cache[handler.$uid] = handler;
  }

  emit(type, ...param) {
    let cache = this.PubSubCache[type];
    if(!cache) return;

    for(let key in cache) {
      cache[key].call(this, ...param);
    }
  }

  off(type, handler) {
    let cache = this.PubSubCache[type];

    if(!handler) {
      if(!cache) return true;
      return !!cache && (delete this.PubSubCache[type]);
    } else {
      !!cache && (delete this.PubSubCache[type][handler.$uid]);
    }

    return cache.keys().length === 0 && (delete this.PubSubCache[type]);
  }
}
```

小程序开发者可以通过自定义组件设计一些通用的组件，被Page共享使用。自定义组件可以传入properties，组件内部也可以有自己的data，properties和data在组件内部逻辑使用上一致。自定义组件也有自己的生命周期callback，不同于Page。支持与Page的事件通信。



### 扩展

紧接着做了一个“数胎动”的小工具，是参考“宝宝树孕育”app中的样式。

![](/blog/assets/img-wechatmini/fetalmove_1.png) 	 ![](/blog/assets/img-wechatmini/fetalmove_2.png)

主要有两部分：倒计时、历史记录。

历史记录很简单，使用了[WeUI](https://github.com/Tencent/weui-wxss)的list样式，将每次记录的数据用`for`循环的方式列举出来。

倒计时有些tricky。最初，我打算使用css来处理circle progress bar，搜索了很多别人的例子，一系列尝试下来，总觉得很annoying，于是找寻更简单直接的方式。Canvas，小程序是支持的。

```javascript
//首先创建cavas的绘图上下文对象
const context = wx.createCanvasContext("timer-canvas");

//每次重新绘制之前，需要清空上一次的绘制，否则会叠加在上面
context.clearRect(0, 0, CIRCLE_RADIUS * 2, CIRCLE_RADIUS * 2);

//使用arc接口绘制progress bar
const progressBar = this.data.progressBar;
context.beginPath();
context.setStrokeStyle(PROGRESS_BAR_COLOR);
context.setLineWidth(6);
context.arc(progressBar.x, progressBar.y, progressBar.radius, -0.5 * Math.PI, (-0.5 + 2 * progress) * Math.PI);
context.stroke();

//最后调用draw，将内容绘制到canvas上
context.draw();
```

最终将canvas组件以合适的方式嵌入到xml中。

相对于css，这种逻辑语句控制的绘制效果还是我比较prefer的，比较直接。Anyway，css is still a long way to go~

我还准备做一个“在线弹钢琴”的小工具，但是微信SDK暂时没有支持WebAudio，我打算用web开发的方式做一个html页面，然后使用小程序的[WebView](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)来加载这个页面。



### 总结

对于小程序的新手尝试就先这样，正如其名，它适合用来做一些便携的小工具，特别是符合微信生态圈的小工具，有效利用微信提供的社交、支付能力，使我们的生活更高效、有趣。



