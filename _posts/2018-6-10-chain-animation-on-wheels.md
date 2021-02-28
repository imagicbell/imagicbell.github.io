---
title:  "Automatic Chain's Animation On wheel Models"
date:   "2018-06-10T16:00:00+08:00"
categories: Unity
description: An algorithm to calculate the animation of the chains around one or more wheels.
---



In [last blog]({%POST_URL%}/2018-6-7-auto-draw-chain-on-wheels), I introduced the construction of the chains on wheels. This blog will tell the animation calculations. The chain's animation is like this: 

![](/blog/assets/img-auto-draw-chain/10.gif)

We see that the chain can transform from spreading to enclosing smoothly. Of course, the reverse is supported. 

The calucation steps are as follows:

1. Build the chain for spreading and enclosing state.
2. Get the animation info for each component on the chain, which includes start/end positions and tangents, total rotated angles, rotation axis.

3. Do appropriate interplation for the position and rotation change each frame.

The detailed calculations are introduced below.



### Step1: Build Chain

The construction of enclosed chain is introduced in [last blog]({%POST_URL%}/2018-6-7-auto-draw-chain-on-wheels). Now left the spreaded chain, which is much simpler.

After we got the curve for the enclosed chain, we find the middle point, whose tangent is the tangent of all points on the spreading curve. Then the position of each point is calculated according to the tangent and the distance to the middle point.



### Step2: Get Animation Info

The animation info struct for each component on the corresponding point on the chain curve is as below:

```c#
class AnimChild
{
    public Transform transform;	//Unity tranform for the animated component

    public Vector3 startPosVec;
    public Vector3 endPosVec;

    public Vector3 startTangent;
    public Vector3 endTangent;
    public float rotAngle;
    public Vector3 rotAxis;
  
    public float lastAngle; //keep track of the rotated angle of last frame
}
```

Before I explain the core properties of the struct, some information should be told. 

As we see in the gif at the begining of this article, that the animation is done from two sides towards middle. So first we need to identify the middle point, which is the same as decribed in **Step1**. Then the properties are calculated based on the middle point with slight difference. 

1. **start/end posVec**
   ```latex
   startPosVec = startPosition - middlePosition
   ```

   ```latex
   endPosVec = endPosition - middlePosition
   ```

   We use the vector instead of position, because we use **Slerp** rather then simple **Lerp** of positions. The reason will be described in **Step3**. 

2. **start/end Tangent**

   This is just the tangent of each point on start and end curve. 

3. **rotAxis**

   Generally, the $rotAxis$ is the same as the forward direction of the plane composed by the wheel circles.   However, remember that the animations of left and right sides are opposite in its direction. So the $rotAxis$ of one side needs to be reversed. 

4. **rotAngle**
   ```latex
   rotAngle = arccos(startTangent \bullet endTangent)
   ```
   As we all know that the **dot product** of two vectors can help get the angle between them. However, we should notice that the range of the result of $arccos$ is $[0, \pi]$. So when the actual angle is larger than $\pi$, we need to do 
   ```latex
   rotAngle = 360 - rotAngle
   ```
   to get the actual angle. But how can we know whether the angle is larger than $\pi$?

   We can use the **cross product**, which can get the normal vector of the plane containing the two vectors.
   ```latex
   normal = startTangent \times endTangent
   ```
   Then 
   ```latex
   dotProduct = normal \bullet rotAxis
   ```
   If $dotProduct < 0$, which means $normal$ is different direction to $rotAxis$, let's say the angle is larger than $\pi$.



### Step3: Interpolate

Finally, we do the interpolation of positions and rotations each frame to simulate the animation. 

First we need to get the interpolation factor $t$ of the current frame.
```latex
t = \frac {timeElapsed}{totalTime}
```

1. **Rotation Interpolation**

   Rotation is simple. Just interpolate the angle and do `Rotate` around the $rotAxis$. The [`Rotate` API](https://docs.unity3d.com/ScriptReference/Transform.Rotate.html) is provided by Unity.

2. **Position Interpolation**

   We use **Slep** instead of **Lerp** for the position interpolation, because the **Lerp** can't give us a smooth arc animation path. (see [1](https://en.wikipedia.org/wiki/Slerp), [2](https://docs.unity3d.com/ScriptReference/Vector3.Slerp.html)). According the the Unity's Slerp API, we calculate the vector between the start and end position rather than simply use the positions themselves.

The code is as below:

```c#
timeElapsed += Time.deltaTime;
if (timeElapsed > totalTime)
{
	//finish animation
}

float t = Mathf.Clamp01(timeElapsed / totalTime);
for (int i = 0; i < animChilds.Count; i++)
{
    AnimChild child = animChilds[i];
    float angle = child.rotAngle * t;
    child.transform.Rotate(child.rotAxis, angle - child.lastAngle, Space.World);
    child.lastAngle = angle;

    Vector3 posVec = Vector3.Slerp(child.startPosVec, child.endPosVec, t);
    child.transform.position = midPos + posVec;
}   
```



That's how I did to yield the final animation. However it did not proceed that smoothly, dealing with the position interpolation and $rotAngle$. The methods descibed above are gained by trial and error, which is the common methodology of solving problems. Right?