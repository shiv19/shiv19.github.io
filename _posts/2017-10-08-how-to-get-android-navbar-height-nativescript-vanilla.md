---
layout: post
title: How to get android navbar height on NativeScript vanilla
date: 2017-10-08 02:26
author: multishiv19
comments: true
categories: [nativescript]
---

Sure fire way to get the on screen navigation bar height (is present) on android, in NativeScript

## Story
Android provides many different form factors. Of which, some devices come with on screen navigation bar and some don't.
Now, the problem with that is when you want to programmatically setup some absolute layout in code, you need to 
find out the height of the on screen navigation bar (if present), and sometimes also height or action bar and status bar.

With NativeScript, this code -> 
`android.view.ViewConfiguration.get(ad.getApplicationContext()).hasPermanentMenuKey()` 
returns `false` on devices like _Samsung Galaxy Note5_, and _Galaxy J7_ (both having permanent menu key).
I haven't tested this code on devices from other manufacturers who have permanent menu key.

So, with a little help from [this](https://stackoverflow.com/questions/28983621/detect-soft-navigation-bar-availability-in-android-device-progmatically) StackOver flow question, I came up with this set of code, which is working correctly on all the devices that I've tested it with so far i.e., _note5_, _j7_ and _nexus6 on emulator_.

## Finding out height of Android On Screen Navigation Bar

This code works for both landscape and portrait mode. Here we are checking if there is any difference between
real width and displayed width or between real height and displayed height. If there is, then we return
that difference after converting it to device independent pixels.

```javascript
function getNavBarHeight() {
    const app = require("application");
    if(app.android) {
        let navBarHeight = 0;
        let windowManager = app.android.context
                    .getSystemService(android.content.Context.WINDOW_SERVICE);
        let d = windowManager.getDefaultDisplay();
        
        let realDisplayMetrics = new android.util.DisplayMetrics();
        d.getRealMetrics(realDisplayMetrics);
    
        let realHeight = realDisplayMetrics.heightPixels;
        let realWidth = realDisplayMetrics.widthPixels;
    
        let displayMetrics = new android.util.DisplayMetrics();
        d.getMetrics(displayMetrics);
    
        let displayHeight = displayMetrics.heightPixels;
        let displayWidth = displayMetrics.widthPixels;

        if((realHeight - displayHeight) > 0) { // Portrait
            navBarHeight = realHeight - displayHeight;
        } else if ((realWidth - displayWidth) > 0) { // Landscape
            navBarHeight = realWidth - displayWidth;
        }

        // Convert to device independent pixels and return
        return (navBarHeight 
            / app.android.currentContext
                 .getResources().getDisplayMetrics().density);
    }
    return 0;
}
```

What are your thoughts on this method? Any suggestions to improve this code? Please comment below :smile:
