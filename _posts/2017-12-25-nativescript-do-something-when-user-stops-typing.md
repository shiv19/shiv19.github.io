---
layout: post
title: NativeScript do something when user stops typing
date: 2017-12-25 12:30
author: multishiv19
comments: true
category: [nativescript]
tags: [nativescript, optimization]
description: Neat technique to use when making calls to search API
---

Let's assume you have a search feature on your app that you want to live-update while the user types. The naive solution would be to execute a search query on every keystroke. This falls apart, however, because the user can usually type faster than how fast your server can respond. This makes for a poor user experience and an overloaded server.

So what you can do is,

Listen to every keystore using property change event listener on your observable object,
then if the changed property happens to be the one that you are interested in, you set
a timeout of 500ms and perform your API call inside that. Now, what you want to do is,
assign this timeout to some variable outside the event handler. And clear the timeout
at the beginning of every property change trigger.

Something like this,

```js
function HomeViewModel() {
  var myTimer;
  var viewModel = observableModule.fromObject({
    textFieldValue: ""
  });

  viewModel.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
    console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
    if (propertyChangeData.propertyName === "textFieldValue") {
      clearInterval(myTimer);
      myTimer = setTimeout(() => {
        const frameModule = require("ui/frame");
        frameModule.topmost().getViewById("msg").visibility = "visible";
        if (propertyChangeData.value === "") {
          frameModule.topmost().getViewById("msg").visibility = "collapse";
        }
      }, 500);
    }
  });

  return viewModel;
}
```

You may play around with it further, in this playground app.

<a target="_blank" href="https://play.nativescript.org/?template=play-js&id=ATKDmw&v=2">https://play.nativescript.org/?template=play-js&id=ATKDmw&v=2</a>

Demo:

<img style="box-shadow: 2px 2px 5px lightgray;"
    src="{{ site.baseurl }}/assets/img/stopsTyping/typing-detection.gif" alt="Visibility Demo" width="250" />

Have fun!, Happy NativeScripting.

Be sure to let me know your thoughts in the comment section below.
