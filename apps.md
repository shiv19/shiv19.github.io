---
layout: default
title: Apps
permalink: /apps/
published: true
description: "Discover and access my collection of hosted applications and tools"
---

<div class="hero">
  <h1 class="hero-title">Apps & Tools</h1>
  <p class="hero-text">
    A tidy shelf of experiments, utilities, and self-hosted services that live on shiv19.com.<br>
    Tap a filter, pick an app, and it opens in a new tab.
  </p>
</div>

<section class="apps-lede container">
  <div class="apps-callout">
    <p>
      These projects run on my own infrastructure, so there might be the occasional reboot window. If something looks down,
      ping me and I'll nudge it back awake.
    </p>
    <div class="apps-stats">
      <span>{{ site.data.apps.apps | size }} live apps</span>
      <span>Updated {{ site.time | date: "%b %Y" }}</span>
    </div>
  </div>
</section>

<section class="apps-filter container" aria-label="App categories">
  <div class="apps-filter-buttons" id="category-filters">
    <button class="apps-filter-btn is-active" data-category="all">All apps</button>
    {% for category in site.data.apps.categories %}
    <button class="apps-filter-btn" data-category="{{ category[0] }}">{{ category[1].name }}</button>
    {% endfor %}
  </div>
</section>

<section class="apps-grid container" id="apps-grid">
  {% for app in site.data.apps.apps %}
  {% assign category = site.data.apps.categories[app.category] %}
  {% assign icon_letter = app.name | slice: 0, 1 | upcase %}
  <article class="apps-card" data-category="{{ app.category }}" data-url="{{ app.url }}">
    <header class="apps-card-header">
      <div class="apps-icon" aria-hidden="true">{{ icon_letter }}</div>
      <div>
        <p class="apps-card-title">{{ app.name }}</p>
        <p class="apps-card-tag">{{ category.name }}</p>
      </div>
    </header>
    <p class="apps-card-body">{{ app.description }}</p>
    <footer class="apps-card-footer">
      <span class="apps-card-link">{{ app.url | replace: 'https://', '' }}</span>
      {% unless app.url contains 'shiv19.com/' %}
      <span class="apps-card-badge" title="Runs on my personal server">Self-hosted</span>
      {% endunless %}
      <button class="apps-card-open" type="button" aria-label="Open {{ app.name }}" onclick="openApp('{{ app.url }}')">
        Launch
      </button>
    </footer>
  </article>
  {% endfor %}
</section>

<script>
function openApp(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('DOMContentLoaded', function () {
  const buttons = Array.from(document.querySelectorAll('.apps-filter-btn'));
  const cards = Array.from(document.querySelectorAll('.apps-card'));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      const category = button.dataset.category;

      cards.forEach((card) => {
        const isMatch = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !isMatch);
      });
    });
  });
});
</script>
