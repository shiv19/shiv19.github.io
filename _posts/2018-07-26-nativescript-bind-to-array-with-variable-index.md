---
layout: post
title: NativeScript bind to array with variable index
date: '2018-07-26 21:30'
author: multishiv19
comments: true
category:
  - nativescript
tags:
  - nativescript
description: How to bind to array with variable index in NativeScript Core
published: true
---

# Context

Let's say you are in a situation where you want to show the user the corresponding
image when the user selects a particular option in NativeScript Core.
We'll use the `<Image>` widget to display the image, and `<SegementedBar>` to
display the options.

# Initial Setup

<p>
  <script src="https://gist.github.com/shiv19/dd56d3c139e5d10260ef0ba36b6a1c16.js"></script>
  <noscript>
    home-page.xml
    <pre>
      &lt;Page loaded="pageLoaded" unloaded="pageUnLoaded" class="page" xmlns="http://www.nativescript.org/tns.xsd"&gt;
        &lt;ActionBar title="Binding to array with variable index" class="action-bar"&gt;
        &lt;/ActionBar&gt;
        &lt;FlexboxLayout flexDirection="column" class="p-10"&gt;
          &lt;Image width="50" src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" /&gt;
          &lt;Label class="h2 text-center" text="Flavors of NativeScript" /&gt;
          &lt;SegmentedBar id="segmentedBar"&gt;
            &lt;SegmentedBar.items&gt;
              &lt;SegmentedBarItem title="{N} - JS" /&gt;
              &lt;SegmentedBarItem title="{N} - TS" /&gt;
              &lt;SegmentedBarItem title="{N} - NG" /&gt;
              &lt;SegmentedBarItem title="{N} - Vue" /&gt;
            &lt;/SegmentedBar.items&gt;
          &lt;/SegmentedBar&gt;
          &lt;!-- Bind the label to `index`th element in the `text` array --&gt;
          &lt;Label class="h3 m-10 text-center" text="" /&gt;
          &lt;!-- Bind the src to `index`th element in the `images` array --&gt;
          &lt;Image width="250" src="" /&gt;
        &lt;/FlexboxLayout&gt;
      &lt;/Page&gt;
    </pre>

    home-page.js
    <pre>
      const HomeViewModel = require("./home-view-model");
      const homeViewModel = new HomeViewModel();

      exports.pageLoaded = (args) => {
        const page = args.object;
        page.bindingContext = homeViewModel;

        const segmentedBar = page.getViewById("segmentedBar");
        segmentedBar.on("selectedIndexChange", homeViewModel.onIndexChange);
      };

      exports.pageUnLoaded = (args) => {
        const page = args.object;
        const segmentedBar = page.getViewById("segmentedBar");
        segmentedBar.off("selectedIndexChange");
      };
    </pre>

    home-view-model.js
    <pre>
      const observableModule = require("data/observable");

      function HomeViewModel() {
        const viewModel = observableModule.fromObject({
          index: 0,
          images: [
            'https://shiv19.com/assets/img/logos/js.png',
            'https://shiv19.com/assets/img/logos/ts.png',
            'https://shiv19.com/assets/img/logos/ng.png',
            'https://shiv19.com/assets/img/logos/vue.png'
          ],
          text: [
            'NativeScript with JavaScript',
            'NativeScript with TypeScript',
            'NativeScript with Angular',
            'NativeScript with Vue'
          ],
          onIndexChange(args) {
            viewModel.set('index', args.object.selectedIndex);
          }
        });

        return viewModel;
      }

      module.exports = HomeViewModel;
    </pre>
  </noscript>
</p>

> **Note:** At the time of writing this article it is not possible to bind
to `selectedIndexChange` event from the xml file in NativeScript core.

# Challenge

Before you proceed reading this further, try to do this yourself.

Here is the link to start code: [https://play.nativescript.org/?template=play-js&id=tZVTxB](https://play.nativescript.org/?template=play-js&id=tZVTxB)

Did you manage to do it? If yes, well done! If no, read on!

# Solution

The intuitive approach here would be to bind the `text` property to
`{{ text[index] }}` and bind the `src` property to `{{ src[index] }}`

However, using multiple variables in an expression like that is not supported
in NativeScript. So the way we bind is by specifying the different variables that
we will be using, before using them in an expression.

So the correct way to bind it is,
{% raw %}`text="{{ text index, text[index] }}"`{% endraw %} for the label\\
{% raw %}`src="{{  images index, images[index]  }}"`{% endraw %} for the image\\
(Note: The order in which you specify the variables does not matter)

Here is the link to the completed code: [https://play.nativescript.org/?template=play-js&id=LG7lHa](https://play.nativescript.org/?template=play-js&id=LG7lHa)

Let me know if you enjoyed this short tutorial on Twitter: [@MultiShiv19](https://twitter.com/MultiShiv19),
and what else you'd like to see in these tutorials.
