---
layout: post
title: "How I Found Claude Coach and Shipped a PR in One Afternoon"
date: '2026-01-11 13:00 +1300'
author: multishiv19
comments: true
category:
  - ai
  - open-source
tags:
  - claude
  - ai
  - running
  - open-source
description: Discovering Felix Rieseberg's Claude Coach project and contributing schema validation in a single session.
published: true
---

This weekend I stumbled upon a delightful project called [Claude Coach](https://felixrieseberg.github.io/claude-coach/) by [Felix Rieseberg](https://github.com/felixrieseberg), and within a few hours I'd gone from user to contributor. Here's how it happened.

## It Started with Clawdbot

I've been setting up [Clawdbot](https://clawd.bot) — a personal AI assistant that runs on your own devices and connects to the messaging platforms you already use (WhatsApp, Telegram, Slack, etc.). Think of it as your own AI companion that can control your Mac, access your files, manage your calendar, and more.

Clawdbot has a skills system via [ClawdHub](https://clawdhub.com), and as a runner looking to make a comeback in 2026, I went searching for Claude plugins that could connect to Strava. That's when I found Felix's Claude Coach project on GitHub.

I liked it so much that I decided to publish it as a skill on ClawdHub myself, and [created an issue](https://github.com/felixrieseberg/claude-coach/issues/1) on the repo to let Felix know. Then I started using it — and that's when I hit the schema problem.

## What is Claude Coach?

Claude Coach is an open-source tool that turns Claude into a personalized endurance coach. It syncs with your Strava data and generates periodized training plans for marathons, triathlons, and ultra-endurance events.

The magic is in how it works:
1. **Sync your Strava** — Your activities get stored in a local SQLite database
2. **Claude analyzes your training** — It queries your history to understand your fitness
3. **Generate a plan** — Output as structured JSON, then render to a beautiful HTML viewer

Felix built this as a skill for Claude, and it's genuinely impressive. As a sub-3 marathon runner looking to make 2026 my comeback year, I was excited to try it.

## The Problem I Hit

After syncing my Strava data (366 activities!), I asked Claude to generate a 4-week base building plan. The JSON was created, but when I rendered it to HTML, I got:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'id')
```

The issue? The JSON schema for training plans is complex, and without validation, it's easy to generate structurally incorrect data. Claude was producing JSON that *looked* right but didn't match what the renderer expected.

## The Fix: Zod Schema Validation

Instead of just fixing my plan manually and moving on, I decided to contribute a proper solution. I forked the repo and used Claude Code to add [Zod](https://zod.dev/) schema validation.

The PR adds two new methods to the `claude-coach` npm package:

1. **`npx claude-coach schema`** — Outputs the full Zod schema for reference
2. **`npx claude-coach validate <file>`** — Validates a JSON file and prints any errors

Now, before rendering, you can validate your plan:

```bash
npx claude-coach validate my-training-plan.json
```

If there are schema errors, you get clear feedback instead of a cryptic runtime error.

## The Pull Request

I submitted [PR #2](https://github.com/felixrieseberg/claude-coach/pull/2) to the repo. The changes:
- Added Zod as a dependency
- Defined the complete `TrainingPlan` schema
- Added `schema` and `validate` CLI commands
- All existing example JSONs pass validation

## Why This Matters

As AI-generated content becomes more common, **schema validation is essential**. LLMs are great at generating structured data, but they don't inherently know the exact shape your application expects. Zod bridges that gap beautifully.

For Claude Coach specifically, this means:
- Claude can reference the schema before generating plans
- Users get immediate feedback on malformed JSON
- The render step becomes more reliable

## Try It Yourself

If you're a runner, triathlete, or endurance athlete, give Claude Coach a try:

- **Project homepage:** [https://felixrieseberg.github.io/claude-coach/](https://felixrieseberg.github.io/claude-coach/)
- **GitHub repo:** [https://github.com/felixrieseberg/claude-coach](https://github.com/felixrieseberg/claude-coach)
- **ClawdHub skill:** [https://clawdhub.com/shiv19/clawd-coach](https://clawdhub.com/shiv19/clawd-coach)

And if you want the full AI assistant experience — where Claude can sync your Strava, generate plans, and much more — check out [Clawdbot](https://clawd.bot). It's been a game-changer for me this weekend.

Huge thanks to Felix for building Claude Coach and making it open source. It's a great example of how AI tools can be practical and personal.

---

*From discovering a project to shipping a PR in one afternoon — that's the beauty of open source. 🚀*

---

<small>*Footnote: This post was written by Sparky, my [Clawdbot](https://clawd.bot) AI assistant. I made minor edits. We set each other up this weekend — it's been quite the journey.*</small>
