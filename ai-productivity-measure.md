---
title: AI Productivity Measure
permalink: /ai-productivity-measure/
published: true
description: "AI Developerr Productivity Metrics"
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Developer Productivity Metrics</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; color: #1E293B; }
        .gradient-text {
            background: linear-gradient(to right, #4F46E5, #EC4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

        /* Chart Container Styling */
        .chart-container {
            position: relative;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            height: 350px; /* Base height */
            max-height: 400px;
        }

        /* Plotly Container Specifics */
        .plotly-container {
            width: 100%;
            height: 400px;
            max-width: 100%;
        }

        @media (min-width: 768px) {
            .chart-container { height: 400px; }
        }
    </style>
    <!--
    Palette Name: Electric Indigo & Neon Coral
    Source Material Analysis:
    - Analyzed "AI_Developer_Productivity_Metrics.md".
    - Narrative: Problem (LOC is dead) -> Solution Layers (Velocity, Quality, Human) -> Action (Dashboard).
    - Visualization Choices:
      1. Intro: Big Stats (HTML). Goal: Inform.
      2. Cycle Time Shift: Stacked Bar (Chart.js). Goal: Compare. Shows coding time dropping but review time rising.
      3. Quality Tradeoff: Bubble Chart (Plotly). Goal: Relationships. Velocity vs Failure Rate.
      4. AI Acceptance: Doughnut (Chart.js). Goal: Inform.
      5. SPACE Framework: Radar (Chart.js). Goal: Organize.
      6. Comparison Table: Grid (HTML). Goal: Compare.

    Confirmations:
    - NO SVG used.
    - NO Mermaid JS used.
    -->
</head>
<body class="antialiased">

    <!-- Navigation/Header -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <span class="text-2xl font-bold tracking-tight text-slate-900">DevMetrics<span class="text-indigo-600">.AI</span></span>
                </div>
                <div class="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                    <a href="#velocity" class="hover:text-indigo-600 transition">Velocity</a>
                    <a href="#quality" class="hover:text-indigo-600 transition">Quality</a>
                    <a href="#human" class="hover:text-indigo-600 transition">Human Factor</a>
                    <a href="#dashboard" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Dashboard</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative overflow-hidden pt-16 pb-24 bg-slate-900 text-white">
        <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 mix-blend-multiply"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Measuring Productivity in the <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Age of AI</span>
            </h1>
            <p class="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                Stop measuring lines of code. Start measuring value.
                In 2025, output is cheap, but outcome is everything.
            </p>

            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <div class="text-4xl font-bold text-cyan-400 mb-2">Obsolete</div>
                    <div class="text-sm text-slate-300 font-medium uppercase tracking-wide">Lines of Code (LOC)</div>
                </div>
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <div class="text-4xl font-bold text-pink-500 mb-2">Critical</div>
                    <div class="text-sm text-slate-300 font-medium uppercase tracking-wide">Cycle Time & Flow</div>
                </div>
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                    <div class="text-4xl font-bold text-indigo-400 mb-2">Outcome</div>
                    <div class="text-sm text-slate-300 font-medium uppercase tracking-wide">Business Value</div>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        <!-- SECTION 1: VELOCITY & FLOW -->
        <section id="velocity" class="scroll-mt-24">
            <div class="max-w-3xl mb-10">
                <h2 class="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-cyan-500 pl-4">1. Velocity & Flow Metrics</h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    AI tools accelerate the "typing" phase of development, often shifting bottlenecks downstream.
                    If a developer generates 500 lines of code in seconds, but it takes 3 days to review, the team hasn't moved faster.
                    **Cycle Time**—the total time from first commit to deployment—is the ultimate truth teller.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Chart 1: The Cycle Time Shift -->
                <div class="card p-6 flex flex-col">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">The Cycle Time Shift</h3>
                    <p class="text-sm text-slate-500 mb-6">Comparison of time distribution between Traditional vs. AI-Assisted workflows. Notice the "Review" bottleneck.</p>
                    <div class="chart-container flex-grow">
                        <canvas id="cycleTimeChart"></canvas>
                    </div>
                </div>

                <!-- Concept: PR Flooding -->
                <div class="card p-6 bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100">
                    <h3 class="text-xl font-bold text-slate-800 mb-4">The "PR Flooding" Risk</h3>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xl">1</div>
                            <div class="ml-4">
                                <h4 class="text-lg font-semibold text-slate-900">Larger Pull Requests</h4>
                                <p class="text-slate-600 mt-1">AI encourages generating massive blocks of code. Large PRs are harder to review, leading to surface-level checks and bugs.</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl">2</div>
                            <div class="ml-4">
                                <h4 class="text-lg font-semibold text-slate-900">Review Fatigue</h4>
                                <p class="text-slate-600 mt-1">If PR Review Time spikes, it indicates the team is drowning in low-quality AI output. Productivity stalls.</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">3</div>
                            <div class="ml-4">
                                <h4 class="text-lg font-semibold text-slate-900">The Metric Fix</h4>
                                <p class="text-slate-600 mt-1">Track <strong>Merge Frequency</strong> and <strong>Review Time</strong>. Ensure velocity doesn't come at the cost of review quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 2: QUALITY & STABILITY -->
        <section id="quality" class="scroll-mt-24">
            <div class="max-w-3xl mb-10">
                <h2 class="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-pink-500 pl-4">2. Quality & The "Guardrails"</h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    Speed is meaningless if you are shipping broken code. The **Change Failure Rate (CFR)** is your safety net.
                    In an AI world, we must ensure that increased velocity doesn't correlate with increased instability.
                    We also track **Code Churn**—if AI code is merged but rewritten 3 days later, it was negative productivity.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Plotly Chart: Velocity vs Stability -->
                <div class="card p-6 lg:col-span-2">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Velocity vs. Reliability Trade-off</h3>
                    <p class="text-sm text-slate-500 mb-4">Each bubble is a development team. The "Danger Zone" (Top Right) is where AI is used to ship fast but breaks often.</p>
                    <div id="qualityScatterPlot" class="plotly-container"></div>
                </div>

                <!-- Chart: Bug Detection Shift -->
                <div class="card p-6 flex flex-col">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Shift Left: Bug Detection</h3>
                    <p class="text-sm text-slate-500 mb-6">AI is excellent at generating tests. A healthy team catches bugs in CI, not Production.</p>
                    <div class="chart-container flex-grow">
                        <canvas id="bugShiftChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 3: AI EFFICACY & HUMAN FACTOR -->
        <section id="human" class="scroll-mt-24">
            <div class="max-w-3xl mb-10">
                <h2 class="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-4">3. AI Efficacy & The SPACE Framework</h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    Is the AI tool actually helping, or just a distraction? A low **Acceptance Rate** (<30%) suggests the AI is breaking flow.
                    Furthermore, productivity is personal. Using the **SPACE Framework**, we measure Satisfaction and Well-being.
                    High output with high burnout leads to turnover.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Chart: AI Acceptance Rate -->
                <div class="card p-6 flex flex-col">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Suggestion Acceptance Rate</h3>
                    <p class="text-sm text-slate-500 mb-6">Are developers actually using the AI suggestions?</p>
                    <div class="chart-container flex-grow">
                        <canvas id="acceptanceChart"></canvas>
                    </div>
                    <div class="mt-4 text-center">
                        <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Healthy: >35%</span>
                        <span class="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold ml-2">Noise: <20%</span>
                    </div>
                </div>

                <!-- Chart: SPACE Radar -->
                <div class="card p-6 flex flex-col lg:col-span-2">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">The SPACE Framework Analysis</h3>
                    <p class="text-sm text-slate-500 mb-6">Balancing the 5 dimensions of developer productivity. Note how AI improves "Efficiency" but can risk "Satisfaction" if cognitive load is high.</p>
                    <div class="chart-container flex-grow">
                        <canvas id="spaceRadarChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 4: COMPARISON & DASHBOARD -->
        <section id="dashboard" class="scroll-mt-24 pb-20">
            <div class="max-w-3xl mb-10">
                <h2 class="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-amber-500 pl-4">4. The Strategic Dashboard</h2>
                <p class="text-lg text-slate-600 leading-relaxed">
                    Stop measuring the wrong things. Below is the definitive guide on what to drop and what to adopt for your 2025 dashboard.
                </p>
            </div>

            <!-- Comparison Table Grid -->
            <div class="card overflow-hidden mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <!-- Bad Metrics -->
                    <div class="bg-red-50 p-8 border-r border-red-100">
                        <div class="flex items-center mb-6">
                            <span class="text-3xl mr-3">❌</span>
                            <h3 class="text-2xl font-bold text-red-800">Stop Measuring</h3>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-center text-red-700 font-medium">
                                <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                Lines of Code (LOC) - Totally gameable.
                            </li>
                            <li class="flex items-center text-red-700 font-medium">
                                <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                Coding / Typing Speed
                            </li>
                            <li class="flex items-center text-red-700 font-medium">
                                <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                Total Bug Volume (without context)
                            </li>
                            <li class="flex items-center text-red-700 font-medium">
                                <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                Number of AI Prompts Used
                            </li>
                            <li class="flex items-center text-red-700 font-medium">
                                <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                Hours Worked
                            </li>
                        </ul>
                    </div>

                    <!-- Good Metrics -->
                    <div class="bg-green-50 p-8">
                        <div class="flex items-center mb-6">
                            <span class="text-3xl mr-3">✅</span>
                            <h3 class="text-2xl font-bold text-green-800">Start Measuring</h3>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-center text-green-700 font-medium">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                PR Merge Rate (Completed Work)
                            </li>
                            <li class="flex items-center text-green-700 font-medium">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Cycle Time (Commit to Deploy)
                            </li>
                            <li class="flex items-center text-green-700 font-medium">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Change Failure Rate (Reliability)
                            </li>
                            <li class="flex items-center text-green-700 font-medium">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                AI Acceptance Rate
                            </li>
                            <li class="flex items-center text-green-700 font-medium">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Rework Rate (Code Churn)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Recommended Dashboard View -->
            <div class="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl">
                <h3 class="text-2xl font-bold mb-8 text-center">Recommended Team Dashboard Configuration</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Metric 1 -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                        <div class="text-indigo-400 font-semibold uppercase tracking-wider text-sm mb-2">Velocity</div>
                        <div class="text-4xl font-bold text-white mb-1">Cycle Time</div>
                        <p class="text-slate-400 text-sm">Target: < 2 Days</p>
                    </div>
                    <!-- Metric 2 -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                        <div class="text-pink-400 font-semibold uppercase tracking-wider text-sm mb-2">Quality</div>
                        <div class="text-4xl font-bold text-white mb-1">Failure Rate</div>
                        <p class="text-slate-400 text-sm">Target: < 5%</p>
                    </div>
                    <!-- Metric 3 -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                        <div class="text-cyan-400 font-semibold uppercase tracking-wider text-sm mb-2">Human</div>
                        <div class="text-4xl font-bold text-white mb-1">Satisfaction</div>
                        <p class="text-slate-400 text-sm">Weekly Pulse Survey</p>
                    </div>
                </div>
            </div>

        </section>

    </main>

    <footer class="bg-white border-t border-slate-200 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p class="font-medium">Synthesized from "AI_Developer_Productivity_Metrics.md"</p>
            <p class="mt-2 text-sm">© 2025 Canvas Infographics. No SVG or Mermaid.js used.</p>
        </div>
    </footer>

    <!-- JavaScript for Charts -->
    <script>
        // --- UTILITY FUNCTIONS ---
        // Label wrapping logic for Chart.js (max 16 chars)
        function wrapLabels(labels) {
            return labels.map(label => {
                if (label.length <= 16) return label;
                const words = label.split(' ');
                const lines = [];
                let currentLine = words[0];

                for (let i = 1; i < words.length; i++) {
                    if ((currentLine + " " + words[i]).length <= 16) {
                        currentLine += " " + words[i];
                    } else {
                        lines.push(currentLine);
                        currentLine = words[i];
                    }
                }
                lines.push(currentLine);
                return lines;
            });
        }

        // Common Tooltip Config
        const commonTooltip = {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    } else {
                        return label;
                    }
                }
            }
        };

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, font: { family: 'Inter' } } },
                tooltip: commonTooltip
            }
        };

        // --- CHART 1: CYCLE TIME SHIFT (Stacked Bar) ---
        const ctxCycle = document.getElementById('cycleTimeChart').getContext('2d');
        const cycleLabels = ['Pre-AI Workflow', 'AI-Assisted Workflow'];
        new Chart(ctxCycle, {
            type: 'bar',
            data: {
                labels: wrapLabels(cycleLabels),
                datasets: [
                    {
                        label: 'Coding',
                        data: [40, 15], // Coding time reduces significantly
                        backgroundColor: '#4F46E5', // Indigo
                    },
                    {
                        label: 'Code Review',
                        data: [20, 35], // Review time increases due to complexity/volume
                        backgroundColor: '#EC4899', // Pink
                    },
                    {
                        label: 'Testing & QA',
                        data: [25, 20],
                        backgroundColor: '#06B6D4', // Cyan
                    },
                    {
                        label: 'Deploy',
                        data: [15, 10],
                        backgroundColor: '#F59E0B', // Amber
                    }
                ]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                scales: {
                    x: { stacked: true, title: { display: true, text: '% of Total Cycle Time' } },
                    y: { stacked: true }
                }
            }
        });

        // --- CHART 2: VELOCITY VS STABILITY (Plotly Bubble) ---
        // Using Plotly to avoid SVG, configuring for WebGL/Canvas where possible or standard Plotly logic.
        // Note: Plotly JS often uses SVG for 2D charts by default, but we are instructed to use it for complex plots.
        // The prompt says "AVOID chart types that ONLY render to SVG". Plotly 2D scatter usually is SVG,
        // but Plotly.newPlot can be acceptable if the focus is on the data visualization capability not easily done by Chart.js.
        // However, to be strictly safe with "Graphics: NO SVG", chart.js scatter is safer.
        // BUT, the prompt allows Plotly if configured for Canvas/WebGL.
        // Let's use Chart.js Bubble for safety to adhere strictly to "NO SVG" mandate if I can't guarantee Plotly Canvas mode.
        // Actually, Plotly has a config `{renderer: 'canvas'}` or `type: 'scattergl'` for WebGL.

        const plotlyData = [{
            x: [10, 30, 60, 80, 20, 90, 45], // Velocity (Deploys/Week)
            y: [2, 3, 15, 25, 1, 35, 5],    // Change Failure Rate (%)
            mode: 'markers',
            type: 'scatter', // standard scatter
            marker: {
                size: [15, 20, 25, 30, 15, 40, 20], // Bubble size
                color: ['#10B981', '#10B981', '#F59E0B', '#EF4444', '#10B981', '#EF4444', '#3B82F6'], // Color based on health
                opacity: 0.7,
                line: { color: 'white', width: 2 }
            },
            text: ['Team A (Stable)', 'Team B (Good)', 'Team C (Risk)', 'Team D (Unstable)', 'Team E (Safe)', 'Team F (Danger)', 'Team G (Avg)']
        }];

        const plotlyLayout = {
            title: { text: 'Velocity vs. Failure Rate (Team Analysis)', font: { family: 'Inter', size: 16 } },
            xaxis: { title: 'Velocity (Deploys / Week)', gridcolor: '#E2E8F0' },
            yaxis: { title: 'Change Failure Rate (%)', gridcolor: '#E2E8F0' },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { t: 40, b: 40, l: 60, r: 20 },
            hovermode: 'closest'
        };

        // Render Plotly (standard mode is SVG based in DOM, but prompt allows Plotly.js if Chart.js is limiting.
        // To be ultra-safe on "NO SVG", I will use Chart.js Scatter instead.
        // REVISION: I will use Chart.js Scatter for this to guarantee Canvas rendering.)

        const ctxScatter = document.getElementById('qualityScatterPlot');
        // We need to replace the Plotly div with a canvas for Chart.js
        const parent = ctxScatter.parentElement;
        parent.innerHTML = '<div class="chart-container"><canvas id="canvasScatter"></canvas></div>';

        const ctxCanvasScatter = document.getElementById('canvasScatter').getContext('2d');
        new Chart(ctxCanvasScatter, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Teams',
                    data: [
                        { x: 10, y: 2, r: 10, team: 'Team Alpha' },
                        { x: 25, y: 3, r: 15, team: 'Team Beta' },
                        { x: 80, y: 25, r: 25, team: 'Team Gamma (High Velocity, High Risk)' },
                        { x: 95, y: 40, r: 30, team: 'Team Delta (Danger Zone)' }, // AI Driven, but broken
                        { x: 50, y: 5, r: 20, team: 'Team Epsilon (Ideal)' }
                    ],
                    backgroundColor: function(context) {
                        const val = context.raw?.y;
                        return val > 15 ? '#EF4444' : (val > 5 ? '#F59E0B' : '#10B981');
                    }
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw.team}: ${context.raw.x} Deploys, ${context.raw.y}% Fail Rate`;
                            }
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Velocity (Deploys/Week)' } },
                    y: { title: { display: true, text: 'Change Failure Rate (%)' } }
                }
            }
        });

        // --- CHART 3: BUG DETECTION SHIFT (Stacked Bar) ---
        const ctxBug = document.getElementById('bugShiftChart').getContext('2d');
        const bugLabels = ['Traditional Dev', 'AI-Augmented Dev'];
        new Chart(ctxBug, {
            type: 'bar',
            data: {
                labels: wrapLabels(bugLabels),
                datasets: [
                    {
                        label: 'Caught in CI/Pre-Prod',
                        data: [40, 75], // AI writes more tests, catching bugs early
                        backgroundColor: '#10B981', // Green
                    },
                    {
                        label: 'Caught in Production',
                        data: [60, 25],
                        backgroundColor: '#EF4444', // Red
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true, max: 100, title: { display: true, text: 'Percentage of Bugs' } }
                }
            }
        });

        // --- CHART 4: ACCEPTANCE RATE (Doughnut) ---
        const ctxAccept = document.getElementById('acceptanceChart').getContext('2d');
        new Chart(ctxAccept, {
            type: 'doughnut',
            data: {
                labels: wrapLabels(['Accepted Suggestions', 'Rejected/Rewritten']),
                datasets: [{
                    data: [35, 65], // 35% is a realistic "good" acceptance rate
                    backgroundColor: ['#4F46E5', '#E2E8F0'],
                    borderWidth: 0
                }]
            },
            options: {
                ...commonOptions,
                cutout: '70%',
                plugins: {
                    ...commonOptions.plugins,
                    title: { display: true, text: 'Avg. AI Acceptance Rate', position: 'bottom' }
                }
            }
        });

        // --- CHART 5: SPACE RADAR (Radar) ---
        const ctxRadar = document.getElementById('spaceRadarChart').getContext('2d');
        new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: wrapLabels(['Satisfaction', 'Performance', 'Activity', 'Collaboration', 'Efficiency']),
                datasets: [
                    {
                        label: 'With AI Tools',
                        data: [75, 90, 95, 60, 85], // High Activity/Efficiency, lower Collab?
                        borderColor: '#4F46E5',
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        pointBackgroundColor: '#4F46E5'
                    },
                    {
                        label: 'Without AI',
                        data: [70, 70, 60, 80, 65],
                        borderColor: '#94A3B8',
                        backgroundColor: 'rgba(148, 163, 184, 0.2)',
                        pointBackgroundColor: '#94A3B8'
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    r: {
                        angleLines: { color: '#E2E8F0' },
                        grid: { color: '#E2E8F0' },
                        pointLabels: { font: { size: 12, family: 'Inter' } },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    </script>
</body>
</html>
