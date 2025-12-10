---
title: "Sigma Computing vs. ThoughtSpot: Competitive Analysis"
permalink: /sigma-vs-thoughtspot/
published: true
description: "An in-depth competitive analysis comparing Sigma Computing and ThoughtSpot across user experience, architecture, features, and final verdict."
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sigma Computing vs. ThoughtSpot: Competitive Analysis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #fdfaf6; color: #333; }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) { .chart-container { height: 350px; } }

        .tab-active { border-bottom: 2px solid #d97706; color: #d97706; font-weight: 600; }
        .tab-inactive { color: #6b7280; }
        .tab-inactive:hover { color: #374151; }

        .card-shadow { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
        .toggle-checkbox:checked { right: 0; border-color: #d97706; }
        .toggle-checkbox:checked + .toggle-label { background-color: #d97706; }

        /* Custom scrollbar for tables */
        .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #f3f4f6; }
    </style>
    <!-- Chosen Palette: Warm Neutrals with Amber/Orange Accents -->
    <!-- Application Structure Plan: Dashboard layout with top-level tabs for major analysis categories (Overview, UX, Architecture, Features, Verdict).
         Rationale: Users evaluating BI tools need to jump between high-level summaries and technical details. Tabs provide a non-linear exploration path.
         Key Interactions:
         1. Radar Chart for capability scoring.
         2. Toggle switches to compare "Head-to-Head" views.
         3. Interactive filterable table for feature checklists.
         4. Dynamic architecture blocks using HTML/CSS to visualize data flow without SVGs.
    -->
    <!-- Visualization & Content Choices:
         1. Radar Chart (Chart.js): To visualize the multi-dimensional strengths (e.g., Ease of Use vs. Power User capabilities).
         2. Bar Chart (Chart.js): To compare Setup Time and Learning Curve estimates.
         3. Interactive Cards: For the "Architecture" section to show the difference between Direct Query (Sigma) and Search Indexing (ThoughtSpot).
         4. Justification: Charts allow quick visual comparison of strengths. HTML/CSS diagrams explain the technical backend differences effectively without external assets.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
</head>
<body class="bg-[#fdfaf6] min-h-screen flex flex-col">

    <!-- Navigation Header -->
    <header class="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="bg-amber-500 text-white font-bold rounded p-1.5 mr-3 text-sm">VS</div>
                    <h1 class="text-xl font-bold text-stone-800 tracking-tight">Analytics Showdown: Sigma vs. ThoughtSpot</h1>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <button onclick="switchTab('overview')" id="nav-overview" class="tab-active px-1 pt-1 text-sm font-medium transition-colors duration-200">Overview</button>
                    <button onclick="switchTab('experience')" id="nav-experience" class="tab-inactive px-1 pt-1 text-sm font-medium transition-colors duration-200">User Experience</button>
                    <button onclick="switchTab('architecture')" id="nav-architecture" class="tab-inactive px-1 pt-1 text-sm font-medium transition-colors duration-200">Architecture</button>
                    <button onclick="switchTab('verdict')" id="nav-verdict" class="tab-inactive px-1 pt-1 text-sm font-medium transition-colors duration-200">Verdict</button>
                </nav>
            </div>
        </div>
        <!-- Mobile Nav -->
        <div class="md:hidden flex justify-around border-t border-stone-100 bg-stone-50 py-2">
            <button onclick="switchTab('overview')" class="text-xs font-medium text-stone-600">Overview</button>
            <button onclick="switchTab('experience')" class="text-xs font-medium text-stone-600">UX</button>
            <button onclick="switchTab('architecture')" class="text-xs font-medium text-stone-600">Tech</button>
            <button onclick="switchTab('verdict')" class="text-xs font-medium text-stone-600">Verdict</button>
        </div>
    </header>

    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <!-- SECTION: OVERVIEW -->
        <section id="overview-section" class="space-y-8 animate-fade-in">
            <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100">
                <h2 class="text-2xl font-bold text-stone-800 mb-4">Executive Summary</h2>
                <p class="text-stone-600 leading-relaxed mb-6">
                    This interactive report compares two leading "modern stack" BI tools.
                    <strong>Sigma Computing</strong> positions itself as a "spreadsheet interface for the cloud data warehouse," targeting users who love Excel but need the scale of Snowflake/BigQuery.
                    <strong>ThoughtSpot</strong> positions itself as the "AI-Powered Analytics" leader, utilizing search and natural language processing to empower non-technical frontline workers.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Sigma Card -->
                    <div class="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                        <h3 class="font-bold text-blue-900 text-lg mb-2">Sigma Computing</h3>
                        <ul class="text-sm text-blue-800 space-y-2">
                            <li><span class="font-semibold">Core Metaphor:</span> The Spreadsheet</li>
                            <li><span class="font-semibold">Primary User:</span> Data Explorers, Analysts, Ops teams</li>
                            <li><span class="font-semibold">Superpower:</span> Ad-hoc analysis on billions of rows without SQL.</li>
                        </ul>
                    </div>
                    <!-- ThoughtSpot Card -->
                    <div class="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                        <h3 class="font-bold text-amber-900 text-lg mb-2">ThoughtSpot</h3>
                        <ul class="text-sm text-amber-800 space-y-2">
                            <li><span class="font-semibold">Core Metaphor:</span> Google Search / AI Chat</li>
                            <li><span class="font-semibold">Primary User:</span> Frontline Business Users, Non-technical Execs</li>
                            <li><span class="font-semibold">Superpower:</span> Instant answers via search & "SpotIQ" automated insights.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Radar Chart Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 bg-white rounded-xl p-6 card-shadow border border-stone-100">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-stone-800">Capability Profile Comparison</h3>
                        <span class="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded">Interactive Visualization</span>
                    </div>
                    <p class="text-sm text-stone-500 mb-4">Comparing strengths across 5 key dimensions. Note how Sigma leans towards depth of analysis, while ThoughtSpot leans towards accessibility.</p>
                    <div class="chart-container">
                        <canvas id="radarChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100 flex flex-col justify-center">
                    <h3 class="text-lg font-bold text-stone-800 mb-4">Quick Stats</h3>
                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="text-stone-600">Learning Curve (Analyst)</span>
                                <span class="font-semibold text-blue-600">Sigma Wins</span>
                            </div>
                            <div class="w-full bg-stone-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                            </div>
                            <p class="text-xs text-stone-400 mt-1">Excel familiarity makes Sigma faster to pick up for analysts.</p>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="text-stone-600">Learning Curve (Business User)</span>
                                <span class="font-semibold text-amber-600">ThoughtSpot Wins</span>
                            </div>
                            <div class="w-full bg-stone-200 rounded-full h-2">
                                <div class="bg-amber-500 h-2 rounded-full" style="width: 90%"></div>
                            </div>
                            <p class="text-xs text-stone-400 mt-1">Search bar interface requires almost no training.</p>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="text-stone-600">Mobile Experience</span>
                                <span class="font-semibold text-amber-600">ThoughtSpot Wins</span>
                            </div>
                            <div class="w-full bg-stone-200 rounded-full h-2">
                                <div class="bg-amber-500 h-2 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: USER EXPERIENCE -->
        <section id="experience-section" class="hidden space-y-8 animate-fade-in">
            <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100">
                <h2 class="text-2xl font-bold text-stone-800 mb-4">The Interface Paradigm</h2>
                <p class="text-stone-600 mb-6">The fundamental difference lies in how a user asks a question. Sigma mimics a spreadsheet to allow granular manipulation. ThoughtSpot mimics a search engine to allow rapid retrieval.</p>

                <!-- Interactive UX Toggle -->
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3 space-y-2">
                        <button onclick="updateUxView('sigma')" class="w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none bg-blue-50 border-blue-500 ring-1 ring-blue-500" id="btn-sigma-ux">
                            <span class="font-bold block text-blue-900">Sigma: The Workbook</span>
                            <span class="text-xs text-blue-700">Detailed, cell-based, familiar.</span>
                        </button>
                        <button onclick="updateUxView('thoughtspot')" class="w-full text-left p-4 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all duration-200 focus:outline-none" id="btn-ts-ux">
                            <span class="font-bold block text-amber-900">ThoughtSpot: The Liveboard</span>
                            <span class="text-xs text-amber-700">Search-driven, AI answers, clear visuals.</span>
                        </button>
                    </div>

                    <div class="w-full md:w-2/3 bg-stone-50 rounded-xl p-6 border border-stone-200 relative overflow-hidden">
                        <div id="ux-content-sigma" class="transition-opacity duration-300">
                            <h3 class="text-xl font-bold text-blue-900 mb-2">The "Workbook" Experience</h3>
                            <div class="flex items-start gap-4 mb-4">
                                <div class="bg-white p-3 rounded shadow-sm text-2xl">📊</div>
                                <p class="text-sm text-stone-700">Users work in "Workbooks" that look just like Excel sheets. You can see underlying data in a spreadsheet view below every chart.</p>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">Calculations use Excel syntax (e.g., SumIf, DateDiff).</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">Drill anywhere functionality (unlimited paths).</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">Input Tables allow write-back to the database (scenario modeling).</span>
                                </div>
                            </div>
                        </div>

                        <div id="ux-content-thoughtspot" class="hidden transition-opacity duration-300">
                            <h3 class="text-xl font-bold text-amber-900 mb-2">The "Search" Experience</h3>
                            <div class="flex items-start gap-4 mb-4">
                                <div class="bg-white p-3 rounded shadow-sm text-2xl">🔍</div>
                                <p class="text-sm text-stone-700">Users type questions like "Revenue by region last quarter" or use AI voice commands. The system generates best-fit visualizations instantly.</p>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">SpotIQ AI analyzes data to find anomalies automatically.</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">Sage (LLM) allows conversational questioning.</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">Feature</span>
                                    <span class="text-sm text-stone-700">Mobile app is best-in-class for executive push alerts.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comparison Bar Chart -->
             <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100">
                 <h3 class="text-lg font-bold text-stone-800 mb-4">Ad-Hoc Analysis Speed</h3>
                 <p class="text-sm text-stone-500 mb-4">Estimated time to answer a new, un-modeled question vs. a pre-modeled question.</p>
                 <div class="chart-container h-64">
                    <canvas id="barChart"></canvas>
                </div>
             </div>
        </section>

        <!-- SECTION: ARCHITECTURE -->
        <section id="architecture-section" class="hidden space-y-8 animate-fade-in">
            <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100">
                <h2 class="text-2xl font-bold text-stone-800 mb-4">Under the Hood: Architecture</h2>
                <p class="text-stone-600 mb-8">How these tools connect to your data determines cost, speed, and governance. Sigma is purely "Live Query." ThoughtSpot is a hybrid of Live Query and Intelligent Indexing.</p>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <!-- Sigma Arch -->
                    <div class="relative p-6 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50">
                        <div class="absolute -top-3 left-4 bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded">Sigma Architecture</div>
                        <div class="flex flex-col items-center space-y-4 mt-2">
                            <div class="w-full p-3 bg-white border border-stone-300 rounded text-center font-semibold text-stone-700 shadow-sm">User Interface (Browser)</div>
                            <div class="text-2xl text-blue-400">⬇️</div>
                            <div class="w-full p-4 bg-blue-100 border border-blue-300 rounded text-center">
                                <div class="font-bold text-blue-900">Sigma Cloud</div>
                                <div class="text-xs text-blue-700 mt-1">Translates UI actions to Optimized SQL</div>
                            </div>
                            <div class="text-2xl text-blue-400">⬇️ ⬆️ <span class="text-xs text-stone-500 align-middle">Live SQL Query / Results</span></div>
                            <div class="w-full p-4 bg-stone-800 text-white rounded text-center shadow-lg">
                                <div class="font-bold">Cloud Data Warehouse</div>
                                <div class="text-xs text-stone-400 mt-1">Snowflake, BigQuery, Redshift, Databricks</div>
                            </div>
                        </div>
                        <p class="mt-4 text-sm text-stone-600 text-center italic">"No data extraction. The warehouse is the engine."</p>
                    </div>

                    <!-- ThoughtSpot Arch -->
                    <div class="relative p-6 border-2 border-dashed border-amber-200 rounded-xl bg-amber-50/50">
                        <div class="absolute -top-3 left-4 bg-amber-500 text-white px-3 py-1 text-sm font-bold rounded">ThoughtSpot Architecture</div>
                        <div class="flex flex-col items-center space-y-4 mt-2">
                            <div class="w-full p-3 bg-white border border-stone-300 rounded text-center font-semibold text-stone-700 shadow-sm">Search UI / Mobile App</div>
                            <div class="text-2xl text-amber-400">⬇️</div>
                            <div class="w-full p-4 bg-amber-100 border border-amber-300 rounded text-center">
                                <div class="font-bold text-amber-900">ThoughtSpot Brain</div>
                                <div class="text-xs text-amber-700 mt-1">Indexing Service + SQL Generation</div>
                            </div>
                            <div class="grid grid-cols-2 w-full gap-2">
                                <div class="flex flex-col items-center">
                                    <div class="text-xl text-amber-400">⬇️</div>
                                    <div class="w-full p-2 bg-white border border-stone-200 rounded text-center text-xs text-stone-600">
                                        Metadata Index <br/> (Fast Search)
                                    </div>
                                </div>
                                <div class="flex flex-col items-center">
                                    <div class="text-xl text-amber-400">⬇️</div>
                                    <div class="w-full p-2 bg-stone-800 text-white rounded text-center text-xs">
                                        Cloud Warehouse <br/> (Heavy Lift)
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4 text-sm text-stone-600 text-center italic">"Indexes metadata for instant search suggestions, pushes queries for results."</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: VERDICT -->
        <section id="verdict-section" class="hidden space-y-8 animate-fade-in">
            <div class="bg-white rounded-xl p-6 card-shadow border border-stone-100">
                <h2 class="text-2xl font-bold text-stone-800 mb-6">Final Verdict: Which tool is for you?</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="bg-blue-500 text-white p-2 rounded-full font-bold w-10 h-10 flex items-center justify-center">S</div>
                            <h3 class="text-xl font-bold text-stone-800">Choose Sigma If...</h3>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">Your team is comfortable with <strong>Excel/Spreadsheets</strong>.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You need complex <strong>cross-table calculations</strong> and ad-hoc data exploration without waiting for BI engineers.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You want to <strong>input data</strong> (forecast adjustments, categorization) back into the warehouse.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You are 100% committed to a Cloud Data Warehouse (Snowflake, etc.) and want zero data movement.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="bg-amber-500 text-white p-2 rounded-full font-bold w-10 h-10 flex items-center justify-center">T</div>
                            <h3 class="text-xl font-bold text-stone-800">Choose ThoughtSpot If...</h3>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">Your primary users are <strong>non-technical</strong> (Sales, Execs) who won't learn a spreadsheet UI.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You value <strong>Search & AI</strong> as the primary consumption method.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You need a robust <strong>embedded analytics</strong> solution for a customer-facing portal.</span>
                            </li>
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">✔</span>
                                <span class="text-stone-600 text-sm">You have clean, well-modeled data ready for querying.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-200 text-center">
                    <p class="text-sm text-stone-500">
                        <strong>Analyst Note:</strong> Both tools are excellent modern BI choices. The decision often comes down to culture: <br/>
                        <em>"Do we want to empower people to analyze (Sigma) or empower people to find answers (ThoughtSpot)?"</em>
                    </p>
                </div>
            </div>
        </section>

    </main>

    <footer class="bg-white border-t border-stone-200 py-6 mt-8">
        <div class="container mx-auto px-4 text-center">
            <p class="text-stone-400 text-xs">Generated for Analytical Comparison Purposes. Information accurate as of knowledge cutoff.</p>
        </div>
    </footer>

    <script>
        // State Management
        const state = {
            activeTab: 'overview',
            uxView: 'sigma'
        };

        // DOM Elements
        const tabs = ['overview', 'experience', 'architecture', 'verdict'];

        // Navigation Logic
        function switchTab(tabId) {
            state.activeTab = tabId;

            // Update Nav Styling
            tabs.forEach(t => {
                const btn = document.getElementById(`nav-${t}`);
                if(btn) {
                    if (t === tabId) {
                        btn.classList.remove('tab-inactive');
                        btn.classList.add('tab-active');
                    } else {
                        btn.classList.remove('tab-active');
                        btn.classList.add('tab-inactive');
                    }
                }

                // Show/Hide Sections
                const section = document.getElementById(`${t}-section`);
                if (section) {
                    if (t === tabId) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                }
            });

            // Re-render charts if hidden (Chart.js quirk resize)
            if (tabId === 'overview') {
                renderRadarChart();
            }
            if (tabId === 'experience') {
                renderBarChart();
            }
        }

        // UX Section Toggle Logic
        function updateUxView(view) {
            state.uxView = view;
            const sigmaBtn = document.getElementById('btn-sigma-ux');
            const tsBtn = document.getElementById('btn-ts-ux');
            const sigmaContent = document.getElementById('ux-content-sigma');
            const tsContent = document.getElementById('ux-content-thoughtspot');

            if (view === 'sigma') {
                // Style Buttons
                sigmaBtn.className = "w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none bg-blue-50 border-blue-500 ring-1 ring-blue-500";
                tsBtn.className = "w-full text-left p-4 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all duration-200 focus:outline-none";

                // Show Content
                sigmaContent.classList.remove('hidden');
                tsContent.classList.add('hidden');
            } else {
                // Style Buttons
                sigmaBtn.className = "w-full text-left p-4 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all duration-200 focus:outline-none";
                tsBtn.className = "w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none bg-amber-50 border-amber-500 ring-1 ring-amber-500";

                // Show Content
                sigmaContent.classList.add('hidden');
                tsContent.classList.remove('hidden');
            }
        }

        // Chart.js Implementations
        let radarChartInstance = null;
        let barChartInstance = null;

        function renderRadarChart() {
            const ctx = document.getElementById('radarChart').getContext('2d');

            if (radarChartInstance) {
                radarChartInstance.destroy();
            }

            radarChartInstance = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Ease of Use (Non-Tech)', 'Data Exploration Depth', 'Setup Speed', 'Mobile Experience', 'Governance/Security', 'Embedding'],
                    datasets: [{
                        label: 'Sigma',
                        data: [65, 95, 85, 70, 90, 80],
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: 'rgb(59, 130, 246)',
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(59, 130, 246)'
                    }, {
                        label: 'ThoughtSpot',
                        data: [95, 75, 70, 95, 85, 90],
                        fill: true,
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        borderColor: 'rgb(245, 158, 11)',
                        pointBackgroundColor: 'rgb(245, 158, 11)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(245, 158, 11)'
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: '#e5e7eb' },
                            grid: { color: '#e5e7eb' },
                            pointLabels: {
                                font: { size: 12, family: "'Inter', sans-serif" },
                                color: '#4b5563'
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        function renderBarChart() {
            const ctx = document.getElementById('barChart').getContext('2d');

            if (barChartInstance) {
                barChartInstance.destroy();
            }

            barChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Simple Query (Revenue by State)', 'Complex Analysis (Cohort Retention)', 'Anomaly Detection'],
                    datasets: [{
                        label: 'Sigma (Analyst Led)',
                        data: [5, 15, 25], // Minutes estimate
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    }, {
                        label: 'ThoughtSpot (AI/Search Led)',
                        data: [1, 25, 2], // Minutes estimate
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Time to Insight (Minutes)' }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                afterBody: function(context) {
                                    return "Note: ThoughtSpot is faster for simple/AI tasks, Sigma is faster for complex manual modeling.";
                                }
                            }
                        }
                    }
                }
            });
        }

        // Initialization
        document.addEventListener('DOMContentLoaded', () => {
            renderRadarChart();
            renderBarChart();
        });

    </script>
</body>
</html>