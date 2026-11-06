---
layout: post
title: "The Best Product Engineering Org in the World, an interactive guide"
date: '2026-11-06 21:00'
author: multishiv19
comments: true
description: "A short, interactive summary of James Shore's keynote about the six parts of the best product engineering org in the world: People, Internal Quality, Lovability, Visibility, Agility and Profitability."
published: true
hero_class: bpe-hero
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/best-product-engineering-org/bpe.css?v={{ site.time | date: '%s' }}">

<div class="bpe" id="bpe">

<div class="credit">
  <svg viewBox="0 0 34 34" aria-hidden="true"><rect x="2" y="5" width="30" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="10" r="1.6" fill="currentColor"/><circle cx="27" cy="10" r="1.6" fill="currentColor"/><circle cx="7" cy="24" r="1.6" fill="currentColor"/><circle cx="27" cy="24" r="1.6" fill="currentColor"/><path d="M12 21 L17 13 L22 21" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>
  <p>This page is a short, interactive summary of <a href="https://www.jamesshore.com/v2/blog/2025/the-best-product-engineering-org-in-the-world"><strong>"The Best Product Engineering Org in the World"</strong></a> by <a href="https://www.jamesshore.com/"><strong>James Shore</strong></a>. He gave it as a keynote at Regional Scrum Gathering Tokyo on 8 January 2025. The ideas, stories and examples are his. I wrote the summary and made the visuals. The original has many more stories and details, so <a href="https://www.jamesshore.com/v2/blog/2025/the-best-product-engineering-org-in-the-world">read the original</a> or <a href="https://www.jamesshore.com/v2/presentations/2025/the-best-product-engineering-org-in-the-world">watch the talk</a>.</p>
</div>

<div class="hero-copy">
  <span class="label kicker">A VP of Engineering gets a hard question</span>
  <p class="big">If we were the <em>best</em> product engineering org in the world, what would that look like?</p>
  <p>James Shore could not measure productivity, so he changed the question. His answer has six parts. Each part is a lane on this track. Click a lane to go to that part.</p>
</div>

<div class="panel stadium" id="bpe-track">
  <span class="label">Six lanes, one race</span>
  <div class="stadium-art"></div>
  <div class="lane-key" role="group" aria-label="Go to a section"></div>
</div>

<h2 id="the-question">The question</h2>

<p>In September 2023, Shore was VP of Engineering for less than three months. His CEO asked him a question. Run the session to see what happened.</p>

<div class="term" id="bpe-term">
  <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i><span>leadership-team: zsh</span></div>
  <pre class="term-body" aria-live="polite"></pre>
  <button class="btn" type="button">Run</button>
</div>

<p>You cannot measure productivity well. Martin Fowler, Kent Beck and Gergely Orosz agree. Robert Austin's research shows that measurement gives small gains and bad incentives.</p>

<p>The CEO did not accept that answer. One month later, Shore met the CEO, the CPO and the CTO. He did not try to measure productivity. He asked them to describe excellence. They found six categories:</p>

<div class="six" id="bpe-six">
  <a href="#people" style="--c: var(--c-people)"><span class="n">01</span><span class="t">People</span><span class="d">The best people, and the best place for them to work.</span></a>
  <a href="#internal-quality" style="--c: var(--c-quality)"><span class="n">02</span><span class="t">Internal Quality</span><span class="d">Software that is easy to change. No bugs and no downtime.</span></a>
  <a href="#lovability" style="--c: var(--c-lovability)"><span class="n">03</span><span class="t">Lovability</span><span class="d">Users and stakeholders love what we build.</span></a>
  <a href="#visibility" style="--c: var(--c-visibility)"><span class="n">04</span><span class="t">Visibility</span><span class="d">Stakeholders trust us, because we keep them informed.</span></a>
  <a href="#agility" style="--c: var(--c-agility)"><span class="n">05</span><span class="t">Agility</span><span class="d">We see new opportunities and change direction.</span></a>
  <a href="#profitability" style="--c: var(--c-profit)"><span class="n">06</span><span class="t">Profitability</span><span class="d">The engine of a profitable, growing business.</span></a>
</div>

