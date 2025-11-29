---
layout: post
title: How to make SideDrawer go behind StatusBar in NativeScript Android
date: 2017-11-22 00:49
author: multishiv19
comments: true
category: [nativescript]
tags: [nativescript, android]
description: This is a quick tutorial
---

Here's how to go from sidebar below status bar to sidebar behind status bar

<img src="{{ site.baseurl }}/assets/img/sideDrawerSB/before.png" alt="Before" width="250" /> => <img src="{{ site.baseurl }}/assets/img/sideDrawerSB/after.png" alt="After" width="250" />

Just follow these 3 simple steps
### Step 1:
Open

`App_Resources/Android/values-v21/styles.xml`

### Step 2:
Add this inside **AppTheme** style

`<item name="android:windowTranslucentStatus">true</item>`

### Step 3:
Add this inside **NativeScriptToolbarStyle** style

`<item name="android:paddingTop">24dp</item>`

And that's all you need to do, rebuild the project, and now the side drawer should go below the status bar.

*Note: But the downside is, you lose the ability to color the status bar. because now the status bar is transparent.
The ActionBar also goes below status bar (hence we add paddingTop to the NativeScriptToolbarStyle)*


