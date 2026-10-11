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

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0&display=block">

<section class="apps-grid container" id="apps-grid">
  {% for app in visible_apps %}
  {% assign category = site.data.apps.categories[app.category] %}
  {% assign host = app.url | replace: 'https://', '' | replace: 'http://', '' %}
  <a class="apps-card" href="{{ app.url }}" target="_blank" rel="noopener noreferrer"
     data-category="{{ app.category }}" data-color="{{ category.color }}" aria-label="Open {{ app.name }}">
    <div class="apps-card-top">
      <span class="apps-icon" aria-hidden="true">
        {% if app.icon %}<span class="material-symbols-rounded">{{ app.icon }}</span>{% else %}{{ app.name | slice: 0, 1 | upcase }}{% endif %}
      </span>
      <span class="apps-card-tag">{{ category.name }}</span>
    </div>
    <h2 class="apps-card-title">{{ app.name }}</h2>
    <p class="apps-card-body">{{ app.description }}</p>
    <div class="apps-card-footer">
      <span class="apps-card-link">{{ host }}</span>
      <span class="apps-card-go" aria-hidden="true"><span class="material-symbols-rounded">north_east</span></span>
    </div>
  </a>
  {% endfor %}
</section>

<script>
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
