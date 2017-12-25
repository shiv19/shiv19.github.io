---
layout: post
title: NativeScript Core - Navigation tips and tricks
date: 2017-12-25 11:28
author: multishiv19
comments: true
category: [nativescript]
tags: [nativescript, navigation]
description: Best practices to help you do navigation the right way
---

Navigation is an important core aspect of any application. Improper navigation can easily break your app. Which is why it is very important to do it right. 
In this post I'm going to share the tips and tricks which I've learned so far, if you know any, apart from those mentioned here, let me know in the comments section below. 

### 1. Manage all routes from 1 file

Instead of always typing out the path to a route manually in every `.navigate()` call, it is a good idea to separate out the path into a separate file. 
That way, when some path changes in your project, you will only have to change the path in 1 file.
To do this, create a file called `routes.json` inside the `app/shared` folder in your project. 
Put all your routes in this file. And it would look something like this, 
```js
{
    "home": "./pages/home/home",
    ‎"list": "./pages/list/list",
    ‎"itemDetails": "./pages/list/item-details/item-details"
} 
```
Remember that it is a json, so don't forget the quotes. (if you don't want to use json file, you can module.export this json from a js file as well) 

Now you can easily require this file anywhere in your project by doing
```js
const routes = require("~/shared/routes.json");
```

And replace all the hard coded route paths with 
`routes.<route_name>`

### 2. Time to stop using frameModule.topmost().navigate()

There is no need to require frameModule to perform navigation anymore. 
Every page variable has a frame variable in it. And you can use that to perform navigation. 

Let's see how that would work during a button click, 

```js
exports.buttonTapped(args) {
   const page = args.object.page; // Yes! args.object.page is a thing. 
   ‎const routes = require("~/shared/routes.json");
   ‎page.frame.navigate(routes.home);
} 
```
^ special thanks to <a href="https://twitter.com/_HHristov_" target="_blank">Hristo</a> from NativeScript team. I learnt that trick from him. 

### 3. Perform navigation without adding to backstack

When you navigate if you set `backstackVisible: false`, that navigation won't be added to the backstack
```js
   ‎page.frame.navigate({
         moduleName: routes.someModal, 
         ‎backstackVisible: false
   });
```
So, let's say there is Page A, B and C

We're now in page A.
We navigate to page B, by setting backstackVisible to false.
Next we navigate to C, (with/without setting backstackVisible)
Now that we are in C, if we press the back button,
We will be taken to page A.

This is because page B was not added to back stack.

### 4. Avoid the default iOS back button from showing up when you navigate

The way I like to do this is by passing `clearHistory: true` when I navigate. By doing that, iOS default back navigation doesn't show up.
```js
   ‎page.frame.navigate({
         moduleName: routes.somePage, 
         ‎clearHistory: true
   });
```

### 5. Give navigation the highest priority when possible 

You might not know this, but you can continue to write some code below your navigation call,
and it continues to execute. You might think, why would I want to do that.
The answer is performance. If you have some code that has nothing to do with the navigation,
then it is wise to run it after the navigation call. (You'll understand this one better when you
see the playground app)


Here's a Playground app that I made to show all the above tips &amp; tricks:

<a target="_blank" href="https://play.nativescript.org/?template=play-js&id=Hhiggq&v=4">https://play.nativescript.org/?template=play-js&id=Hhiggq&v=4</a>

Hungry for more?
Go through the docs if you haven't already => 

<a target="_blank" href="https://docs.nativescript.org/core-concepts/navigation">https://docs.nativescript.org/core-concepts/navigation</a>

For Angular Navigation => 

<a target="_blank" href="https://docs.nativescript.org/core-concepts/angular-navigation">https://docs.nativescript.org/core-concepts/angular-navigation</a>

Cheers! Happy NativeScripting :)
