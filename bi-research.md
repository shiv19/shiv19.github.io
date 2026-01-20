---
title: "BI Research"
permalink: /bi-research/
published: true
description: "Interactive analysis of BI providers against the Technical Vision document for DaaS integration."
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BI Provider Technical Vision Analysis</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <!-- Updated Lucide CDN to a more reliable source for vanilla JS usage -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #F8FAFC; /* Warm neutral/Light gray */
            color: #1E293B; /* Slate 800 */
        }

        /* Chart Container Styling - Mandatory */
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .transition-all-300 {
            transition: all 0.3s ease;
        }

        .gradient-text {
            background: linear-gradient(135deg, #0F172A 0%, #334155 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Interactive element highlight */
        .interactive-highlight {
            cursor: pointer;
            border-bottom: 2px solid #E2E8F0;
        }
        .interactive-highlight:hover {
            border-color: #3B82F6;
            background-color: #EFF6FF;
        }
    </style>
    <!-- Chosen Palette: Slate & Blue (Professional, Trustworthy, Analytical) -->
    <!-- Application Structure Plan:
         1. Vision Context: Summarizes the PDF's strict requirements (The Filter).
         2. The Funnel: Visualizes the selection process from 25 -> 3.
         3. Top 3 Candidates: Detailed breakdown of the best fits (Holistics, Sigma, Omni).
         4. Comparative Analysis: Radar chart and Feature Matrix logic.
         5. Scenario Builder: Interactive tool to pick the final winner based on user priorities.
         Why: This structure mirrors the decision-making process: Understand Constraint -> Filter Options -> Deep Dive Winners -> Validate.
    -->
    <!-- Visualization & Content Choices:
         1. Vision Cards: HTML Grid. To display PDF constraints clearly.
         2. Candidate Cards: Rich HTML + Icons. To showcase the Top 3.
         3. Fit Analysis Radar: Chart.js. To compare the 3 across key dimensions (DevOps, Snowflake, UX).
         4. Compliance Matrix: HTML Table with JS filtering. To validate against specific PDF clauses (10.1, 10.2, etc.).
         5. Funnel Viz: CSS/HTML. To show the elimination logic.
    -->
    <!-- CONFIRMATION: NO SVG graphics used (Lucide icons via script/font). NO Mermaid JS used. -->
</head>
<body class="min-h-screen flex flex-col">

    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <i data-lucide="database" class="text-blue-600 w-6 h-6"></i>
                <h1 class="text-xl font-bold tracking-tight text-slate-900">DaaS BI Integration <span class="text-slate-400 font-normal">| Provider Analysis</span></h1>
            </div>
            <nav class="hidden md:flex space-x-8">
                <button onclick="scrollToSection('vision')" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Vision Principles</button>
                <button onclick="scrollToSection('selection')" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Selection Logic</button>
                <button onclick="scrollToSection('candidates')" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Top 3 Fit</button>
                <button onclick="scrollToSection('matrix')" class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Compliance Matrix</button>
            </nav>
        </div>
    </header>

    <main class="flex-grow">

        <!-- Hero / Intro -->
        <section class="bg-white border-b border-slate-200 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4">
                    Based on Technical Vision Document
                </div>
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                    Selecting the <span class="text-blue-600">Perfect BI Partner</span> for DaaS
                </h2>
                <p class="max-w-3xl mx-auto text-lg text-slate-600">
                    An interactive analysis of 25 BI providers against the "Technical Vision: BI Provider Integration" requirements.
                    Focusing on <span class="font-semibold text-slate-800">Warehouse-First architecture</span>, <span class="font-semibold text-slate-800">Semantic Layer governance</span>, and <span class="font-semibold text-slate-800">Tenant Safety</span>.
                </p>
            </div>
        </section>

        <!-- Vision Principles (Context) -->
        <section id="vision" class="py-16 bg-slate-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10">
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">The Guardrails</h3>
                    <p class="text-slate-600">
                        The Technical Vision document establishes strict non-negotiables. The selected provider must adhere to these three core pillars.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Principle 1 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm card-hover transition-all-300">
                        <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                            <i data-lucide="server" class="text-indigo-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 mb-2">Warehouse-First</h4>
                        <p class="text-sm text-slate-600 mb-4">
                            "The BI provider is a consumer of governed analytical data, not a data processing authority."
                        </p>
                        <ul class="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3">
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Direct Snowflake Query</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> No Data Extraction/Caching</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> dbt-transformed datasets</li>
                        </ul>
                    </div>

                    <!-- Principle 2 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm card-hover transition-all-300">
                        <div class="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                            <i data-lucide="shield-check" class="text-emerald-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 mb-2">Governance & DevOps</h4>
                        <p class="text-sm text-slate-600 mb-4">
                            "Simprogroup owns and governs the canonical semantic layer... Internal teams produce high-quality dashboards."
                        </p>
                        <ul class="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3">
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Git Integration (Preferred)</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Semantic Layer definition</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Auditable Access Logs</li>
                        </ul>
                    </div>

                    <!-- Principle 3 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm card-hover transition-all-300">
                        <div class="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                            <i data-lucide="users" class="text-amber-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 mb-2">Embedded Experience</h4>
                        <p class="text-sm text-slate-600 mb-4">
                            "Paying customers access insights immediately... Explore data safely... Sold separately from core product."
                        </p>
                        <ul class="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3">
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Robust Embedding SDK</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> White-labeling</li>
                            <li class="flex items-center"><i data-lucide="check" class="w-3 h-3 text-green-500 mr-2"></i> Strict Tenant Isolation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Selection Logic (Funnel) -->
        <section id="selection" class="py-12 bg-white border-y border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row items-center justify-between mb-8">
                    <div>
                        <h3 class="text-2xl font-bold text-slate-900">The Filtering Process</h3>
                        <p class="text-slate-600 text-sm mt-1">From 25 potential providers to 3 best fits.</p>
                    </div>
                </div>

                <!-- Funnel Visual -->
                <div class="relative max-w-4xl mx-auto">
                    <!-- Stage 1 -->
                    <div class="bg-slate-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                        <div>
                            <span class="font-bold text-slate-700">All 25 Providers</span>
                            <span class="text-xs text-slate-500 block">Initial List</span>
                        </div>
                        <div class="text-sm text-slate-400">Analysis</div>
                    </div>

                    <!-- Connector -->
                    <div class="flex justify-center -my-2 relative z-10"><i data-lucide="arrow-down" class="text-slate-300 h-6 w-6"></i></div>

                    <!-- Stage 2 -->
                    <div class="bg-red-50 p-4 rounded-lg mb-4 mt-2 border-l-4 border-red-400">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="font-bold text-slate-800">Filter: Warehouse-First & Direct Query</span>
                                <span class="text-xs text-slate-600 block">Removing tools that rely on data extraction or heavy proprietary caching.</span>
                            </div>
                            <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">-8 Candidates</span>
                        </div>
                        <div class="text-xs text-red-400 mt-2">Excluded: Qlik, Domo (Legacy modes), FanRuan (Heavy Reporting), etc.</div>
                    </div>

                    <!-- Connector -->
                    <div class="flex justify-center -my-2 relative z-10"><i data-lucide="arrow-down" class="text-slate-300 h-6 w-6"></i></div>

                    <!-- Stage 3 -->
                    <div class="bg-amber-50 p-4 rounded-lg mb-4 mt-2 border-l-4 border-amber-400">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="font-bold text-slate-800">Filter: "Simpro Owns Semantic Layer" & DevOps</span>
                                <span class="text-xs text-slate-600 block">Removing tools with weak code-first/Git workflows or pure GUI modeling.</span>
                            </div>
                            <span class="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded">-10 Candidates</span>
                        </div>
                        <div class="text-xs text-amber-500 mt-2">Excluded: ThoughtSpot, Arka, Knowi (NoSQL focus), etc.</div>
                    </div>

                    <!-- Connector -->
                    <div class="flex justify-center -my-2 relative z-10"><i data-lucide="arrow-down" class="text-slate-300 h-6 w-6"></i></div>

                    <!-- Stage 4 -->
                    <div class="bg-blue-50 p-4 rounded-lg mt-2 border-l-4 border-blue-500 shadow-md">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="font-bold text-blue-900">Final Selection: The Top 3 Fits</span>
                                <span class="text-xs text-blue-700 block">Optimized for Embedding, Snowflake, and Governance.</span>
                            </div>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">3 Candidates</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Top 3 Candidates -->
        <section id="candidates" class="py-16 bg-slate-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h3 class="text-3xl font-bold text-slate-900">The Recommendations</h3>
                    <p class="text-slate-600 mt-2 max-w-2xl mx-auto">
                        These three platforms offer the best alignment with the Technical Vision, though each prioritizes a different aspect of the "North Star".
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <!-- Candidate 1: Holistics -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow">
                        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 h-2"></div>
                        <div class="p-8 flex-grow">
                            <div class="flex justify-between items-start mb-6">
                                <h4 class="text-2xl font-bold text-slate-900">Holistics.io</h4>
                                <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded uppercase">The Gov Choice</span>
                            </div>

                            <p class="text-slate-600 mb-6 text-sm leading-relaxed">
                                <strong>Why it fits:</strong> Holistics is built around a code-first semantic layer (AML) that integrates natively with Git. It perfectly enables "Simprogroup owns the semantic layer" while allowing "Internal teams to produce reusable dashboards".
                            </p>

                            <div class="space-y-3 mb-8">
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Code-First (As-Code)</span>
                                        <span class="text-xs text-slate-500">Defines logic in code, version controlled via Git.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">dbt Integration</span>
                                        <span class="text-xs text-slate-500">Natively consumes dbt models.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Self-Service Exploration</span>
                                        <span class="text-xs text-slate-500">Safe drag-and-drop for end-users.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-slate-50 px-8 py-4 border-t border-slate-100">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-slate-500">Fit Score</span>
                                <div class="flex space-x-1">
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Candidate 2: Sigma -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow">
                        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2"></div>
                        <div class="p-8 flex-grow">
                            <div class="flex justify-between items-start mb-6">
                                <h4 class="text-2xl font-bold text-slate-900">Sigma</h4>
                                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">The Snowflake Native</span>
                            </div>

                            <p class="text-slate-600 mb-6 text-sm leading-relaxed">
                                <strong>Why it fits:</strong> The definition of "Warehouse-First". It acts as a spreadsheet interface directly over Snowflake. It supports massive scale and complex analysis without extracts.
                            </p>

                            <div class="space-y-3 mb-8">
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Direct Snowflake Query</span>
                                        <span class="text-xs text-slate-500">Zero data movement. Best-in-class performance.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Embedded Workbooks</span>
                                        <span class="text-xs text-slate-500">Embed entire exploration interfaces safely.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="alert-circle" class="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Versioning</span>
                                        <span class="text-xs text-slate-500">Has version control, but less "code-file" centric than Holistics.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-slate-50 px-8 py-4 border-t border-slate-100">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-slate-500">Fit Score</span>
                                <div class="flex space-x-1">
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Candidate 3: Omni (Acquired Explo) -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow">
                        <div class="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
                        <div class="p-8 flex-grow">
                            <div class="flex justify-between items-start mb-6">
                                <div>
                                    <h4 class="text-2xl font-bold text-slate-900">Omni</h4>
                                    <span class="text-[10px] text-slate-500 font-medium block mt-0.5">(Acquired Explo)</span>
                                </div>
                                <span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded uppercase">The Unified Platform</span>
                            </div>

                            <p class="text-slate-600 mb-6 text-sm leading-relaxed">
                                <strong>Why it fits:</strong> Omni recently acquired Explo, combining Explo's top-tier embedding with Omni's robust, governed semantic layer. This addresses the previous "semantic rigidity" concern, offering a complete package of Governance + Embedding.
                            </p>

                            <div class="space-y-3 mb-8">
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Unified Semantic Layer</span>
                                        <span class="text-xs text-slate-500">Strong modeling capabilities (The View) + SQL flexibility.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Explo-Powered Embedding</span>
                                        <span class="text-xs text-slate-500">Best-in-class developer SDK for DaaS.</span>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"></i>
                                    <div>
                                        <span class="block text-sm font-semibold text-slate-800">Warehouse Native</span>
                                        <span class="text-xs text-slate-500">Direct query architecture (no extracts).</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-slate-50 px-8 py-4 border-t border-slate-100">
                            <div class="flex items-center justify-between">
                                <span class="text-xs font-medium text-slate-500">Fit Score</span>
                                <div class="flex space-x-1">
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div class="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comparative Analysis Radar -->
                <div class="mt-16 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 mb-4">Visual Comparison</h3>
                            <p class="text-slate-600 text-sm mb-6">
                                Comparing the Top 3 based on 5 critical dimensions derived from the Technical Vision document.
                            </p>
                            <ul class="space-y-2 text-sm text-slate-600">
                                <li class="flex items-center"><span class="w-3 h-3 rounded-full bg-purple-500 mr-2"></span> <strong>Holistics:</strong> Balanced DevOps & Governance.</li>
                                <li class="flex items-center"><span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> <strong>Sigma:</strong> Max Warehouse Leverage.</li>
                                <li class="flex items-center"><span class="w-3 h-3 rounded-full bg-orange-500 mr-2"></span> <strong>Omni:</strong> Strong Semantics + Embed.</li>
                            </ul>
                        </div>
                        <div class="chart-container">
                            <canvas id="radarChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Compliance Matrix -->
        <section id="matrix" class="py-16 bg-white border-t border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 class="text-2xl font-bold text-slate-900 mb-8">Detailed Compliance Matrix</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
                        <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="px-6 py-3 font-bold">Document Requirement</th>
                                <th class="px-6 py-3 font-bold text-purple-700">Holistics</th>
                                <th class="px-6 py-3 font-bold text-blue-700">Sigma</th>
                                <th class="px-6 py-3 font-bold text-orange-700">Omni</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200">
                            <tr class="hover:bg-slate-50">
                                <td class="px-6 py-4 font-medium text-slate-900">Warehouse-First (Direct Query)</td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Native</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Native</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Native</span></td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-6 py-4 font-medium text-slate-900">Semantic Layer Ownership</td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Strong (AML)</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Via Dataset</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Strong (Model)</span></td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-6 py-4 font-medium text-slate-900">Git Integration (DevOps)</td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Excellent</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Good</span></td>
                                <td class="px-6 py-4"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Good</span></td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-6 py-4 font-medium text-slate-900">Tenant Safety (RLS)</td>
                                <td class="px-6 py-4 text-slate-500">Supports dynamic WHERE & Policies</td>
                                <td class="px-6 py-4 text-slate-500">Pass-through Snowflake RLS</td>
                                <td class="px-6 py-4 text-slate-500">User Attributes + RLS</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="px-6 py-4 font-medium text-slate-900">Exploration (Self-Service)</td>
                                <td class="px-6 py-4 text-slate-500">Drag & Drop builder</td>
                                <td class="px-6 py-4 text-slate-500">Spreadsheet-like</td>
                                <td class="px-6 py-4 text-slate-500">Excel-like + SQL</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- CTA / Footer -->
        <footer class="bg-slate-900 text-slate-300 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 class="text-xl font-bold text-white mb-4">Next Steps</h3>
                <p class="max-w-xl mx-auto mb-8 text-slate-400">
                    To finalize the decision, we recommend running a Proof of Concept (POC) focusing on "Section 10.1 Regional Isolation" and performance testing the "Application Shell" degradation.
                </p>
                <div class="flex justify-center space-x-4">
                    <button onclick="window.print()" class="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                        Print Report
                    </button>
                    <button onclick="scrollToSection('vision')" class="px-6 py-3 rounded-lg border border-slate-600 hover:border-slate-400 text-white font-medium transition-colors">
                        Back to Top
                    </button>
                </div>
                <div class="mt-12 text-sm text-slate-500">
                    Generated Analysis for Technical Vision Document • 2024
                </div>
            </div>
        </footer>

    </main>

    <script>
        // --- Interactions & Navigation ---
        function scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // --- Chart Initialization ---
        document.addEventListener('DOMContentLoaded', function() {
            // --- Icon Rendering ---
            // Wrapped in safety check to prevent ReferenceError if CDN fails or loads out of order
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            const ctx = document.getElementById('radarChart').getContext('2d');

            // Data derived from the qualitative analysis of the 3 providers against PDF specs
            // Omni scores updated to reflect stronger semantic layer (5) and explore (4) due to acquisition
            const radarData = {
                labels: [
                    'Warehouse Native',
                    'DevOps/Git',
                    'Semantic Layer',
                    'Embedding SDK',
                    'End-User Explore'
                ],
                datasets: [
                    {
                        label: 'Holistics',
                        data: [4, 5, 5, 4, 4],
                        fill: true,
                        backgroundColor: 'rgba(147, 51, 234, 0.2)',
                        borderColor: 'rgb(147, 51, 234)',
                        pointBackgroundColor: 'rgb(147, 51, 234)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(147, 51, 234)'
                    },
                    {
                        label: 'Sigma',
                        data: [5, 4, 4, 4, 5],
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: 'rgb(59, 130, 246)',
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(59, 130, 246)'
                    },
                    {
                        label: 'Omni',
                        data: [4, 4, 5, 5, 4],
                        fill: true,
                        backgroundColor: 'rgba(249, 115, 22, 0.2)',
                        borderColor: 'rgb(249, 115, 22)',
                        pointBackgroundColor: 'rgb(249, 115, 22)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(249, 115, 22)'
                    }
                ]
            };

            new Chart(ctx, {
                type: 'radar',
                data: radarData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            borderWidth: 2
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: true,
                                color: '#e2e8f0'
                            },
                            grid: {
                                color: '#e2e8f0'
                            },
                            pointLabels: {
                                font: {
                                    size: 11,
                                    family: "'Inter', sans-serif"
                                },
                                color: '#64748b'
                            },
                            suggestedMin: 0,
                            suggestedMax: 5,
                            ticks: {
                                stepSize: 1,
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: '#1e293b',
                            titleFont: { family: "'Inter', sans-serif" },
                            bodyFont: { family: "'Inter', sans-serif" },
                            padding: 10,
                            cornerRadius: 8
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>