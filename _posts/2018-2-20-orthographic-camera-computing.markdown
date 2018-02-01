---
title:  "Restric Object In Specified Scree Area Using Orthographic Camera"
date:   2018-2-20 15:00:00 +0800
categories: Unity
---



I’ve encountered a problem to adjust the position of orthographic camera for restricting 3D objects in the specified rectangle area in the screen. I was sure of the possibility, but it did take me some effort to accomplish it. Here is what I did.

#### 1. Get Bounding Box

This was done by accumulating all the mesh bounds of the objects. The center is fixed in the Vector3.zero. 

#### 2.  Decide Orthographic Size



#### 3. Compute Position