<p>Is Shore's org the best in the world? No. That is not the goal. The six categories show where to improve next. Your leadership team can select different categories. The exercise is the important part.</p>

<!-- ============ PEOPLE ============ -->
<section class="sec" style="--c: var(--c-people)">
<div class="sec-head"><span class="sec-num">01</span><h2 id="people">People</h2></div>
<p class="vision">"We'd have the best people in the business, and we'd be the best place for them to work."</p>

<p>A small company cannot pay more than Google or Apple. So Shore uses a different definition of "best". He hires for teamwork, peer leadership and ownership. He does not hire for school names or for Leetcode speed. The company also uses Extreme Programming (XP). Few companies use XP, so many strong developers want to work there.</p>

<p>The company grew fast and lost part of its XP culture. To fix the culture, Shore wrote a new <strong>career ladder</strong>. The old ladder gave rewards for complex systems. The new ladder gives rewards for teamwork, leadership, ownership and simple design. Select a track, then select a distance:</p>

<div class="panel" id="bpe-ladder">
  <span class="label">Career ladder, as race distances</span>
  <div class="chips" role="tablist" aria-label="Skill track"></div>
  <div class="ladder">
    <div class="rungs"></div>
    <div class="ladder-out" aria-live="polite"></div>
  </div>
</div>

<p>Look at the simple design track. At most companies, a senior engineer makes more complex designs. Shore wants the opposite. Simple design is harder, so it is the senior skill.</p>

<p>A document tells people what to do. It does not teach them how. So Shore used every new headcount for senior XP <strong>player-coaches</strong>. A player-coach writes code with the team every day. Each flag below is one coach in a group of 100 people:</p>

<div class="panel" id="bpe-coach">
  <span class="label">Pacers in the start corral</span>
  <div class="chips" role="group" aria-label="Coach ratio"></div>
  <div class="corral" aria-hidden="true"></div>
  <p class="ratio-read" aria-live="polite"></p>
</div>

<div class="takeaway"><span class="label">People, in short</span><ul>
  <li>Define "best" for your company. Hire for teamwork, peer leadership and ownership.</li>
  <li>Use the career ladder to change the culture. Give rewards for simple design.</li>
  <li>Give the teams player-coaches. Shore has 1 coach for 11 people now. His target is 1 for 6.</li>
</ul></div>
</section>

<!-- ============ INTERNAL QUALITY ============ -->
<section class="sec" style="--c: var(--c-quality)">
<div class="sec-head"><span class="sec-num">02</span><h2 id="internal-quality">Internal Quality</h2></div>
<p class="vision">"Our software would be easy to modify and maintain. We'd have no bugs and no downtime."</p>

<p>Shore uses a word from the Toyota Production System: <strong>muda</strong>. Muda means waste. In software, muda is work that you must do but that gives no value. The graph shows five months of work for one team. Each square is one working day. Shore changed the numbers to keep them confidential, but they come from real experience. Put the pointer on a row of the legend to find that work in the graph. Then move the slider to change the budget.</p>

<div class="panel" id="bpe-muda">
  <span class="label">contributions in the last 5 months</span>
  <div class="contrib-wrap"><div class="contrib" aria-hidden="true"></div></div>
  <div class="muda-foot">
    <ul class="legend"></ul>
    <div class="money">
      <label class="label" for="bpe-spend">Engineering spend</label>
      <input id="bpe-spend" type="range" min="1" max="20" value="4" step="1">
      <p class="split-read" aria-live="polite"></p>
    </div>
  </div>
</div>

<p>Only 15 days of 100 gave new value. Shore gives three causes.</p>

<h3>1. Complexity</h3>
<p>Teams under pressure select tools that give fast results. After many of these decisions, nobody understands the whole system. The mistake is to plan for the cost to build and to ignore the cost to maintain. Maintenance is most of the cost of software. AI makes this problem larger, because AI writes code fast and maintenance stays slow.</p>

<h3>2. Slow feedback loops</h3>
<p>After you change the code, how long until you know that the change works? That time is your feedback loop. Shore showed a 12-year-old system with about 1,300 tests. A full build took 8 seconds. An incremental build took less than half a second. Many teams accept 8 minutes. Start the hour and count the laps. One lap is one check of your work:</p>

