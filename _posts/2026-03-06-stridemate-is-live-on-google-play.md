---
layout: post
title: "Stridemate Is Live on Google Play"
date: '2026-03-06 22:00 +1300'
author: multishiv19
comments: true
category:
  - projects
tags:
  - running
  - android
  - ionic
  - projects
description: Stridemate, my offline pace calculator for runners, is now live on Google Play for Android.
published: true
---

Stridemate is now live on Google Play for Android.

After more than two years of on-and-off building, refining, and actually using it for my own training, I finally pushed it to production.

[Get Stridemate on Google Play](https://play.google.com/store/apps/details?id=com.shiv19.stridemate)

![Stridemate feature graphic]({{ site.baseurl }}/assets/img/stridemate/feature-graphic.png)

## What Stridemate Is

Stridemate is a fast, offline pace calculator built for runners.

It started with a simple frustration: most running calculators make basic things feel slower than they should. If I want to flip between kilometer and mile pace, estimate a race time, check splits, or work backwards from a goal pace, I do not want five screens, an account wall, or a bunch of ads in the way.

So I built the tool I wanted:

- pace, time, and distance conversion
- race prediction from 400m to 100 miles
- detailed splits and pacing strategy
- heat adjustment
- training pace guidance
- LTHR guidance
- blocks planning
- distance estimation for interval workouts

It is privacy-first by default: no account, no ads, no analytics, and it works offline after install.

## A Long Road to v1

The first commit in the repo was on December 3, 2023. Since then, Stridemate has grown through 283 commits into something much broader than the original calculator.

The early version was basically a focused pace tool. Over time it picked up the features I kept wanting as a self-coached runner: smarter splits, better race-planning controls, training paces, threshold heart-rate guidance, heat adjustments, and a way to sketch interval sessions and estimate total distance before heading out.

By late November 2025 I had a formal release checklist around `1.0.0`. I still did not ship it then. I kept polishing. Better onboarding. More stable calculator flows. Safer Android release settings. More useful training tools. Less friction.

The version that is live today is `1.2.3` (Build 27), which feels like a better reflection of what Stridemate actually is.

## What Shipped

The Android production release includes the core calculator, but the part I am happiest with is that it goes beyond a single conversion screen.

The main calculator is still the center of the app:

![Stridemate core calculator]({{ site.baseurl }}/assets/img/stridemate/core-calculator.png)

You can use Splits Planner to shape race pacing instead of just accepting flat splits:

![Stridemate splits planner]({{ site.baseurl }}/assets/img/stridemate/splits-planner.png)

You can also adjust pacing for heat and humidity, which is the kind of thing that matters a lot more on real training weeks than in ideal-condition calculators:

![Stridemate heat adjustment]({{ site.baseurl }}/assets/img/stridemate/heat-adjustment.png)

The current release also includes:

- pace chart comparisons for nearby scenarios
- custom race distance management
- workout preset save/load for the distance estimator
- theme and accent personalization
- improved onboarding and sharing

## Why I Made It

I built Stridemate before the current wave of AI coding assistants. This app came out of repetition more than novelty: needing the same calculations again and again, wanting them faster, and wanting them on my phone without relying on some bloated website.

I am the target user. I race. I train. I think about pacing a lot. And I wanted a tool that respected that runners are not all trying to do the same thing. Sometimes you want a simple conversion. Sometimes you want to pressure-test a half marathon pacing strategy. Sometimes you want to estimate whether a session will come out to 11.8 km or 14.2 km before you start.

That is the gap Stridemate is meant to fill.

## What’s Next

Android is first. I still want to improve the store listing assets, keep tightening the UX, and continue expanding the training side of the app.

The roadmap already has bigger ideas on it, especially around workout building and export. But first I want to get real usage, real feedback, and see which parts of Stridemate runners actually lean on most.

If you try it and have thoughts, email me at [sp@shiv19.com](mailto:sp@shiv19.com).

## Download

Stridemate is now available on Android:

[https://play.google.com/store/apps/details?id=com.shiv19.stridemate](https://play.google.com/store/apps/details?id=com.shiv19.stridemate)

If you are on iOS, you can still use Stridemate by installing the PWA from [https://shiv19.com/stridemate](https://shiv19.com/stridemate).

Shipping your own app is still one of the most satisfying things in software. This one took a while, but it is out.
