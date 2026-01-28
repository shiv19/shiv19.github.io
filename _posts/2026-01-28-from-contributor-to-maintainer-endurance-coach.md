---
layout: post
title: "From Contributor to Maintainer: The Birth of Endurance Coach"
date: '2026-01-28 20:00 +1300'
author: multishiv19
comments: true
category:
  - ai
  - open-source
  - running
tags:
  - claude
  - ai
  - running
  - open-source
  - strava
description: How a PR that sat for two weeks led me to fork Claude Coach and build something new for runners.
published: true
---

Two weeks ago, I wrote about [discovering Claude Coach and shipping a PR in one afternoon](/2026/01/11/contributing-to-claude-coach/). I was excited. I'd found a project that combined two things I care about deeply — running and AI — and I'd contributed schema validation to make it more reliable.

Then I waited.

## The Silence

My [PR #2](https://github.com/felixrieseberg/claude-coach/pull/2) sat open. No comments, no review, no merge. I understand — Felix has a day job at Anthropic, open source maintainership is volunteer work, and life gets busy. I'm not bitter about it. But I had plans for 2026.

I'm a sub-3 marathon runner coming off an inconsistent 2024. I wanted to build my base back, train smart, and maybe chase some PRs. I needed this tool to work *now*, not whenever someone got around to reviewing my code.

So I did what any impatient engineer would do: I forked it.

## Why Fork Instead of Wait?

The schema validation PR was just the start. As I used Claude Coach more, I kept hitting walls:

1. **JSON generation was fragile** — Claude would produce plans that *looked* right but broke the renderer
2. **No validation loop** — The AI couldn't detect or fix its own mistakes
3. **Tightly coupled to Claude** — The skill assumed Claude as the only consumer
4. **Verbose output** — Full workout plans as deeply nested JSON meant high token costs and entropy

I realized I didn't just want to patch the existing system. I wanted to rebuild the core abstraction.

## Endurance Coach: A Different Architecture

Over the past two weeks, I've been heads-down rewriting. The result is [Endurance Coach](https://github.com/shiv19/endurance-coach-skill) — a project that acknowledges its lineage but doesn't share the original architecture.

### What Changed

**Contract-first design.** The system now exposes explicit, machine-consumable schemas. AI agents validate outputs and receive structured error feedback before proceeding. No more "render and pray."

**Template-based composition.** Instead of generating massive JSON objects from scratch, the AI selects from a predefined library of workout building blocks. Plans are authored as concise YAML compositions. This turns unconstrained generation into constrained composition — dramatically reducing failures.

**Agent-agnostic.** It's no longer "Claude Coach." Any AI agent or orchestration framework can consume the tool. I use it with [Clawdbot](https://clawd.bot), Claude Code, and Claude.ai interchangeably.

**Validation loops.** The AI can now validate → receive errors → self-correct → validate again. This is how reliable structured output actually works.

### The 1.3.0 Release

Today I shipped version 1.3.0. The [changelog](https://github.com/shiv19/endurance-coach-skill/blob/main/CHANGELOG.md) tells the story:

- **Custom template support** — Create your own workout building blocks
- **`activity --laps` command** — Lap-by-lap analysis for interval sessions
- **Atomic Strava sync** — Database transactions for reliable imports
- **Intensity parsing 2.0** — Proper handling of power zones, HR zones, and RPE
- **Modular CLI** — Broke the monolith into clean, testable modules
- **Comprehensive test suite** — Because I intend to maintain this long-term

58 commits since forking. It's been an intense two weeks.

## Real-World Test: My Monday Track Workout

This morning I used Endurance Coach to analyze my Monday track session — 4x400m Easy-Under-Over repeats at the local track.

The `activity --laps` command pulled my Strava data and broke down each interval:

- **Fastest lap:** 3:30/km pace at 428W — strong top-end speed
- **Peak HR:** 198 bpm on the fast repeats
- **Pattern detected:** Recovery HR stayed elevated (182+ bpm) between sets
- **Late-set fade:** Set 4's "under" pace dropped to 4:13/km vs 3:45-3:55/km earlier

The tool identified exactly what I felt: incomplete recovery between sets. But my Garmin data told a different story — 4.2 Aerobic Training Effect, "Highly Impacting VO2 Max." The workout achieved its goal.

This is what I want Endurance Coach to be: smart enough to flag patterns, honest about the data, but contextual enough to understand that incomplete recovery *was the point* for a VO2 max session.

## What's Next: The Roadmap

I'm not building a plan generator. I'm building a **coaching system** — one that compounds knowledge over time.

### Phase 1: Reflection as Data

Post-workout interviews that convert subjective athlete feedback into structured coaching signal. Three distinct outputs:

1. **Athlete Reflection Summary** — What you said
2. **Coach Notes** — What the coach thinks (may disagree with you)
3. **Coach Confidence** — How certain the assessment is

The separation matters. Good coaches push back on athlete perception when the data tells a different story.

### Phase 2: Intelligence Compounding

Pattern detection across workouts. The north star metric is **Execution Reliability Score** — how well planned training aligns with actual execution, and how perception aligns with data.

Flags like "accumulating fatigue detected" or "execution consistency improving" that inform future recommendations.

### Phase 3: Strava Write-Back

Coach-authored workout titles and descriptions, published with athlete approval. Turning private judgment into public narrative creates accountability.

"VO2 Max Intervals — Strong Opening, Late Fade" tells a better story than "Morning Run."

## Why I'm Doing This

I've been running seriously since 2021. I've done two marathons (including a 2:59:56 at Auckland 2023), countless races, and logged over 10,000 km on Strava. I know what it's like to train with a plan from TrainingPeaks. I know what it's like to wing it. I know the difference good coaching makes.

Most runners can't afford a personal coach. But we all have data — HR, pace, power, laps, perceived effort. The gap isn't data collection; it's *interpretation*. That's what I want Endurance Coach to solve.

This is a free, open-source tool for runners who have at least a little technical know-how. If you can run `npx` commands and connect to Strava, you can use it.

## Try It

```bash
npx skills add shiv19/endurance-coach-skill
```

Then ask your AI assistant:

> Analyze my running history using the endurance-coach skill

The [README](https://github.com/shiv19/endurance-coach-skill) has full setup instructions. Example plans are at [shiv19.github.io/endurance-coach-skill](https://shiv19.github.io/endurance-coach-skill/#demos).

## Acknowledgments

Felix Rieseberg built something valuable with Claude Coach. Without his initial work, I wouldn't have had a starting point. Open source is about building on each other's ideas, and I'm grateful for the foundation.

If my original PR ever gets reviewed, I hope it helps the upstream project too. In the meantime, I have a tool that works for me — and hopefully for other runners who want smarter training.

---

*From contributor to maintainer in two weeks. Sometimes the best path forward is your own.*

---

<small>*10,505 km logged. Sub-3 marathon. Now building tools to help others train smarter.*</small>