<div class="panel" id="bpe-race">
  <span class="label">One hour of work, in 12 seconds</span>
  <div class="race"></div>
  <button class="btn primary" type="button">Start the hour</button>
  <span class="race-clock" aria-live="polite"></span>
</div>

<p>When a check takes half a second, you can check every line. If a test fails, the bug is in the line that you changed last. When a check takes minutes, you check many changes together. Then you debug for a long time.</p>

<h3>3. Deferred maintenance</h3>
<p>Complexity and slow feedback make upgrades large and slow. Teams delay them, because features win. Then a vendor stops support, and you pay the full cost at one time. That is the largest colour in the graph.</p>

<h3>Four ways to fix it</h3>
<p>Shore has seen four ways to fix a system with low internal quality. The first two are popular, and they usually fail. Select a strategy to see its branch history:</p>

<div class="panel" id="bpe-rewrite">
  <div class="chips" role="tablist" aria-label="Rewrite strategy"></div>
  <div class="rw">
    <div class="rw-art"></div>
    <div class="rw-text" aria-live="polite"></div>
  </div>
</div>

<div class="takeaway"><span class="label">Internal quality, in short</span><ul>
  <li>Make the technology stack simple. Plan for the cost to maintain.</li>
  <li>Get feedback in less than five seconds. Less than one second is better.</li>
  <li>Upgrade dependencies when new versions come out.</li>
  <li>Improve the code in place. Do not do a big rewrite.</li>
</ul></div>
</section>

<!-- ============ LOVABILITY ============ -->
<section class="sec" style="--c: var(--c-lovability)">
<div class="sec-head"><span class="sec-num">03</span><h2 id="lovability">Lovability</h2></div>
<p class="vision">"Our customers, users, and internal consumers would love our products."</p>

<p>Many "Agile" companies still use a waterfall plan. They decide what to build and cut the plan into Jira tickets. Then they measure how well they follow the plan. Shore calls this <strong>project-based governance</strong>. The FBI Virtual Case File project is a famous example:</p>

<div class="gitlog" aria-label="FBI Virtual Case File history">
  <div class="gl"><span class="sha">a1f04e2</span><span class="when">2001-06</span><span>chore: start Virtual Case File</span></div>
  <div class="gl"><span class="sha">7c33b90</span><span class="when">+17 mo</span><span>docs: agree on "solid requirements"</span></div>
  <div class="gl"><span class="sha">e902d1c</span><span class="when">+1 yr</span><span>feat: deliver the system <em>(nobody can use it)</em></span></div>
  <div class="gl bad"><span class="sha">0000000</span><span class="when">2005</span><span>revert: cancel the project, lose <b>$104.5M</b></span></div>
</div>

<p>The software worked. The plan was wrong. Nobody can predict what users want. You can only make a guess and test it. <strong>Product-based governance</strong> measures the result, not how well you follow the plan.</p>

<div class="panel loop-wrap" id="bpe-loop">
  <div class="loop-art"></div>
  <div>
    <span class="label">Build, measure, learn</span>
    <p>This is Eric Ries's loop. A <strong>minimum viable product</strong> is not the smallest thing that you can ship. It is the smallest test that tells you what to ship. The test can be an interview, a survey or a prototype. A shorter lap costs less.</p>
  </div>
</div>

<p>For strategy, Shore tries <strong>product bets</strong>. A product bet is a one-page hypothesis. Other leaders challenge it, and each objection becomes an experiment. Shore's example is about vampire customers and an AI salesperson. I do not summarise it here. <a href="https://www.jamesshore.com/v2/blog/2025/the-best-product-engineering-org-in-the-world">Read it in the original</a>.</p>

<div class="takeaway"><span class="label">Lovability, in short</span><ul>
  <li>Use product bets to find weak assumptions in the strategy.</li>
  <li>Measure the result, not how well you follow the plan.</li>
  <li>Test ideas fast and cheaply. If possible, test them without software.</li>
</ul></div>
</section>

<!-- ============ VISIBILITY ============ -->
<section class="sec" style="--c: var(--c-visibility)">
<div class="sec-head"><span class="sec-num">04</span><h2 id="visibility">Visibility</h2></div>
<p class="vision">"Our internal stakeholders would trust our decisions ... because we'd go out of our way to keep them involved and informed."</p>

