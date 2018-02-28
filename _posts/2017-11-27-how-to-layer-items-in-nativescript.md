---
layout: post
title: How to Layer items in NativeScript
date: 2017-11-27 13:15
author: multishiv19
comments: true
category: [nativescript]
tags: [nativescript, ui]
description: Learn how to add multiple layers to your UI
---

Here's a useful tip,

In Grid layout of NativeScript, you can place multiple UI items on the same row
and column,

**the one that was placed last, will be at the top.**

so, let's say you write something like this

```xml
<GridLayout height="180" rows="*, auto" columns="*">
    <Image
        row="0"
        rowSpan="2"
        col="0"
        stretch="aspectFill"
        height="180"
        src="url to some image"
        id="userIcon" />
    <StackLayout
        padding="10"
        row="1"
        col="0"
        backgroundColor="rgba(64, 153, 255, 0.6)" >
        <Label class="fa" color="#FFFFFF" id="userName" text="" />
        <Label class="footnote" id="userEmail" text="" />
    </StackLayout>
</GridLayout>;
```

<img src="https://discourse-cdn-sjc2.com/standard13/uploads/nativescript/optimized/2X/e/eaba6ed9929f9dee1c2f8796e64660e0cba57970_1_690x399.jpeg" alt="Result" width="390" />

You will get a layered effect, see how the stackLayout got overLayed on top. :)

Hope this helps ^_^
