---
title:  "Manipulate UGUI Image Mesh"
date:   "2017-12-01T17:00:00+08:00"
categories: "Unity"
description: Override the Mesh implementation('OnPopulateMesh' method) in UnityEngine.UI.Image to manipulate customized images.
---



It is known that the `Image` component in Unity UI can draw a texture under canvas. There are basically 4 types: Simple, Sliced, Tiled, Filled, which offers diversity manipulation of texture drawing. However, it is not enough! After digging into the source code of the implementations of those 4 drawing types, I found a way to customizing images.

The following are two cases of customizing shape and offset:

![](/blog/assets/img-uimage-manipulation/showcase1.png)

![](/blog/assets/img-uimage-manipulation/showcase2.png)

*left: raw image; right: customized image*



### How To

Mesh is the key point. It carries the information of vertices, colors and uvs which will then be sent to GPU for rendering. So by manipulating the mesh, the goal will be achieved.

In Unity UI, class `Graphic` is the base class for all visual UI components, and it offers an virtual method `OnPopulateMesh` for customizing the mesh construction. A typical simple graphic mesh is contructed by composing a rectangle:

![](/blog/assets/img-uimage-manipulation/simple.png)

The code is like this:

```c#
//vertice 0
vh.AddVert(new Vector3(vector4.x, vector4.y), color, new Vector2(0.0f, 0.0f));
//vertice 1
vh.AddVert(new Vector3(vector4.x, vector4.w), color, new Vector2(0.0f, 1f));
//vertice 2
vh.AddVert(new Vector3(vector4.z, vector4.w), color, new Vector2(1f, 1f));
//vertice 3
vh.AddVert(new Vector3(vector4.z, vector4.y), color, new Vector2(1f, 0.0f));
vh.AddTriangle(0, 1, 2);
vh.AddTriangle(2, 3, 0);
```

`vector4` gives the x(min horizontal), y(min vertical), z(max horizontal), w(max vertical) values.

Moreover, we can see the composition of a sliced image:

![](/blog/assets/img-uimage-manipulation/sliced.png)

There are 9 rectangles, and each of them are constructed by calculating the real vertices' positions and the sliced border positions and inner/outer uvs.

![](/blog/assets/img-uimage-manipulation/slicedtex.png)

The code is a bit long. You can check the source code which is opened if interested.

So here it is. Given the rectangles' dimension value, and adjust the corresponding uvs, will reform the images. The principle is easy, but the code is a bit tedious.

```c#
protected override void OnPopulateMesh(VertexHelper toFill)
{
    //m_DrawDimensions is a vector4 array defining the retangles' dimensions to draw
    if (m_DrawDimensions == null || m_DrawDimensions.Length == 0)
    {
        base.OnPopulateMesh(toFill);
        return;
    }

    toFill.Clear();

    Vector4 outerUV;
    Vector4 innerUV;
    Vector4 border;
    if ((UnityEngine.Object) this.overrideSprite != (UnityEngine.Object) null)
    {
        outerUV = DataUtility.GetOuterUV(this.overrideSprite);
        innerUV = DataUtility.GetInnerUV(this.overrideSprite);
        border = this.overrideSprite.border / this.pixelsPerUnit;
    }
    else
    {
        outerUV = Vector4.zero;
        innerUV = Vector4.zero;
        border = Vector4.zero;
    }

    Rect pixelAdjustedRect = this.GetPixelAdjustedRect();
    RectTransform rectTrans = GetComponent<RectTransform>();
    float xFactor = pixelAdjustedRect.width / rectTrans.rect.width;
    float yFactor = pixelAdjustedRect.height / rectTrans.rect.height;
    Vector4 factor = new Vector4(xFactor, yFactor, xFactor, yFactor);

    for (int i = 0; i < m_DrawDimensions.Length; i++)
    {
        Vector4 dimension = m_DrawDimensions[i];
        dimension.Scale(factor);

        int xCount = 3;
        int yCount;

        mVert_X[0] = dimension.x;
        mVert_X[1] = dimension.x + border.x;
        mVert_X[2] = dimension.z - border.z;
        mVert_X[3] = dimension.z;

        mUV_X[0] = outerUV.x;
        mUV_X[1] = innerUV.x;
        mUV_X[2] = innerUV.z;
        mUV_X[3] = outerUV.z;

        if (m_DrawDimensions.Length == 1)
        {
            //9 quads
            mVert_Y[0] = dimension.y;
            mVert_Y[1] = dimension.y + border.y;
            mVert_Y[2] = dimension.w - border.w;
            mVert_Y[3] = dimension.w;

            mUV_Y[0] = outerUV.y;
            mUV_Y[1] = innerUV.y;
            mUV_Y[2] = innerUV.w;
            mUV_Y[3] = outerUV.w;

            yCount = 3;
        }
        else
        {
            if (i == 0)
            {
                //6 quads
                mVert_Y[0] = dimension.y;
                mVert_Y[1] = dimension.w - border.w;
                mVert_Y[2] = dimension.w;

                mUV_Y[0] = innerUV.y;
                mUV_Y[1] = innerUV.w;
                mUV_Y[2] = outerUV.w;

                yCount = 2;
            }
            else if (i == m_DrawDimensions.Length - 1)
            {
                //6 quads
                mVert_Y[0] = dimension.y;
                mVert_Y[1] = dimension.y + border.y;
                mVert_Y[2] = dimension.w;

                mUV_Y[0] = outerUV.y;
                mUV_Y[1] = innerUV.y;
                mUV_Y[2] = innerUV.w;

                yCount = 2;
            }
            else
            {
                //3 quads
                mVert_Y[0] = dimension.y;
                mVert_Y[1] = dimension.w;

                mUV_Y[0] = innerUV.y;
                mUV_Y[1] = innerUV.w;

                yCount = 1;
            }
        }

        Vector4 dim, uv;
        for (int yMin = 0; yMin < yCount; yMin++)
        {
            int yMax = yMin + 1;
            for (int xMin = 0; xMin < xCount; xMin++)
            {
                int xMax = xMin + 1;
                dim = new Vector4(mVert_X[xMin], mVert_Y[yMin], mVert_X[xMax], mVert_Y[yMax]);
                uv = new Vector4(mUV_X[xMin], mUV_Y[yMin], mUV_X[xMax], mUV_Y[yMax]);
                AddQuad(toFill, dim, uv);
            }
        }
    }
}

private void AddQuad(VertexHelper vertexHelper, Vector4 pos, Vector4 uv)
{
    int currentVertCount = vertexHelper.currentVertCount;
    Color32 c = (Color32) this.color;
    vertexHelper.AddVert(new Vector3(pos.x, pos.y, 0.0f), c, new Vector2(uv.x, uv.y));
    vertexHelper.AddVert(new Vector3(pos.x, pos.w, 0.0f), c, new Vector2(uv.x, uv.w));
    vertexHelper.AddVert(new Vector3(pos.z, pos.w, 0.0f), c, new Vector2(uv.z, uv.w));
    vertexHelper.AddVert(new Vector3(pos.z, pos.y, 0.0f), c, new Vector2(uv.z, uv.y));
    vertexHelper.AddTriangle(currentVertCount, currentVertCount + 1, currentVertCount + 2);
    vertexHelper.AddTriangle(currentVertCount + 2, currentVertCount + 3, currentVertCount);
}
```

If anything got inpropriate here, please be open to discuss :)

