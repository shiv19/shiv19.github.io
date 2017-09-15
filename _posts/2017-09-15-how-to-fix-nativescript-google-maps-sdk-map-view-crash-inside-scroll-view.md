---
layout: post
title: How to fix nativescript-google-maps-sdk map view crash inside scroll view
date: 2017-09-15 19:23
author: multishiv19
comments: true
categories: [nativescript, nativescript-google-maps-sdk, workaround]
---

Note: This is a workaround, not a fix

https://github.com/NativeScript/NativeScript/issues/3960#issuecomment-324662048

After seeing this comment, I tried to fork the nativescript-google-maps-sdk plugin and fix the issue, but even after following it, I faced the same error.

Luckily, I came up with a workaround, I'm sharing it here so that it'll be useful for someone someday,

The following instructions assume that you have installed nativescript-google-maps-sdk,
and you are using it in a tab view, and because of this, when you resume your app from recents tab on android, and navigate to the tab containing the map, the app crashes.

Step 1: Install nativescript-accordion

`tns plugin add nativescript-accordion`

Step 2: In the xml file where you are using the map make sure these 2 xml namespaces are present

`xmlns:maps="nativescript-google-maps-sdk"`

`xmlns:accordion="nativescript-accordion"`

Step 3: Enclose your map element inside a accordion

```xml
<accordion:Accordion height="250" id="accordionLayout" items="{{ items }}">
            <accordion:Accordion.itemTemplate>
                <StackLayout>
                    <maps:mapView id="mapView"
                        height="250"
                        mapReady="onMapReady" />
                </StackLayout>
            </accordion:Accordion.itemTemplate>
        </accordion:Accordion>
```

Step 4: In your code behind, import `const observableModule = require("data/observable");`
and create a simple view-model, this is a dummy to setup our accordion,

```javascript
var accordionData = new observableModule.fromObject({
    items: [{
        title: "Map View",
        items: [
          { name: "map" }
        ]
    }]
});
```

Step 5: In the loaded event of your page, set the binding context of your accordionLayout to the view-model that we created in the previous step

```javascript
accordionLayout = component.getViewById("accordionLayout");
accordionLayout.bindingContext = accordionData;
accordionLayout.selectedIndex = 0;
```
Note: We are setting the selectedIndex, so that it opens the accordion by default, and we have not created any header template, so the accordion won't have a header.

Step 6: Sample onMapReady function

```javascript
exports.onMapReady = function (args) {
    if(someDataObj.location){
        var mapView = args.object;
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(someDataObj.location.lat, someDataObj.location.lng);
        marker.title = someDataObj.name;
        mapView.addMarker(marker);
        
        mapView.latitude = someDataObj.location.lat;
        mapView.longitude = someDataObj.location.lng;
        mapView.zoom = 16;
        // Disabling zoom gestures
        mapView.settings.zoomGesturesEnabled = false;
        mapView.settings.rotateGesturesEnabled = false;
        mapView.settings.scrollGesturesEnabled = false;
    }
}
```

And that's about it, with that you should have pretty much the same result that you had before,
only now, it doesn't crash the same way.

Screen shot: 

![sample](https://user-images.githubusercontent.com/9407019/30485183-47c8926c-9a4a-11e7-9480-e6848f0cebfd.jpeg)


