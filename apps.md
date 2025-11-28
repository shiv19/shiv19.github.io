---
layout: blank
title: Apps
permalink: /apps/
published: true
description: "Discover and access my collection of hosted applications and tools"
---

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  <!-- Header Section -->
  <div class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          <span class="material-symbols-outlined text-5xl align-middle mr-3 text-primary-600">apps</span>
          Apps on shiv19.com
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          A collection of useful applications and tools hosted on my domain. Click any app to access it instantly.
        </p>

        <p class="mt-4 text-base">
          <a href="{{ site.baseurl }}/" class="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
            ← Back to home
          </a>
        </p>

        <!-- Self-hosted Notice -->
        <div class="mt-6 max-w-3xl mx-auto">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <span class="material-symbols-outlined text-blue-500 text-xl">info</span>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-800">
                  <span class="font-medium">Self-hosted apps:</span>
                  These applications run on my personal infrastructure. While I strive for high availability,
                  occasional downtime may occur for maintenance or updates. For critical use cases, please consider
                  alternatives or contact me for enterprise solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Category Filter -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-wrap justify-center gap-2" id="category-filters">
      <button class="category-filter active px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" data-category="all">
        All Apps
      </button>
      {% for category in site.data.apps.categories %}
      <button class="category-filter px-4 py-2 rounded-full text-sm font-medium transition-all duration-200" data-category="{{ category[0] }}">
        {{ category[1].name }}
      </button>
      {% endfor %}
    </div>
  </div>

  <!-- Apps Grid -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="apps-grid">
      {% for app in site.data.apps.apps %}
      {% assign category = site.data.apps.categories[app.category] %}
      <div class="app-card group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden flex flex-col h-full"
           data-category="{{ app.category }}"
           data-url="{{ app.url }}">

        <!-- App Header -->
        <div class="p-6 cursor-pointer flex-1 flex flex-col" onclick="openApp('{{ app.url }}', '{{ app.name }}')">
          <div class="flex items-center mb-4">
            <!-- Favicon (will be loaded dynamically) -->
            <div class="favicon-container w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
              <span class="material-symbols-outlined text-{{ category.color }}-500 text-2xl">{{ app.icon }}</span>
            </div>

            <!-- App Info -->
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
                {{ app.name }}
              </h3>
              <span class="inline-block px-2 py-1 text-xs font-medium bg-{{ category.color }}-100 text-{{ category.color }}-800 rounded-full">
                {{ category.name }}
              </span>
            </div>
          </div>

          <!-- App Description -->
          <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
            {{ app.description }}
          </p>

          <!-- App URL and Self-hosted badge (bottom aligned) -->
          <div class="mt-auto">
            <div class="flex items-center text-xs text-gray-500 mb-2">
              <span class="material-symbols-outlined mr-1 text-sm">link</span>
              <span class="truncate">{{ app.url | remove: 'https://' }}</span>
            </div>

            {% unless app.url contains 'shiv19.com/' %}
            <!-- Self-hosted indicator -->
            <div class="flex justify-start">
              <span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full border border-amber-200" title="Self-hosted - may experience occasional downtime">
                <span class="material-symbols-outlined text-xs mr-1">cloud</span>
                Self-hosted
              </span>
            </div>
            {% endunless %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <div class="flex items-center justify-center mb-4">
          <span class="text-gray-600 text-sm">
            © 2025 Built with
            <span class="text-red-500 mx-1">♥</span>
            by
            <a href="https://github.com/shiv19" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-medium">
              shiv19
            </a>
            <span class="mx-2 text-gray-400">•</span>
            feat.
            <span class="font-medium">Claude Sonnet 4</span>
            on
            <span class="text-gray-700 font-medium">GitHub Copilot</span>
          </span>
        </div>
        <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span class="flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">code</span>
            Open Source
          </span>
          <span class="flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">apps</span>
            {{ site.data.apps.apps | size }} Apps
          </span>
          <span class="flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">security</span>
            Privacy Focused
          </span>
        </div>
      </div>
    </div>
  </footer>
</div>

<!-- Simple App Management Script -->
<script>
// App launcher function
function openApp(url, name) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Category filtering
document.addEventListener('DOMContentLoaded', () => {
  // Setup category filters
  document.querySelectorAll('.category-filter').forEach(filter => {
    filter.addEventListener('click', (e) => {
      filterApps(e.target.dataset.category);
      // Update active filter
      document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Filter function
  function filterApps(category) {
    document.querySelectorAll('.app-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Style filter buttons
  const style = document.createElement('style');
  style.textContent = `
    .category-filter {
      background: #f3f4f6;
      color: #6b7280;
      border: 1px solid #e5e7eb;
    }
    .category-filter:hover {
      background: #e5e7eb;
      transform: translateY(-1px);
    }
    .category-filter.active {
      background: #0ea5e9;
      color: white;
      border-color: #0ea5e9;
    }
  `;
  document.head.appendChild(style);
});
</script>
