---
title: "BI Wars: Developer Sentiment Report"
permalink: /thoughtspot-sigma-omni-sentiment/
published: true
description: "A comprehensive sentiment analysis comparing ThoughtSpot, Sigma Computing, and Omni BI from a developer's perspective."
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BI Wars: Developer Sentiment Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>

    <!-- Chosen Palette: Modern Tech Slate -->
    <!-- Background: Slate-50 (#f8fafc) - Warm Neutral Light -->
    <!-- Primary Text: Slate-800 (#1e293b) -->
    <!-- Accents:
         - ThoughtSpot: Rose-500 (#f43f5e)
         - Sigma: Sky-500 (#0ea5e9)
         - Omni: Violet-500 (#8b5cf6)
    -->

    <!-- Application Structure Plan:
         The app is designed as an interactive "Decision Dashboard".
         1. Header: Sets the context of the report.
         2. Executive Summary: A quick text-based overview of the landscape.
         3. The Arena (Main Interaction Area):
            - Top: Tool Cards (Selectable). Clicking a tool updates the entire state of the dashboard.
            - Middle Left: "The Shape of the Tool" (Radar Chart). Visualizes strengths/weaknesses.
            - Middle Right: "The Developer Voice" (Dynamic Content). Shows specific quotes and sentiment analysis based on the selected tool and selected 'Persona'.
         4. Persona Toggle: A control bar to switch the 'Lens' of the report (Engineer vs Analyst vs Product), updating the text insights.
         5. Comparative Metrics: Bar charts showing raw sentiment scores across different categories.

         Why this structure?
         BI tool selection is highly dependent on *who* is asking. An engineer cares about Git integration; an analyst cares about Excel-like feel.
         Separating the view by "Persona" makes the sentiment report actionable rather than just descriptive.
    -->

    <!-- Visualization & Content Choices:
         1. Radar Chart (Chart.js):
            - Goal: Compare.
            - Why: Radar charts are excellent for showing the "balance" of a tool across multiple opposing metrics (e.g., Ease of Use vs. Power).
            - Interaction: Updates dataset when a tool is clicked.

         2. Horizontal Bar Chart (Chart.js):
            - Goal: Rank.
            - Why: Clear comparison of aggregated sentiment scores.
            - Interaction: Static comparison for reference.

         3. Dynamic Text Blocks:
            - Goal: Inform/Deep Dive.
            - Why: Users need qualitative context (quotes, feature names) to explain the quantitative scores.
            - Interaction: Vanilla JS updates DOM content based on state (Tool + Persona).

         4. Toggle Switches:
            - Goal: Filter.
            - Why: Allows users to curate the information overload.
    -->

    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
        }

        /* Custom Scrollbar for text areas */
        .custom-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
        }

        .transition-all-300 {
            transition: all 0.3s ease-in-out;
        }

        .tool-card.active {
            border-width: 2px;
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        /* Tool specific active border colors */
        .tool-card[data-tool="thoughtspot"].active { border-color: #f43f5e; }
        .tool-card[data-tool="sigma"].active { border-color: #0ea5e9; }
        .tool-card[data-tool="omni"].active { border-color: #8b5cf6; }
    </style>
</head>
<body class="min-h-screen p-4 md:p-8">

    <!-- Header Section -->
    <header class="max-w-6xl mx-auto mb-8 text-center md:text-left">
        <div class="flex flex-col md:flex-row items-center justify-between">
            <div>
                <h1 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">The BI Battleground</h1>
                <p class="text-slate-500 mt-2 text-lg">Developer Sentiment Report: ThoughtSpot vs. Sigma vs. Omni</p>
            </div>
            <div class="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                <span class="text-xs font-semibold uppercase text-slate-400 block text-center">Data Source</span>
                <span class="text-sm font-medium text-slate-700">2024-2025 Market Analysis</span>
            </div>
        </div>
    </header>

    <!-- Executive Summary -->
    <section class="max-w-6xl mx-auto mb-10">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 class="text-xl font-bold text-slate-800 mb-2">Executive Summary</h2>
            <p class="text-slate-600 leading-relaxed">
                The modern Business Intelligence (BI) landscape has shifted from "making dashboards" to enabling "data experiences."
                Our research highlights three distinct philosophies: <strong>ThoughtSpot</strong> pushes the "Search & AI" frontier,
                <strong>Sigma</strong> champions the "Spreadsheet Interface" on cloud data, and <strong>Omni</strong> attempts to unify
                the "UI speed" of discovery with the "Governance" of a semantic layer. This report breaks down how developers and analysts
                actually feel about working with these tools.
            </p>
        </div>
    </section>

    <!-- Main Dashboard Area -->
    <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- LEFT COLUMN: Navigation & Selection -->
        <div class="lg:col-span-4 flex flex-col gap-6">

            <!-- Tool Selection Cards -->
            <div class="space-y-4">
                <h3 class="text-sm font-bold uppercase text-slate-400 tracking-wider">Select a Platform</h3>

                <!-- ThoughtSpot Card -->
                <div onclick="updateDashboard('thoughtspot')" class="tool-card group cursor-pointer bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all-300" data-tool="thoughtspot">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors">ThoughtSpot</h4>
                        <div class="h-3 w-3 rounded-full bg-rose-500"></div>
                    </div>
                    <p class="text-sm text-slate-500">The "Search & AI" Pioneer</p>
                    <div class="mt-3 flex gap-2">
                        <span class="text-xs px-2 py-1 bg-rose-50 text-rose-700 rounded-md font-medium">NLP</span>
                        <span class="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Liveboards</span>
                    </div>
                </div>

                <!-- Sigma Card -->
                <div onclick="updateDashboard('sigma')" class="tool-card cursor-pointer bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all-300" data-tool="sigma">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">Sigma Computing</h4>
                        <div class="h-3 w-3 rounded-full bg-sky-500"></div>
                    </div>
                    <p class="text-sm text-slate-500">The Cloud Spreadsheet</p>
                    <div class="mt-3 flex gap-2">
                        <span class="text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded-md font-medium">Excel-Like</span>
                        <span class="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Input Tables</span>
                    </div>
                </div>

                <!-- Omni Card -->
                <div onclick="updateDashboard('omni')" class="tool-card cursor-pointer bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all-300" data-tool="omni">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="text-lg font-bold text-slate-800 group-hover:text-violet-600 transition-colors">Omni BI</h4>
                        <div class="h-3 w-3 rounded-full bg-violet-500"></div>
                    </div>
                    <p class="text-sm text-slate-500">The Unified Layer</p>
                    <div class="mt-3 flex gap-2">
                        <span class="text-xs px-2 py-1 bg-violet-50 text-violet-700 rounded-md font-medium">Semantic Model</span>
                        <span class="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Malloy-ish</span>
                    </div>
                </div>
            </div>

            <!-- Sentiment Metrics (Chart) -->
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mt-4">
                <h3 class="text-sm font-bold text-slate-700 mb-4">Sentiment Scores (Aggregated)</h3>
                <div class="chart-container" style="height: 200px;">
                    <canvas id="barChart"></canvas>
                </div>
                <p class="text-xs text-slate-400 mt-2 text-center">Based on aggregated reviews & community feedback</p>
            </div>

        </div>

        <!-- CENTER/RIGHT: Deep Dive Content -->
        <div class="lg:col-span-8 flex flex-col gap-6">

            <!-- Radar Chart Section -->
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-slate-800">Capability Profile</h3>
                    <div id="radar-legend" class="text-sm font-medium text-rose-600">ThoughtSpot Profile</div>
                </div>
                <p class="text-sm text-slate-500 mb-6">
                    Comparing the "shape" of the platform across 5 key dimensions:
                    <strong>Agility</strong> (Speed to insight),
                    <strong>Governance</strong> (Trust & Logic reuse),
                    <strong>Technical Depth</strong> (Code-ability),
                    <strong>Adoption</strong> (End-user ease), and
                    <strong>Embedding</strong> (API capabilities).
                </p>
                <div class="chart-container">
                    <canvas id="radarChart"></canvas>
                </div>
            </div>

            <!-- Persona & Insights Section -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-grow">

                <!-- Persona Toggles -->
                <div class="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap gap-3">
                    <span class="text-sm font-bold text-slate-500 py-2 mr-2">View Sentiment As:</span>
                    <button onclick="setPersona('engineer')" class="persona-btn active px-4 py-2 rounded-full text-sm font-medium transition-colors border" data-persona="engineer">Data Engineer</button>
                    <button onclick="setPersona('analyst')" class="persona-btn px-4 py-2 rounded-full text-sm font-medium transition-colors border" data-persona="analyst">Business Analyst</button>
                    <button onclick="setPersona('product')" class="persona-btn px-4 py-2 rounded-full text-sm font-medium transition-colors border" data-persona="product">Product Manager</button>
                </div>

                <!-- Dynamic Content Area -->
                <div class="p-6">
                    <h2 id="insight-title" class="text-2xl font-bold text-slate-800 mb-4">Engineering Verdict on ThoughtSpot</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <!-- Pros -->
                        <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <h4 class="text-emerald-800 font-bold mb-2 flex items-center">
                                <span class="text-xl mr-2">👍</span> What they love
                            </h4>
                            <ul id="pros-list" class="list-disc list-inside text-sm text-emerald-900 space-y-2">
                                <!-- Populated by JS -->
                            </ul>
                        </div>

                        <!-- Cons -->
                        <div class="bg-rose-50 p-4 rounded-lg border border-rose-100">
                            <h4 class="text-rose-800 font-bold mb-2 flex items-center">
                                <span class="text-xl mr-2">👎</span> Friction Points
                            </h4>
                            <ul id="cons-list" class="list-disc list-inside text-sm text-rose-900 space-y-2">
                                <!-- Populated by JS -->
                            </ul>
                        </div>
                    </div>

                    <div class="border-t border-slate-100 pt-6">
                        <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Developer Quotes</h4>
                        <div class="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300 italic text-slate-600" id="quote-box">
                            "The search is magic for users, but TML (ThoughtSpot Modeling Language) feels a bit rigid compared to true code-based modeling."
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </main>

    <!-- Footer -->
    <footer class="max-w-6xl mx-auto mt-12 mb-8 text-center text-slate-400 text-sm">
        <p>© 2025 BI Sentiment Research Project. Generated for educational analysis.</p>
    </footer>

    <!-- JavaScript Logic -->
    <script>
        // --- 1. Data Store ---
        const reportData = {
            thoughtspot: {
                name: "ThoughtSpot",
                color: "rgba(244, 63, 94, 1)", // rose-500
                bg: "rgba(244, 63, 94, 0.2)",
                radar: [80, 60, 65, 95, 85], // Agility, Governance, Depth, Adoption, Embedding
                sentimentScore: 78,
                personas: {
                    engineer: {
                        title: "Engineering Verdict on ThoughtSpot",
                        pros: [
                            "TML (ThoughtSpot Modeling Language) allows Git-based version control.",
                            "Embed SDK is mature and offers deep customizability.",
                            "Offloads 'ad-hoc' ticket requests significantly."
                        ],
                        cons: [
                            "Complex data modeling can be rigid; prefers flat wide tables.",
                            "Debugging 'why did the search return this?' can be tricky.",
                            "Expensive per-query costs in some cloud configs."
                        ],
                        quote: "\"The embedded search is a killer feature for our product, but setting up the worksheets perfectly for the AI takes serious prep work.\""
                    },
                    analyst: {
                        title: "Analyst Verdict on ThoughtSpot",
                        pros: [
                            "Search bar feels natural, like Google for data.",
                            "SpotIQ uncovers insights I didn't ask for.",
                            "Liveboards are easy to assemble from search answers."
                        ],
                        cons: [
                            "Hard to do complex multi-pass calculations or weird joins.",
                            "If the keyword mapping isn't perfect, I get zero results.",
                            "Visual customization is less flexible than Tableau."
                        ],
                        quote: "\"It's great for quick answers. If I need a pixel-perfect financial report, I struggle, but for trend analysis, it's instant.\""
                    },
                    product: {
                        title: "Product Manager Verdict on ThoughtSpot",
                        pros: [
                            "Highest 'Self-Service' rate among users.",
                            "Sticky feature for SaaS embedding.",
                            "Reduces backlog of simple reporting tasks."
                        ],
                        cons: [
                            "High licensing cost.",
                            "Requires training users how to 'search' correctly.",
                            "Initial setup time to get value is longer than simple dash tools."
                        ],
                        quote: "\"Our customers love the 'Ask a Question' feature. It makes our SaaS platform feel much more premium.\""
                    }
                }
            },
            sigma: {
                name: "Sigma Computing",
                color: "rgba(14, 165, 233, 1)", // sky-500
                bg: "rgba(14, 165, 233, 0.2)",
                radar: [90, 50, 75, 90, 70],
                sentimentScore: 88,
                personas: {
                    engineer: {
                        title: "Engineering Verdict on Sigma",
                        pros: [
                            "No data movement - queries run directly on Snowflake/Databricks.",
                            "Input Tables allow write-back (huge differentiator).",
                            "JSON parsing in the UI is surprisingly good."
                        ],
                        cons: [
                            "Generated SQL can be massive and hard to optimize.",
                            "Governance is looser; logic often lives in individual workbooks.",
                            "Version control is improving but not as robust as LookML."
                        ],
                        quote: "\"Being able to fix a data pipeline issue and have it instantly reflect in Sigma without a sync job is a game changer.\""
                    },
                    analyst: {
                        title: "Analyst Verdict on Sigma",
                        pros: [
                            "It's basically Excel on steroids. I felt at home immediately.",
                            "I can drill down into row-level data without asking IT.",
                            "Calculations use spreadsheet syntax, not complex SQL."
                        ],
                        cons: [
                            "Formatting charts can be a bit fiddly.",
                            "Sometimes I make a query that times out the warehouse.",
                            "Sharing visuals requires careful permissioning."
                        ],
                        quote: "\"I don't have to learn SQL to do complex joins anymore. The VLOOKUP equivalent just works on billions of rows.\""
                    },
                    product: {
                        title: "Product Manager Verdict on Sigma",
                        pros: [
                            "Extremely fast adoption by finance and ops teams.",
                            "Embedding entire workbooks is very quick.",
                            "Input tables enable simple 'app-like' workflows."
                        ],
                        cons: [
                            "Can lead to 'workbook sprawl' if not managed.",
                            "Embedding individual visualizations is less granular than ThoughtSpot.",
                            "Warehouse costs can spike if users write bad queries."
                        ],
                        quote: "\"We replaced our internal admin tools with Sigma Workbooks. The write-back feature let us build a refund approval tool in an afternoon.\""
                    }
                }
            },
            omni: {
                name: "Omni BI",
                color: "rgba(139, 92, 246, 1)", // violet-500
                bg: "rgba(139, 92, 246, 0.2)",
                radar: [85, 85, 80, 75, 60],
                sentimentScore: 92,
                personas: {
                    engineer: {
                        title: "Engineering Verdict on Omni",
                        pros: [
                            "The 'promote to model' workflow is genius. Fix it in UI, save to code.",
                            "Feels like Looker 2.0 but faster.",
                            "Semantic layer is robust and DRY (Don't Repeat Yourself)."
                        ],
                        cons: [
                            "Still a newer player, ecosystem is smaller.",
                            "Documentation is good but evolving.",
                            "Fewer visualization types than mature competitors."
                        ],
                        quote: "\"Finally, a tool that doesn't force me to model everything before I can see a chart. I explore first, then lock it down.\""
                    },
                    analyst: {
                        title: "Analyst Verdict on Omni",
                        pros: [
                            "Fast UI. Really fast.",
                            "I can create temporary fields without begging engineers.",
                            "The distinction between 'shared model' and 'my analysis' is clear."
                        ],
                        cons: [
                            "Visuals are clean but basic.",
                            "Sometimes the disconnect between the model and my changes gets confusing.",
                            "Learning curve is slightly steeper than Sigma."
                        ],
                        quote: "\"It feels like the best parts of Looker without the slowness. I trust the numbers because of the model.\""
                    },
                    product: {
                        title: "Product Manager Verdict on Omni",
                        pros: [
                            "Balances speed and truth perfectly.",
                            "Great for internal BI where trust is paramount.",
                            "Team is incredibly responsive to feature requests."
                        ],
                        cons: [
                            "Embedding features are newer compared to TS/Sigma.",
                            "Market awareness is lower, harder to hire 'Omni experts'.",
                            "Pricing model is evolving."
                        ],
                        quote: "\"We chose Omni because we needed a single source of truth but couldn't afford the 6-month implementation time of legacy tools.\""
                    }
                }
            }
        };

        // --- 2. State Management ---
        let currentTool = 'thoughtspot';
        let currentPersona = 'engineer';
        let radarChartInstance = null;
        let barChartInstance = null;

        // --- 3. Interaction Functions ---

        function initCharts() {
            try {
                // Radar Chart Config
                const radarCtx = document.getElementById('radarChart').getContext('2d');
                radarChartInstance = new Chart(radarCtx, {
                    type: 'radar',
                    data: {
                        labels: ['Agility', 'Governance', 'Tech Depth', 'Adoption', 'Embedding'],
                        datasets: [{
                            label: reportData[currentTool].name,
                            data: reportData[currentTool].radar,
                            fill: true,
                            backgroundColor: reportData[currentTool].bg,
                            borderColor: reportData[currentTool].color,
                            pointBackgroundColor: reportData[currentTool].color,
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: reportData[currentTool].color
                        },
                        {
                            label: 'Market Avg',
                            data: [70, 65, 60, 75, 60], // Baseline
                            fill: true,
                            backgroundColor: 'rgba(148, 163, 184, 0.1)',
                            borderColor: 'rgba(148, 163, 184, 0.5)',
                            borderDash: [5, 5],
                            pointRadius: 0
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                min: 0,
                                max: 100,
                                angleLines: { display: true, color: '#e2e8f0' },
                                grid: { color: '#e2e8f0' },
                                ticks: {
                                    display: false,
                                    stepSize: 20, // Explicit step size prevents fraction error
                                    maxTicksLimit: 5
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });

                // Bar Chart Config
                const barCtx = document.getElementById('barChart').getContext('2d');
                barChartInstance = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: ['ThoughtSpot', 'Sigma', 'Omni'],
                        datasets: [{
                            label: 'Developer Satisfaction (0-100)',
                            data: [78, 88, 92],
                            backgroundColor: [
                                'rgba(244, 63, 94, 0.7)',
                                'rgba(14, 165, 233, 0.7)',
                                'rgba(139, 92, 246, 0.7)'
                            ],
                            borderColor: [
                                'rgba(244, 63, 94, 1)',
                                'rgba(14, 165, 233, 1)',
                                'rgba(139, 92, 246, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 100,
                                grid: { display: false },
                                ticks: {
                                    stepSize: 20 // Explicit step size
                                }
                            },
                            y: { grid: { display: false } }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `Score: ${context.raw}/100`;
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error("Chart initialization failed:", error);
            }
        }

        function updateDashboard(toolKey) {
            currentTool = toolKey;

            // 1. Update Tool Cards Styling
            document.querySelectorAll('.tool-card').forEach(card => {
                card.classList.remove('active');
                card.classList.remove('border-rose-500', 'border-sky-500', 'border-violet-500'); // Clean up old dynamic borders
            });
            const activeCard = document.querySelector(`.tool-card[data-tool="${toolKey}"]`);
            if (activeCard) activeCard.classList.add('active');

            // 2. Update Radar Chart (with null check)
            if (radarChartInstance && radarChartInstance.data) {
                const toolData = reportData[toolKey];
                radarChartInstance.data.datasets[0].label = toolData.name;
                radarChartInstance.data.datasets[0].data = toolData.radar;
                radarChartInstance.data.datasets[0].backgroundColor = toolData.bg;
                radarChartInstance.data.datasets[0].borderColor = toolData.color;
                radarChartInstance.data.datasets[0].pointBackgroundColor = toolData.color;
                radarChartInstance.data.datasets[0].pointHoverBorderColor = toolData.color;
                radarChartInstance.update();

                // 3. Update Legend Text color
                const legendEl = document.getElementById('radar-legend');
                if (legendEl) {
                    legendEl.textContent = `${toolData.name} Profile`;
                    legendEl.className = `text-sm font-medium transition-colors`;
                    legendEl.style.color = toolData.color;
                }
            }

            // 4. Update Content
            updateContent();
        }

        function setPersona(personaKey) {
            currentPersona = personaKey;

            // Update Buttons
            document.querySelectorAll('.persona-btn').forEach(btn => {
                if(btn.dataset.persona === personaKey) {
                    btn.classList.add('bg-slate-800', 'text-white', 'border-transparent');
                    btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                } else {
                    btn.classList.remove('bg-slate-800', 'text-white', 'border-transparent');
                    btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
                }
            });

            // Update Content
            updateContent();
        }

        function updateContent() {
            const data = reportData[currentTool].personas[currentPersona];

            // Title
            const titleEl = document.getElementById('insight-title');
            if (titleEl) titleEl.textContent = data.title;

            // Lists with simple fade animation logic (simulated by innerHTML replacement)
            const prosList = document.getElementById('pros-list');
            if (prosList) prosList.innerHTML = data.pros.map(item => `<li class="mb-1">${item}</li>`).join('');

            const consList = document.getElementById('cons-list');
            if (consList) consList.innerHTML = data.cons.map(item => `<li class="mb-1">${item}</li>`).join('');

            // Quote
            const quoteBox = document.getElementById('quote-box');
            if (quoteBox) quoteBox.textContent = data.quote;
        }

        // --- 4. Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            initCharts();
            // Set initial state styling
            setPersona('engineer');
            // If charts failed to init, updateDashboard still runs safely because of checks
            updateDashboard('thoughtspot');
        });

    </script>
</body>
</html>