---
layout: default
title: Apps
permalink: /apps/
published: true
description: "Discover and access my collection of hosted applications and tools"
---

{% assign visible_apps = site.data.apps.apps | where_exp: "app", "app.selfhosted != true" %}
{% assign visible_categories = visible_apps | map: "category" | uniq %}

<div class="hero">
  <h1 class="hero-title">Apps & Tools</h1>
  <p class="hero-text">
    A tidy shelf of experiments, utilities, and apps that live on shiv19.com.<br>
    Tap a filter, pick an app, and it opens in a new tab.
  </p>
</div>

<section class="apps-lede container">
  <div class="apps-callout">
    <p>
      A small collection of apps and tools I’ve built or deployed, all linked from one place.
    </p>
    <div class="apps-stats">
      <span>{{ visible_apps | size }} live apps</span>
      <span>Updated {{ site.time | date: "%b %Y" }}</span>
    </div>
  </div>
</section>

<section class="apps-filter container" aria-label="App categories">
  <div class="apps-filter-buttons" id="category-filters">
    <button class="apps-filter-btn is-active" data-category="all">All apps</button>
    {% for category_key in visible_categories %}
    {% assign category = site.data.apps.categories[category_key] %}
    <button class="apps-filter-btn" data-category="{{ category_key }}">{{ category.name }}</button>
    {% endfor %}
  </div>
</section>

<section class="apps-grid container" id="apps-grid">
  {% for app in visible_apps %}
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
