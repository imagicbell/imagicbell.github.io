---
title:  "Restrict Object In Specified Screen Area Using Orthographic Camera"
date:   "2018-01-20T15:00:00+08:00"
categories: Unity
description: An algorithm to make objects displayed in a defined rectangle area on screen.
---



I’ve encountered a problem to adjust the position of orthographic camera for restricting 3D objects in the specified rectangle area in the screen. I was sure of the possibility, but it did take me some effort to accomplish it. Here is what I did.

#### Prerequisite

1. Given the objects, whose center is at Vector.zero.

2. Given the `rect`, with the proportional value of the display area relative to the screen, e.g. `(0.1, 0.2, 0.5, 0.6)` means the display area starts from `(Screen.width*0.1, Screen.height*0.2)`, with size of `(Screen.width*0.5, Screen.hegith*0.6)`.

   **However**, the actual display rect on screen should take the aspect ratio of the objects' bounds into consideration, so what we actually do is to limit the objects inside the specified area. We will provide it it details below.

3. Given the pitch angle $\theta$  of the camera.

4. Given the `distance` from the center of objects to the center of the camera.

See the picture below:

![](/blog/assets/img-orthographic-camera/1.JPG)

#### 1. Get Bounding Box `bound`

This was done by accumulating all the mesh bounds of the objects. The center is fixed at Vector3.zero, as we designed to fix the objects in the scene and calculate the position of the camera to adjust the view.

#### 2.  Decide Orthographic Size

Based on the Unity's doc about [orthographic size](https://docs.unity3d.com/ScriptReference/Camera-orthographicSize.html):

> It is half the size of the vertical viewing volume. The horizontal size of the viewing volume depends on the aspect ratio.

So let's calucate the height of the view volume. 

Fortunately, the calucation doesn't need spatial transformation. All is done in global space, as we use orthographic camera and the proportianl value.

According to the picture above, we can get $\alpha$ by the bounding box calulated from step 1. 

```latex
\alpha = arctan(\frac{bound.height} {bound.depth})
```

Then `d`:

```latex
d = \frac {bound.height} {sin\alpha}
```

Then the height of the object on screen, we call it view.height: 

```latex
view.height = d \times sin(\alpha + \theta) = \frac {bound.height}{sin\alpha} \times sin(\alpha + \theta)
```

So the height of camera view volume is:

```latex
camera.height = \frac{view.height} {rect.height} = \frac {bound.height} {rect.height} \times \frac{sin(\alpha + \theta)} {sin\alpha}
```

Remember in *Prerequisite 2*, the `rect` is defined with the proportional value relative to the screen.

However, that's not enough. We should ensure the aspect ratio, and the bounding of object's view not exceeding the view volume. So we calculate the width of camera view volume: 

```latex
camera.width = camera.height \times camera.aspect
```

```latex
camera.width.needed = \frac{bound.width}{rect.width}
```

if `camera.width > camera.width.needed`, it means that actually more width is given than that the object needs, so we should change the actual proportional value of the object's width on screen:

```latex
rect.width = rect.width \times \frac {camera.width.needed}{camera.width}
```

```latex
rect.x = 0.5 + (rect.x - 0.5)\times\frac{camera.width.needed}{camera.width}
```

if `camera.width < camera.width.needed`, it means that the actual width of object's view exceeds the camera's view volume. So we need to extend the view volume:

```latex
camera.width = camera.width.needed
```

Let's save the old camera.height before computing the new camera.height:

```latex
camera.height.needed = camera.height
```

```latex
camera.height = \frac{camera.width}{camera.aspect}
```

Now that `camera.height > camera.height.needed`, we need to re-compute the actual proportional value of the object's height on screen, same as width above:

```latex
rect.height = rect.height \times \frac {camera.height.needed}{camera.height}
```

```latex
rect.y = 0.5 + (rect.y - 0.5)\times\frac{camera.height.needed}{camera.height}
```

then

```latex
camera.orthographicSize = camera.height \times 0.5
```

#### 3. Compute Position

Keep the picture above and the parameters offered in mind, and then continue:

```latex
d_1 = camera.height \times (rect.y+rect.height-0.5)
```

```latex
deltaX = d_1 \times sin\theta
```

```latex
deltaY = d_1 \times cos\theta
```

```latex
y_1 = (distance - 0.5 \times bound.depth + deltaX) \times tan\theta
```

```latex
camera.y = y_1 + deltaY
```

```latex
camera.x = -distance
```

Then for `camera.z`:

```latex
camera.z = - (rect.x + 0.5 \times rect.width - 0.5) \times camera.width
```

Finally:

```
camera.position = new Vector3(camera.x, camera.y, camera.z)
```



Yeah, that's it!!! Happy?