<p>Capacity is limited, so each priority decision has winners and losers. Shore's stakeholders measured trust with one question: does engineering ship on time? At first, it did not.</p>

<p>Shore told the teams to stop making predictions. The predictions had become political weapons. Now he gives ranges from historical data. A range starts when the work starts, as a race clock starts at the gun:</p>

<div class="panel" id="bpe-chat">
  <span class="label">A typical conversation</span>
  <div class="chat"></div>
  <div class="gun" aria-hidden="true">
    <div class="axis"></div><div class="unk"><span>before the gun</span></div><div class="shot"></div><div class="band"></div>
    <span class="t" style="left: 34%">gun: leadership says go</span>
    <span class="t" style="left: 50%">+2 wk</span>
    <span class="t" style="left: 82%">+6 wk</span>
  </div>
  <button class="btn" type="button">Play the conversation</button>
</div>

<p>The stakeholder is still not happy. But now the complaint goes into the priority process, which is the correct place for it. Three things helped. The CEO, the CTO and the CPO supported adaptive planning. Shore showed the cost of muda openly. And the leaders played the <a href="https://www.agilefluency.org/game.php">Agile Fluency Game</a>, where unmanaged maintenance puts a team out of business.</p>

<aside class="aside">
  <span class="aside-icon" aria-hidden="true">i</span>
  <strong class="aside-title">Your situation is different</strong>
  <p>This approach needs a CEO who supports adaptive planning. If your CEO wants dates, change the idea to fit. Do not copy it.</p>
</aside>

<div class="takeaway"><span class="label">Visibility, in short</span><ul>
  <li>Find champions who already trust you.</li>
  <li>Show capacity openly. Let people feel it, not only read about it.</li>
  <li>Give ranges from historical data, from the start of the work.</li>
</ul></div>
</section>

<!-- ============ AGILITY ============ -->
<section class="sec" style="--c: var(--c-agility)">
<div class="sec-head"><span class="sec-num">05</span><h2 id="agility">Agility</h2></div>
<p class="vision">"We'd be entrepreneurial, scrappy, and hungry ... and change direction to take advantage of [new opportunities]."</p>

<p><strong>Tactical agility</strong> is an engineering skill. XP practices, such as test-driven development and refactoring, let you design, code and test at the same time. Technical agility comes first. Business agility follows.</p>

<p><strong>Strategic agility</strong> depends on team structure. Shore used Team Topologies, with small stream-aligned teams. Over time he saw silos, slow reorgs, specialists split across too many teams, and shared code with no owner.</p>

<p>His solution is larger teams, not more teams. He uses <strong>FaST</strong> (Fluid Scaling Technology) by Quinton Quartel. Two times each week, the full collective meets for 10 to 20 minutes:</p>

<ol class="steps-mini">
  <li>Stewards tell what their teams did.</li>
  <li>Product leads tell about changes to priorities.</li>
  <li>Volunteers become stewards for the next work.</li>
  <li>All other people select a team of 3 to 5.</li>
</ol>

<p>Compare the two models. A fixed club keeps the same runners. FaST makes new pace groups at each meeting, and each group follows a steward with a flag:</p>

<div class="panel" id="bpe-fast">
  <span class="label">Meeting simulator</span>
  <div class="chips" role="group" aria-label="Model"></div>
  <div class="fast-stage" aria-hidden="true"></div>
  <div class="fast-key"><span><i class="k-eng"></i>engineer</span><span><i class="k-spec"></i>specialist</span><span><i class="k-stew"></i>steward</span></div>
  <p class="fast-note" aria-live="polite"></p>
  <button class="btn primary" type="button">Run a FaST meeting</button>
</div>

<p>With FaST, Shore's company has needed no cross-team initiatives for more than a year. Urgent work gets a team at the next meeting. His <a href="https://www.jamesshore.com/v2/presentations/2022/fast-an-innovative-way-to-scale">FaST talks</a> give the details.</p>

<div class="takeaway"><span class="label">Agility, in short</span><ul>
  <li>Use XP practices to change direction without a technical mess.</li>
  <li>Use FaST to move people to the work when the business changes.</li>
  <li>Finish work before you start new work.</li>
