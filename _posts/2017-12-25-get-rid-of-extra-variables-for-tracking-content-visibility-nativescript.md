---
layout: post
title: Get rid of extra variables for tracking content visibility NativeScript
date: 2017-12-25 11:06
author: multishiv19
comments: true
category: [nativescript]
tags: [nativescript, optimization]
description: Here's why you might not need that extra variable anymore
---

I've seen that most people manage the toggling of content visibility using a variable
in the code behind file. Although this works fine, there's a better way to do it.

When reading the <a target="_blank" href="https://docs.nativescript.org/api-reference/classes/_ui_core_view_base_.viewbase#iscollapsed">API Docs</a>, I came across the `isCollapsed` Read Only property, that is
present on every view. Using this property we can easily maintain the visibility of
content in our layouts, without the need for creating a new variable for it.

Here's my approach at it,
(NativeScript Core: JS)
```js
exports.onToggle = function (args) {
  const page = args.object.page;
  const homePanel = page.getViewById("homePanel");
  homePanel.visibility = homePanel.isCollapsed ? "visible" : "collapse";
};
```

And here's the link to Playground Sample:
https://play.nativescript.org/?template=play-js&id=07JZ34

Demo:

<img style="box-shadow: 2px 2px 5px lightgray;"
    src="{{ site.baseurl }}/assets/img/visibilityTrick/visibility_demo.gif" alt="Visibility Demo" width="250" />

Hope you find this useful. Do you have a better approach?
Let me know in the comments section below :)

Cheers! Happy NativeScripting.