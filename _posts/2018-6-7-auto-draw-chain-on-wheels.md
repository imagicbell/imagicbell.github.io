---
title:  "Automatic Chain's Construction On wheel Models"
date:   "2018-06-07T16:00:00+08:00"
categories: Unity
---



Rencently I did have fun with a project which I'd like to share. It is to construct a chain automatically on wheels. Like these:

![](/blog/assets/img-auto-draw-chain/1.png)

![](/blog/assets/img-auto-draw-chain/2.jpg)

![](/blog/assets/img-auto-draw-chain/3.jpg)



The conditions and requirements are:

1. The wheels are shaped as circles, of course. 
2. The wheels must be in the same plane, which means they share the same **forward** direction. However the direction can be any.
3. The radius of wheels can be different.
4. There are 3 different alignment as you see above: 
   1. only one wheel
   2. wheels are queued in one line
   3. wheels are enclosed by end to end.



### Solutions

Even though all the models lay in the 3D world, this problem can be simplified in 2D, as given the Condition 2.

Inspired by a plugin called [SplineMesh](https://assetstore.unity.com/packages/tools/modeling/splinemesh-104989), to construct the chain, we must build the curve at first, which enables to calculate the position and tangent of any point on the curve.

**So the problem is focused on building a curve that encompasses the circles.**

As for the situation of one wheel, this is quite straight forward. Given a circle's center, radius, and the up direction, calculate the sampled points on the circle.

![](/blog/assets/img-auto-draw-chain/4.jpg)

For situations of multiple circles, we should first try to calculate the **tangent lines** between circles.

![](/blog/assets/img-auto-draw-chain/5.png)

There are 4 tangent lines in total between 2 circles, but we only need the outer two.

Here is my method to compute the tangent lines.

![](/blog/assets/img-auto-draw-chain/6.png)

![](/blog/assets/img-auto-draw-chain/7.jpg)

![](/blog/assets/img-auto-draw-chain/8.jpg)

The other 3 tangent points are calculated likely.

However, this is the situation that the circle 1 is larger than circle 2. The "lower equal" situation should also be considered. But the calculations are almost the same.

Now we get the 4 points with their position and tangent, we can calculate all the sampled points on the curve, which is the curve is succesfully built.



One last problem is the situation that wheels are enclosed. Only 2 points out of the 4 calculated above are used, which is only one tangent line standing out. I choose the tangent line with the same direction to the circles' center line, in condition that the circles are chosen in counterclockwise, because all the rotation calculation above are based on counterclockwise system. 



Of course, the solution I got has some limitations, which does not have to be considered in our applications. Like this:

![](/blog/assets/img-auto-draw-chain/9.jpg)

The extra work is to give some specifications in calculations. I'm here only to give some inspirations. Or if you could figure out a more general way.  Please feel free to share and have fun!



[Next blog]({%POST_URL%}/2018-6-10-chain-animation-on-wheels) will introduce the animation calculation of the chains.