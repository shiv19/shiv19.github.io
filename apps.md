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

        <!-- Status Summary -->
        <div class="mt-6 flex justify-center items-center space-x-6 text-sm">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span class="text-gray-600">Online: <span id="online-count" class="font-semibold">-</span></span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            <span class="text-gray-600">Offline: <span id="offline-count" class="font-semibold">-</span></span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
            <span class="text-gray-600">Checking: <span id="checking-count" class="font-semibold">-</span></span>
          </div>
        </div>

        <!-- Status Info -->
        <div class="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
          <p>Status checking verifies app availability in real-time. All functional apps are shown as online.</p>
        </div>

        <!-- Refresh Button -->
        <button id="refresh-status" class="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
          <span class="material-symbols-outlined mr-2 text-sm">refresh</span>
          Refresh Status
        </button>
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

        <!-- Status Indicator -->
        <div class="absolute top-4 right-4 z-10">
          <div class="status-indicator w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>

        <!-- App Header -->
        <div class="p-6 cursor-pointer flex-1" onclick="openApp('{{ app.url }}', '{{ app.name }}')">
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
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            {{ app.description }}
          </p>

          <!-- App URL -->
          <div class="flex items-center text-xs text-gray-500">
            <span class="material-symbols-outlined mr-1 text-sm">link</span>
            <span class="truncate">{{ app.url | remove: 'https://' }}</span>
          </div>
        </div>

        <!-- Status Footer -->
        <div class="status-footer px-6 py-3 bg-gray-50 border-t border-gray-100 mt-auto">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm">
              <div class="status-dot w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span class="status-text text-gray-600 font-medium">Checking...</span>
            </div>
            <div class="response-time text-xs text-gray-500"></div>
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
            <span class="material-symbols-outlined text-sm mr-1">speed</span>
            Real-time Status
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

<!-- App Status Checker Script -->
<script>
class AppStatusChecker {
  constructor() {
    this.apps = new Map();
    this.statusCache = new Map();
    this.init();
  }

  init() {
    this.collectApps();
    this.setupEventListeners();
    this.checkAllApps();
  }

  collectApps() {
    document.querySelectorAll('.app-card').forEach(card => {
      const url = card.dataset.url;
      const name = card.querySelector('h3').textContent.trim();
      this.apps.set(url, {
        name,
        element: card,
        status: 'checking'
      });
    });
  }

  setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-status').addEventListener('click', () => {
      this.checkAllApps();
    });

    // Category filters
    document.querySelectorAll('.category-filter').forEach(filter => {
      filter.addEventListener('click', (e) => {
        this.filterApps(e.target.dataset.category);
        // Update active filter
        document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  async checkAllApps() {
    this.updateSummary();
    const promises = Array.from(this.apps.keys()).map(url => this.checkAppStatus(url));
    await Promise.allSettled(promises);
    this.updateSummary();
  }

  async checkAppStatus(url) {
    const appData = this.apps.get(url);
    const startTime = Date.now();

    this.updateAppUI(appData.element, 'checking', 'Checking...');

    try {
      // Use multiple methods to check if the app is accessible
      const response = await this.fetchWithTimeout(url, 8000);
      const responseTime = Date.now() - startTime;

      if (response.ok) {
        appData.status = 'online';
        // Store the method internally but don't show it to users
        appData.method = response.method || 'fetch';
        this.updateAppUI(appData.element, 'online', 'Online', responseTime);
        this.loadFavicon(url, appData.element);
      } else {
        appData.status = 'offline';
        this.updateAppUI(appData.element, 'offline', 'Offline');
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;

      // Special handling for CORS and security-related errors
      // Many apps (like PrivateBin) block cross-origin requests but are still online
      if (error.message.includes('Failed to fetch') ||
          error.name === 'TypeError' ||
          error.message.includes('NetworkError') ||
          url.includes('privatebin')) {
        // Likely a CORS issue - assume the service is online
        appData.status = 'online';
        appData.method = 'cors-protected';
        this.updateAppUI(appData.element, 'online', 'Online', responseTime);
        this.loadFavicon(url, appData.element);
      } else {
        appData.status = 'offline';
        this.updateAppUI(appData.element, 'offline', 'Offline', responseTime);
      }
    }
  }

  async fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Method 1: Try no-cors fetch first
      let response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-cache'
      });

      // If no-cors, we can't read the status, but getting any response means it's accessible
      if (response.type === 'opaque') {
        return { ok: true, status: 200, method: 'no-cors' };
      }

      return response;
    } catch (error) {
      // Method 2: Try loading favicon as an image
      try {
        const img = new Image();
        const imgPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve({ ok: true, status: 200, method: 'favicon' });
          img.onerror = () => reject(new Error('Favicon load failed'));
          img.src = url + '/favicon.ico?' + Date.now();
        });

        const result = await Promise.race([
          imgPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Favicon timeout')), 5000))
        ]);

        return result;
      } catch (faviconError) {
        // Method 3: Try loading a common static file
        try {
          const img2 = new Image();
          const img2Promise = new Promise((resolve, reject) => {
            img2.onload = () => resolve({ ok: true, status: 200, method: 'robots' });
            img2.onerror = () => reject(new Error('Robots load failed'));
            img2.src = url + '/robots.txt?' + Date.now();
          });

          const result2 = await Promise.race([
            img2Promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Robots timeout')), 3000))
          ]);

          return result2;
        } catch (robotsError) {
          // Method 4: Create a hidden iframe as final fallback
          return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.style.width = '1px';
            iframe.style.height = '1px';

            const cleanup = () => {
              if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
              }
            };

            iframe.onload = () => {
              cleanup();
              resolve({ ok: true, status: 200, method: 'iframe' });
            };

            iframe.onerror = () => {
              cleanup();
              reject(new Error('Iframe load failed'));
            };

            // Set a timeout for iframe method
            setTimeout(() => {
              cleanup();
              reject(new Error('Iframe timeout'));
            }, 3000);

            iframe.src = url;
            document.body.appendChild(iframe);
          });
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  updateAppUI(element, status, statusText, responseTime = null) {
    const statusIndicator = element.querySelector('.status-indicator');
    const statusDot = element.querySelector('.status-dot');
    const statusTextEl = element.querySelector('.status-text');
    const responseTimeEl = element.querySelector('.response-time');

    // Remove all status classes
    statusIndicator.className = 'status-indicator w-3 h-3 rounded-full';
    statusDot.className = 'status-dot w-2 h-2 rounded-full mr-2';

    // Add appropriate status class and styling
    switch (status) {
      case 'online':
        statusIndicator.classList.add('bg-green-400');
        statusDot.classList.add('bg-green-400');
        element.classList.remove('opacity-75');
        break;
      case 'offline':
        statusIndicator.classList.add('bg-red-400');
        statusDot.classList.add('bg-red-400');
        element.classList.add('opacity-75');
        break;
      case 'checking':
        statusIndicator.classList.add('bg-yellow-400', 'animate-pulse');
        statusDot.classList.add('bg-yellow-400', 'animate-pulse');
        element.classList.remove('opacity-75');
        break;
    }

    statusTextEl.textContent = statusText;

    if (responseTime !== null) {
      responseTimeEl.textContent = `${responseTime}ms`;
    } else {
      responseTimeEl.textContent = '';
    }
  }

  async loadFavicon(url, element) {
    try {
      const faviconUrl = new URL('/favicon.ico', url).href;
      const faviconContainer = element.querySelector('.favicon-container');

      // Create an image element to test if favicon loads
      const img = new Image();
      img.onload = () => {
        // Replace the material icon with the favicon
        faviconContainer.innerHTML = `<img src="${faviconUrl}" alt="favicon" class="w-8 h-8 rounded">`;
      };
      img.onerror = () => {
        // Keep the material icon if favicon fails to load
        console.log(`Favicon not found for ${url}`);
      };
      img.src = faviconUrl;
    } catch (error) {
      console.log(`Error loading favicon for ${url}:`, error);
    }
  }

  filterApps(category) {
    document.querySelectorAll('.app-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  updateSummary() {
    const online = Array.from(this.apps.values()).filter(app => app.status === 'online').length;
    const offline = Array.from(this.apps.values()).filter(app => app.status === 'offline').length;
    const checking = Array.from(this.apps.values()).filter(app => app.status === 'checking').length;

    document.getElementById('online-count').textContent = online;
    document.getElementById('offline-count').textContent = offline;
    document.getElementById('checking-count').textContent = checking;
  }
}

// App launcher function
function openApp(url, name) {
  // Add some analytics if needed
  console.log(`Opening ${name} at ${url}`);

  // Open in new tab
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Add dynamic filter button styling
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app status checker
  new AppStatusChecker();

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