</ul></div>
</section>

<!-- ============ PROFITABILITY ============ -->
<section class="sec" style="--c: var(--c-profit)">
<div class="sec-head"><span class="sec-num">06</span><h2 id="profitability">Profitability</h2></div>
<p class="vision">"We'd be the engine of a profitable and growing business."</p>

<p>Profitability is last on purpose. If you take care of the other five, profit usually follows. But the company must stay in business to do any of it.</p>

<p>Each department has a clear job. Sales turns leads into revenue. What is the job of engineering? Shore says that <strong>engineering changes the growth rate</strong>. Each feature must make revenue grow faster. A runner who goes faster in the second half has a <em>negative split</em>. Move the slider to give the business one:</p>

<div class="panel traj" id="bpe-traj">
  <span class="label">Annual revenue over five years</span>
  <svg viewBox="0 0 640 260" role="img" aria-label="Revenue over five years"></svg>
  <label class="label" for="bpe-rate">Growth that engineering adds each year</label>
  <input id="bpe-rate" type="range" min="0" max="5" value="0" step="1">
  <div class="splits"></div>
</div>

<p>Value is not always money. It can be a cure for malaria. Whatever value is for you, engineering exists to improve the trajectory.</p>
</section>

<!-- ============ FINISH ============ -->
<div class="finish">
  <div class="checker" aria-hidden="true"></div>
  <span class="label">Finish line</span>
  <h2 id="never-stop-improving">Never stop improving</h2>
  <div class="row6">
    <div style="--c: var(--c-people)"><b>01</b>Best people</div>
    <div style="--c: var(--c-quality)"><b>02</b>Easy to change</div>
    <div style="--c: var(--c-lovability)"><b>03</b>Work that matters</div>
    <div style="--c: var(--c-visibility)"><b>04</b>Trusted</div>
    <div style="--c: var(--c-agility)"><b>05</b>Adapts</div>
    <div style="--c: var(--c-profit)"><b>06</b>Changes the curve</div>
  </div>
  <p class="final">Is it the best product engineering org in the world? <em>No.</em> Will it stop trying? <em>Also no.</em></p>
  <p>Shore did not give the CEO a productivity metric. He gave a shared picture of excellence and six directions to improve.</p>
  <div class="cta">
    <p>This page is the short version. The original has the stories, the numbers and the vampire bet.</p>
    <a class="btn primary" href="https://www.jamesshore.com/v2/blog/2025/the-best-product-engineering-org-in-the-world">Read the original</a>
    <a class="btn" href="https://www.jamesshore.com/v2/presentations/2025/the-best-product-engineering-org-in-the-world">Watch the keynote</a>
  </div>
</div>

<div class="credits-full">
  <h2 id="credits">Credits</h2>
  <p>All ideas, stories, examples and quotations come from <strong>James Shore</strong>, "<a href="https://www.jamesshore.com/v2/blog/2025/the-best-product-engineering-org-in-the-world">The Best Product Engineering Org in the World</a>". He published it on 10 January 2025 as the text of his keynote at Regional Scrum Gathering Tokyo. This page is an independent summary. I wrote the text and made the track, graphs and interactions. I did not use the original slides or illustrations.</p>
  <ul>
    <li>From Shore: <a href="https://www.jamesshore.com/v2/blog/2024/update-on-software-engineering-career-ladder">the career ladder</a>, <a href="https://www.jamesshore.com/s/nullables">fast tests with Nullables</a>, <a href="https://www.jamesshore.com/v2/presentations/2022/fast-an-innovative-way-to-scale">FaST talks</a>.</li>
    <li>Also mentioned: the <a href="https://www.agilefluency.org/game.php">Agile Fluency Game</a>, Eric Ries's Build-Measure-Learn loop, Martin Fowler, Kent Beck, Gergely Orosz, Robert Austin, <em>Team Topologies</em>, and Quinton Quartel's FaST.</li>
  </ul>
</div>

</div>

<script src="{{ site.baseurl }}/assets/best-product-engineering-org/bpe.js?v={{ site.time | date: '%s' }}"></script>
