(function () {
  var root = document.getElementById('bpe');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || root).querySelector(sel); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function rng(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }
  function money(k) {
    return k >= 1000 ? '$' + (k / 1000).toFixed(k % 1000 ? 2 : 0).replace(/0$/, '') + 'M' : '$' + k + 'K';
  }
  function stadium(x, y, w, h) {
    var r = h / 2;
    return 'M' + (x + r) + ',' + y + ' H' + (x + w - r) +
      ' A' + r + ',' + r + ' 0 0 1 ' + (x + w - r) + ',' + (y + h) +
      ' H' + (x + r) + ' A' + r + ',' + r + ' 0 0 1 ' + (x + r) + ',' + y + ' Z';
  }
  function lapText(n) { return n.toLocaleString() + (n === 1 ? ' lap' : ' laps'); }
  function jumpTo(id) {
    var t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  function onceVisible(node, threshold, fn) {
    if (!('IntersectionObserver' in window)) return fn();
    new IntersectionObserver(function (es, obs) {
      if (es[0].isIntersecting) { obs.disconnect(); fn(); }
    }, { threshold: threshold }).observe(node);
  }
  function chipGroup(container, items, initial, onPick, role) {
    var attr = role === 'tab' ? 'aria-selected' : 'aria-pressed';
    var buttons = items.map(function (item, i) {
      var b = el('button', { type: 'button', class: 'chip' }, item);
      if (role === 'tab') b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { select(i); });
      container.appendChild(b);
      return b;
    });
    function select(i) {
      buttons.forEach(function (b, j) { b.setAttribute(attr, i === j ? 'true' : 'false'); });
      onPick(i);
    }
    select(initial);
    return select;
  }

  var SECTIONS = [
    ['people', 'People', '--c-people'],
    ['internal-quality', 'Internal Quality', '--c-quality'],
    ['lovability', 'Lovability', '--c-lovability'],
    ['visibility', 'Visibility', '--c-visibility'],
    ['agility', 'Agility', '--c-agility'],
    ['profitability', 'Profitability', '--c-profit']
  ];

  function track() {
    var box = $('#bpe-track');
    if (!box) return;
    var W = 600, H = 300, EDGE = 10, LW = 18;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="An athletics track with six coloured lanes">' +
      '<defs><pattern id="bpe-check" width="8" height="8" patternUnits="userSpaceOnUse">' +
      '<rect width="8" height="8" fill="#fff"/><rect width="4" height="4" fill="#111"/><rect x="4" y="4" width="4" height="4" fill="#111"/></pattern></defs>' +
      '<path d="' + stadium(EDGE - 4, EDGE - 4, W - 2 * EDGE + 8, H - 2 * EDGE + 8) + '" class="trk-base"/>';
    var paths = [];
    for (var k = 5; k >= 0; k--) {
      var inset = EDGE + (5 - k) * LW + LW / 2;
      var d = stadium(inset, inset, W - 2 * inset, H - 2 * inset);
      paths[k] = d;
      s += '<path d="' + d + '" class="trk-lane" data-k="' + k + '" style="stroke:var(' + SECTIONS[k][2] + ')"/>';
    }
    var inner = EDGE + 6 * LW;
    s += '<path d="' + stadium(inner, inner, W - 2 * inner, H - 2 * inner) + '" class="trk-infield"/>';
    s += '<rect x="318" y="' + (H - inner) + '" width="10" height="' + (inner - EDGE + 4) + '" fill="url(#bpe-check)"/>';
    for (k = 0; k < 6; k++) {
      var cy = H - (EDGE + (5 - k) * LW + LW / 2);
      s += '<text x="300" y="' + (cy + 4) + '" text-anchor="middle" class="trk-num">' + (k + 1) + '</text>';
    }
    s += '<text x="300" y="146" text-anchor="middle" class="trk-title">six lanes, one org</text>' +
      '<text x="300" y="168" text-anchor="middle" class="trk-sub">click a lane</text>';
    for (k = 0; k < 6; k++) {
      s += '<circle r="6" class="trk-runner">' + (reduceMotion ? '' :
        '<animateMotion dur="' + (11 + k * 1.3) + 's" begin="-' + (k * 1.7) + 's" repeatCount="indefinite" path="' + paths[k] + '"/>') + '</circle>';
    }
    s += '</svg>';
    var art = $('.stadium-art', box);
    art.innerHTML = s;
    var lanes = art.querySelectorAll('.trk-lane');
    function hi(k) {
      Array.prototype.forEach.call(lanes, function (l) { l.classList.toggle('dim', k >= 0 && +l.dataset.k !== k); });
    }
    Array.prototype.forEach.call(lanes, function (l) {
      var k = +l.dataset.k;
      l.addEventListener('click', function () { jumpTo(SECTIONS[k][0]); });
      l.addEventListener('mouseenter', function () { hi(k); });
      l.addEventListener('mouseleave', function () { hi(-1); });
    });
    var key = $('.lane-key', box);
    SECTIONS.forEach(function (sec, k) {
      var b = el('button', { type: 'button', class: 'bib-btn', style: '--c: var(' + sec[2] + ')' },
        '<b>' + (k + 1) + '</b>' + sec[1]);
      b.addEventListener('click', function () { jumpTo(sec[0]); });
      b.addEventListener('mouseenter', function () { hi(k); });
      b.addEventListener('mouseleave', function () { hi(-1); });
      b.addEventListener('focus', function () { hi(k); });
      b.addEventListener('blur', function () { hi(-1); });
      key.appendChild(b);
    });
  }

  function term() {
    var box = $('#bpe-term');
    if (!box) return;
    var lines = [
      ['cmd', 'ceo ask "How are you measuring productivity?"'],
      ['dim', '# Sep 2023. The VP of Engineering has been in the job for less than 3 months.'],
      ['cmd', 'vp-eng measure --productivity'],
      ['err', 'error: no reliable metric exists'],
      ['out', '"I\'m not. It can\'t be measured."'],
      ['dim', '# The CEO does not accept that. One month later:'],
      ['cmd', 'vp-eng ask --leadership "describe excellence"'],
      ['ok', '✓ 6 categories found']
    ];
    var body = $('.term-body', box), btn = $('button', box);
    var timers = [];
    function line(kind, text) {
      var n = el('span', { class: 'tl tl-' + kind });
      n.textContent = text;
      body.appendChild(n);
      return n;
    }
    function render(all) {
      timers.forEach(clearTimeout);
      timers = [];
      body.textContent = '';
      if (all) {
        lines.forEach(function (l) { line(l[0], l[1]); });
        btn.textContent = 'Run again';
        return;
      }
      var t = 0;
      lines.forEach(function (l) {
        timers.push(setTimeout(function () {
          var n = line(l[0], l[0] === 'cmd' ? '' : l[1]);
          if (l[0] !== 'cmd') return;
          var i = 0;
          (function type() {
            n.textContent = l[1].slice(0, ++i);
            if (i < l[1].length) timers.push(setTimeout(type, 22));
          })();
        }, t));
        t += l[0] === 'cmd' ? l[1].length * 22 + 350 : 650;
      });
      timers.push(setTimeout(function () { btn.textContent = 'Run again'; }, t));
    }
    btn.addEventListener('click', function () { render(reduceMotion); });
    onceVisible(box, 0.5, function () { render(reduceMotion); });
  }

  function ladder() {
    var box = $('#bpe-ladder');
    if (!box) return;
    var levels = [['5K', 'Associate', 5], ['10K', 'Mid-level', 10], ['Half', 'Senior', 21.1], ['Marathon', 'Most senior', 42.2]];
    var tracks = [
      { name: 'Teamwork', skills: [
        ['Take part', 'Take an active part in team conversations.'],
        ['Seek other views', 'Tell your view. Then work to understand the views of other people.'],
        ['Make room', 'Find who does not speak, and make sure that the team hears them.'],
        ['Make it safe', 'Work with management to make it safe to speak and to disagree.']
      ] },
      { name: 'Peer leadership', skills: [
        ['Follow the process', 'Follow the team process. Help to change it when it does not fit.'],
        ['Team steward', 'Take a formal role. Define how the team works together.'],
        ['Follow the expert', 'Follow the person who knows the situation best, whatever their title.'],
        ['Grow leaders', 'With managers, find the leadership gaps on the team. Help people grow into them.']
      ] },
      { name: 'Ownership', skills: [
        ['Own your work', 'Do your best work because you enjoy it, not because a manager watches.'],
        ['Do the boring jobs', 'Do the boring jobs that every team has. Do not wait to be asked.'],
        ['Own improvements', 'Propose changes to how the team works, and make them happen.'],
        ['Clear the road', 'Find blockers outside the team. Work with leads to remove them.']
      ] },
      { name: 'Simple design', skills: [
        ['Readable code', 'Use functions and variables to make code easy to read.'],
        ['Better abstractions', 'Refactor functions and variables. Make suitable classes.'],
        ['Simpler system', 'Refactor class abstractions to make the full design simpler.'],
        ['System-wide refactoring', 'Refactor the full system. Order the work by risk and cost of change.']
      ] }
    ];
    var t = 0, lv = 0;
    var rungsBox = $('.rungs', box), out = $('.ladder-out', box);
    var rungs = levels.map(function (L, i) {
      var b = el('button', { type: 'button', class: 'rung', 'aria-pressed': 'false' },
        '<span class="dist">' + L[0] + '</span><span class="lv">' + L[1] + '</span><span class="sk"></span>');
      b.addEventListener('click', function () { lv = i; render(); });
      rungsBox.appendChild(b);
      return b;
    });
    function render() {
      var tr = tracks[t], L = levels[lv];
      rungs.forEach(function (b, i) {
        b.setAttribute('aria-pressed', i === lv ? 'true' : 'false');
        $('.sk', b).textContent = tr.skills[i][0];
      });
      out.innerHTML = '<span class="label">' + tr.name + ' · ' + L[1] + '</span>' +
        '<div class="skill">' + tr.skills[lv][0] + '</div><p>' + tr.skills[lv][1] + '</p>' +
        '<div class="mini-course"><i style="width:' + (L[2] / 42.2 * 100) + '%"></i></div>' +
        '<span class="mini-km">' + L[2] + ' of 42.2 km</span>';
    }
    chipGroup($('.chips', box), tracks.map(function (x) { return x.name; }), 0, function (i) { t = i; render(); }, 'tab');
  }

  function coach() {
    var box = $('#bpe-coach');
    if (!box) return;
    var opts = [
      [100, 'a typical "Centre of Excellence"'],
      [50, 'a typical "Centre of Excellence"'],
      [11, 'Shore\'s org today'],
      [6, 'Shore\'s target']
    ];
    var corral = $('.corral', box), read = $('.ratio-read', box);
    for (var i = 0; i < 100; i++) corral.appendChild(el('i'));
    chipGroup($('.chips', box), opts.map(function (o) { return '1 : ' + o[0]; }), 2, function (k) {
      var n = opts[k][0], coaches = Math.max(1, Math.round(100 / (n + 1)));
      var step = 100 / coaches, marked = {};
      for (var c = 0; c < coaches; c++) marked[Math.floor(step * c + step / 2)] = true;
      Array.prototype.forEach.call(corral.children, function (d, j) { d.classList.toggle('pacer', !!marked[j]); });
      read.innerHTML = '<b>' + coaches + '</b> pacer' + (coaches > 1 ? 's' : '') + ' for 100 runners, ' + opts[k][1] + '. ' +
        (n >= 50 ? 'Nobody runs next to a pacer.' : 'Each small group runs next to a pacer every day.');
    });
  }

  function muda() {
    var box = $('#bpe-muda');
    if (!box) return;
    var cats = [
      { n: 'Deferred maintenance', p: 35, c: 'hsl(var(--h-quality) 32% 30%)' },
      { n: 'On call and incidents', p: 25, c: 'hsl(var(--h-quality) 42% 46%)' },
      { n: 'Bug fixes', p: 20, c: 'hsl(var(--h-quality) 48% 62%)' },
      { n: 'Routine maintenance', p: 5, c: 'hsl(var(--h-quality) 40% 78%)' },
      { n: 'New value', p: 15, c: 'var(--lime)', value: true }
    ];
    var days = [];
    cats.forEach(function (cat, ci) { for (var i = 0; i < cat.p; i++) days.push(ci); });
    var r = rng(42);
    for (var i = days.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1)), tmp = days[i];
      days[i] = days[j]; days[j] = tmp;
    }
    var grid = $('.contrib', box), legend = $('.legend', box);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'], dayNames = ['Mon', '', 'Wed', '', 'Fri'];
    grid.appendChild(el('span'));
    for (var w = 0; w < 20; w++) grid.appendChild(el('span', { class: 'mo' }, w % 4 === 0 ? months[w / 4] : ''));
    var cells = [];
    for (var d = 0; d < 5; d++) {
      grid.appendChild(el('span', { class: 'dy' }, dayNames[d]));
      for (w = 0; w < 20; w++) {
        var cell = el('i');
        cell.dataset.cat = days[w * 5 + d];
        cell.dataset.w = w;
        cells.push(cell);
        grid.appendChild(cell);
      }
    }
    cats.forEach(function (cat, ci) {
      var li = el('li', { class: cat.value ? 'value' : '', tabindex: '0' },
        '<i style="background:' + cat.c + '"></i><span>' + cat.n + '</span><b>' + cat.p + ' days</b>');
      li.addEventListener('mouseenter', function () { focus(ci); });
      li.addEventListener('mouseleave', function () { focus(-1); });
      li.addEventListener('focus', function () { focus(ci); });
      li.addEventListener('blur', function () { focus(-1); });
      legend.appendChild(li);
    });
    function focus(ci) {
      cells.forEach(function (c) { c.classList.toggle('dim', ci >= 0 && +c.dataset.cat !== ci); });
    }
    onceVisible(grid, 0.35, function () {
      cells.forEach(function (c) {
        setTimeout(function () { c.style.background = cats[c.dataset.cat].c; }, reduceMotion ? 0 : c.dataset.w * 45);
      });
    });

    var slider = $('#bpe-spend'), read = $('.split-read', box);
    function update() {
      var spend = slider.value * 250;
      read.innerHTML = 'Of <b>' + money(spend) + '</b> spent: <b class="v">' + money(spend * 0.15) + ' value</b>, <b>' + money(spend * 0.85) + ' muda</b>';
    }
    slider.addEventListener('input', update);
    update();
  }

  function race() {
    var box = $('#bpe-race');
    if (!box) return;
    var HOUR = 3600, DURATION = 12000;
    var lanes = [
      { n: '8 min build', s: 480 },
      { n: '8 s build', s: 8 },
      { n: '0.5 s build', s: 0.5, fast: true }
    ];
    var host = $('.race', box), btn = $('button', box), clock = $('.race-clock', box);
    lanes.forEach(function (l) {
      var d = stadium(8, 8, 224, 32);
      var lapsPerSecond = HOUR / l.s / (DURATION / 1000);
      l.blur = lapsPerSecond > 2;
      var row = el('div', { class: 'lane' + (l.fast ? ' fast' : '') + (l.blur ? ' blur' : '') },
        '<span class="name">' + l.n + '</span>' +
        '<svg viewBox="0 0 240 48" aria-hidden="true"><path class="oval" d="' + d + '"/>' +
        '<path class="streak" d="' + d + '" style="animation-duration:' + (l.fast ? 0.18 : 0.55) + 's"/>' +
        '<circle class="dot" r="6"/></svg>' +
        '<span class="count">' + lapText(0) + '</span>');
      l.row = row;
      l.path = row.querySelector('.oval');
      l.dot = row.querySelector('.dot');
      l.len = l.path.getTotalLength();
      l.count = $('.count', row);
      host.appendChild(row);
    });
    var running = false;
    function draw(sim) {
      lanes.forEach(function (l) {
        var done = sim / l.s, pt = l.path.getPointAtLength((done % 1) * l.len);
        l.dot.setAttribute('cx', pt.x);
        l.dot.setAttribute('cy', pt.y);
        l.count.textContent = lapText(Math.floor(done));
      });
      clock.textContent = Math.floor(sim / 60) + ' min of work';
    }
    function finish() {
      draw(HOUR - 0.001);
      lanes.forEach(function (l) { l.row.classList.remove('running'); l.count.textContent = lapText(Math.round(HOUR / l.s)); });
      clock.textContent = '60 min: 7, 450 or 7,200 checks of your work.';
      running = false;
      btn.textContent = 'Run it again';
    }
    btn.addEventListener('click', function () {
      if (running) return;
      if (reduceMotion) return finish();
      running = true;
      lanes.forEach(function (l) { l.row.classList.add('running'); });
      var start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / DURATION);
        draw(p * HOUR);
        if (p < 1) requestAnimationFrame(frame); else finish();
      }
      requestAnimationFrame(frame);
    });
    draw(0);
  }

  function rewrite() {
    var box = $('#bpe-rewrite');
    if (!box) return;
    var OLD = 'var(--ink-3)', NEW = 'var(--c-quality)', OK = 'var(--lime)', BAD = 'var(--c-people)';
    function svg(body) { return '<svg viewBox="0 0 300 180" role="img" aria-hidden="true">' + body + '</svg>'; }
    function ln(x1, y1, x2, y2, c, dash) {
      return '<path d="M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2 + '" style="fill:none;stroke:' + c + ';stroke-width:3' + (dash ? ';stroke-dasharray:4 4' : '') + '"/>';
    }
    function curve(x1, y1, x2, y2, c) {
      return '<path d="M' + x1 + ',' + y1 + ' C' + (x1 + 18) + ',' + y1 + ' ' + (x2 - 18) + ',' + y2 + ' ' + x2 + ',' + y2 + '" style="fill:none;stroke:' + c + ';stroke-width:3"/>';
    }
    function dot(x, y, c, r) {
      return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" style="fill:' + c + ';stroke:var(--paper);stroke-width:2"/>';
    }
    function tag(x, y, t, c, anchor) {
      return '<text x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' style="fill:' + (c || 'var(--ink-3)') + ';font:10px var(--mono)">' + t + '</text>';
    }
    function commits(x1, x2, step, y, c, r) {
      var s = '';
      for (var x = x1; x <= x2; x += step) s += dot(x, y, c, r);
      return s;
    }
    var M = 130;
    var strategies = [
      { name: 'Big-bang rewrite', risk: 5, verdict: 'Do not do this',
        art: svg(
          ln(16, M, 290, M, OLD) + commits(30, 280, 25, M, OLD) + tag(16, M + 26, 'main: patch, patch, patch') +
          curve(45, M, 80, 60, NEW) + ln(80, 60, 230, 60, NEW) + commits(90, 225, 27, 60, NEW) +
          ln(230, 60, 284, 60, NEW, true) + '<text x="288" y="65" style="fill:' + BAD + ';font:700 16px var(--mono)">?</text>' +
          tag(80, 40, 'rewrite: 2 years, never merged', NEW)),
        text: 'A new team builds a new system. The old team continues to patch the old system. The rewrite takes longer than the plan. The old system gets worse, because people think that it will go away. You pay for two teams. At the end, the company cancels the rewrite, or ships it without features that the old system had.' },
      { name: 'Modular rewrite', risk: 4, verdict: 'Usually fails',
        art: svg(
          ln(16, M, 290, M, OLD) + commits(30, 280, 25, M, OLD) +
          curve(40, M, 70, 80, NEW) + commits(80, 105, 25, 80, NEW) + ln(70, 80, 115, 80, NEW) + curve(115, 80, 145, M, NEW) + dot(145, M, OK, 6) + tag(96, 70, 'billing ✓', OK) +
          curve(150, M, 180, 80, NEW) + ln(180, 80, 215, 80, NEW) + commits(190, 215, 25, 80, NEW) + curve(215, 80, 245, M, NEW) + dot(245, M, OK, 6) + tag(186, 70, 'reports ✓', OK) +
          curve(60, M, 90, 30, BAD) + ln(90, 30, 200, 30, BAD, true) + '<text x="206" y="35" style="fill:' + BAD + ';font:700 14px var(--mono)">✗</text>' +
          tag(222, 34, 'core: stalled', BAD) + tag(16, M + 26, 'main: now three systems')),
        text: 'Split off parts of the system and rewrite them one at a time. This is safer than a big bang. But teams do the easy parts first, and the complex core stays. Then other priorities come. Now you have several systems with confusing connections. That can be a larger mess than the first one.' },
      { name: 'Change-driven rewrite', risk: 2, verdict: 'Use it to change core technology',
        art: svg((function () {
          var s = ln(16, 70, 290, 70, OLD) + ln(40, 140, 280, 140, NEW);
          for (var i = 0; i < 9; i++) {
            var x = 40 + i * 30;
            s += '<path d="M' + x + ',76 L' + x + ',132" style="stroke:' + NEW + ';stroke-width:1.5;stroke-dasharray:2 3"/>' + dot(x, 70, OLD) + dot(x, 140, NEW, 4);
          }
          return s + tag(16, 52, 'main: feat + migrate what it touches') + tag(40, 166, 'new system grows with each change', NEW);
        })()),
        text: 'Keep one team, and continue to build features. When a feature changes some code, move that code to the new system as part of the feature. You do not need a separate rewrite budget. It takes years. But most changes happen in a small part of the code, so the benefit starts early.' },
      { name: 'Improve in place', risk: 1, verdict: 'Best default',
        art: svg((function () {
          var s = ln(16, M, 290, M, OLD);
          for (var i = 0; i < 18; i++) {
            var x = 26 + i * 15;
            s += i % 2 ? dot(x, M, OK, 3.5) : dot(x, M, OLD, 5);
          }
          s += '<path d="M20,30 C80,34 110,70 160,82 C210,94 250,96 286,98" style="fill:none;stroke:' + OK + ';stroke-width:2.5"/>' +
            tag(20, 22, 'build time: 8 min') + tag(286, 90, '8 s', OK, 'end') +
            tag(16, M + 26, 'main: feat, refactor, feat, refactor');
          return s;
        })()),
        text: 'Do not rewrite. When you work on a feature or a bug, add tests and clean up the code near it. The code that changes most gets the most improvement. Shore\'s 8-second build came from a codebase that was a mess ten years before.' }
    ];
    var art = $('.rw-art', box), text = $('.rw-text', box);
    chipGroup($('.chips', box), strategies.map(function (s) { return s.name; }), 0, function (k) {
      var s = strategies[k];
      art.innerHTML = s.art;
      var meter = '';
      for (var i = 1; i <= 5; i++) meter += '<i class="' + (i <= s.risk ? 'on' : '') + '"></i>';
      text.innerHTML = '<span class="label">Risk</span><div class="meter' + (s.risk <= 2 ? ' good' : '') + '">' + meter + '</div>' +
        '<span class="verdict" style="color:' + (s.risk <= 2 ? OK : BAD) + '">' + s.verdict + '</span>' +
        '<p style="margin-top:.6rem">' + s.text + '</p>';
    }, 'tab');
  }

  function loop() {
    var host = $('#bpe-loop .loop-art');
    if (!host) return;
    var d = stadium(30, 40, 220, 120);
    var stops = [['BUILD', 140, 40], ['MEASURE', 250, 100], ['LEARN', 140, 160]];
    var s = '<svg viewBox="0 0 280 200" role="img" aria-label="Build, measure, learn as one lap of a track">' +
      '<path d="' + d + '" style="fill:none;stroke:var(--paper-2);stroke-width:22"/>' +
      '<path d="' + d + '" style="fill:none;stroke:var(--c-lovability);stroke-width:2;stroke-dasharray:6 6"/>';
    stops.forEach(function (n) {
      s += '<rect x="' + (n[1] - 36) + '" y="' + (n[2] - 12) + '" width="72" height="24" rx="12" style="fill:var(--ink)"/>' +
        '<text x="' + n[1] + '" y="' + (n[2] + 4) + '" text-anchor="middle" style="fill:var(--paper);font:700 10px var(--mono);letter-spacing:.12em">' + n[0] + '</text>';
    });
    s += '<circle r="7" style="fill:var(--lime);stroke:var(--ink);stroke-width:2">' + (reduceMotion ? '' :
      '<animateMotion dur="4.5s" repeatCount="indefinite" path="' + d + '"/>') + '</circle>' +
      '<text x="140" y="96" text-anchor="middle" style="fill:var(--ink);font:italic 600 16px var(--display)">1 lap = 1 experiment</text>' +
      '<text x="140" y="116" text-anchor="middle" style="fill:var(--ink-3);font:10px var(--mono)">shorter lap, less waste</text></svg>';
    host.innerHTML = s;
  }

  function chat() {
    var box = $('#bpe-chat');
    if (!box) return;
    var lines = [
      ['them', 'When will my project be done?'],
      ['us', 'From our history, two to six weeks after we start.'],
      ['them', 'So when do you start?'],
      ['us', 'The leadership team decides that. We start when they say go.']
    ];
    var host = $('.chat', box), btn = $('button', box), gun = $('.gun', box);
    var bubbles = lines.map(function (l) {
      var b = el('div', { class: 'bubble ' + l[0] }, l[1]);
      host.appendChild(b);
      return b;
    });
    function play() {
      gun.classList.remove('fired');
      bubbles.forEach(function (b) { b.classList.remove('in'); });
      bubbles.forEach(function (b, i) { setTimeout(function () { b.classList.add('in'); }, reduceMotion ? 0 : 250 + i * 900); });
      setTimeout(function () { gun.classList.add('fired'); }, reduceMotion ? 0 : 250 + lines.length * 900);
    }
    btn.addEventListener('click', play);
    onceVisible(host, 0.6, play);
  }

  function fast() {
    var box = $('#bpe-fast');
    if (!box) return;
    var stage = $('.fast-stage', box), note = $('.fast-note', box), btn = $('button.btn', box);
    var N = 24, SPECIALISTS = [5, 13, 21];
    var work = ['Checkout v2', 'Partner API', 'Build speed', 'Night-shift CRM', 'Noisy logs', 'Onboarding', 'Billing', 'Search'];
    var r = rng(17);
    var people = [];
    for (var i = 0; i < N; i++) {
      var p = el('div', { class: 'person' + (SPECIALISTS.indexOf(i) >= 0 ? ' spec' : '') });
      p.style.left = '50%'; p.style.top = '50%';
      stage.appendChild(p);
      people.push({ node: p, team: -1 });
    }
    var zones = [], mode = 0, meeting = 0, shifted = false;

    function clearZones() { zones.forEach(function (z) { z.remove(); }); zones = []; }
    function zone(b, label, solid) {
      var z = el('div', { class: 'zone' + (solid ? ' solid' : '') }, '<span class="zl">' + label + '</span>');
      z.style.left = b[0] + 'px'; z.style.top = b[1] + 'px'; z.style.width = b[2] + 'px'; z.style.height = b[3] + 'px';
      stage.appendChild(z);
      zones.push(z);
      return z;
    }
    function place(members, b) {
      var x = b[0], y = b[1], w = b[2], h = b[3];
      var cols = Math.max(2, Math.ceil(Math.sqrt(members.length * w / h)));
      var rows = Math.ceil(members.length / cols);
      members.forEach(function (m, k) {
        m.node.style.left = (x + (k % cols + 1) * w / (cols + 1)) + 'px';
        m.node.style.top = (y + 14 + (Math.floor(k / cols) + 1) * (h - 14) / (rows + 1)) + 'px';
      });
    }
    function layout(count) {
      var W = stage.clientWidth, H = stage.clientHeight, cols = W < 520 ? 2 : 3, rows = Math.ceil(count / cols), pad = 14, gap = 14;
      var w = (W - pad * 2 - gap * (cols - 1)) / cols, h = (H - pad * 2 - gap * (rows - 1)) / rows;
      var out = [];
      for (var i = 0; i < count; i++) out.push([pad + (i % cols) * (w + gap), pad + Math.floor(i / cols) * (h + gap) + 4, w, h - 4]);
      return out;
    }

    function clubs(shift) {
      clearZones();
      people.forEach(function (p) { p.node.classList.remove('steward'); });
      var names = ['Club A · legacy', 'Club B · big bet', 'Club C · new market', 'Club D · later'];
      layout(4).forEach(function (b, t) {
        var z = zone(b, names[t], true);
        if (shift && t === 3) { z.classList.add('hot'); z.querySelector('.zl').textContent = 'Club D · now top priority'; }
        var members = people.filter(function (p, i) { return SPECIALISTS.indexOf(i) < 0 && Math.floor(i / 6) === t; });
        if (t < 3) members.push(people[SPECIALISTS[t]]);
        place(members, b);
      });
      note.textContent = shift
        ? 'The priority moved to Club D. Club D has too much work, and the other clubs continue as before. To move people, you need a reorg.'
        : 'Four fixed clubs. Each club shares one part-time specialist, and Club D has none. The clubs seldom talk to each other.';
      btn.textContent = shift ? 'Reset the clubs' : 'Change the priorities';
    }

    function fastMeeting() {
      meeting++;
      clearZones();
      var teamCount = meeting === 1 ? 6 : (r() < 0.5 ? 5 : 6);
      var sizes = [], left = N;
      for (var t = 0; t < teamCount; t++) {
        var remain = teamCount - t - 1;
        var min = Math.max(3, left - remain * 5), max = Math.min(5, left - remain * 3);
        var sz = min + Math.floor(r() * (max - min + 1));
        sizes.push(sz); left -= sz;
      }
      var order = people.slice().sort(function (a, b) { return a.team - b.team; });
      var swaps = 2 + Math.floor(r() * 4);
      for (var s = 0; s < swaps; s++) {
        var i1 = Math.floor(r() * N), i2 = Math.floor(r() * N), tmp = order[i1];
        order[i1] = order[i2]; order[i2] = tmp;
      }
      var boxes = layout(teamCount), idx = 0, moved = 0;
      var picks = work.slice().sort(function () { return r() - 0.5; });
      sizes.forEach(function (sz, t) {
        zone(boxes[t], picks[t], false);
        var members = order.slice(idx, idx + sz);
        idx += sz;
        var steward = members.filter(function (m) { return !m.node.classList.contains('spec'); })[0];
        members.forEach(function (m) {
          if (meeting > 1 && m.team !== t) moved++;
          m.team = t;
          m.node.classList.toggle('steward', m === steward);
        });
        place(members, boxes[t]);
      });
      note.textContent = meeting === 1
        ? 'One collective of 24 people. ' + teamCount + ' stewards took a flag, and the other people selected a group. The meeting took about 15 minutes.'
        : 'Meeting ' + meeting + ': ' + teamCount + ' pace groups for the current priorities. About ' + Math.min(moved, swaps * 2) + ' people changed groups. Specialists go where the work is.';
      btn.textContent = 'Run the next meeting';
    }

    chipGroup($('.chips', box), ['Fixed clubs (Team Topologies)', 'FaST pace groups'], 1, function (k) {
      mode = k;
      shifted = false;
      if (mode === 0) clubs(false);
      else { meeting = 0; people.forEach(function (p, i) { p.team = i % 6; }); fastMeeting(); }
    });
    btn.addEventListener('click', function () {
      if (mode === 0) { shifted = !shifted; clubs(shifted); }
      else fastMeeting();
    });
    var lastW = stage.clientWidth;
    window.addEventListener('resize', function () {
      if (Math.abs(stage.clientWidth - lastW) < 30) return;
      lastW = stage.clientWidth;
      if (mode === 0) clubs(shifted); else { meeting--; fastMeeting(); }
    });
  }

  function trajectory() {
    var box = $('#bpe-traj');
    if (!box) return;
    var svg = $('svg', box), slider = $('#bpe-rate'), splitsBox = $('.splits', box);
    var X0 = 56, X1 = 620, Y0 = 220, Y1 = 20, BASE = 50, STEP = 10, MAX = 200;
    function x(year) { return X0 + (X1 - X0) * year / 5; }
    function y(v) { return Y0 - (Y0 - Y1) * v / MAX; }
    function split(k, g) { return STEP + g * k; }
    function revenue(k, g) { var v = BASE; for (var j = 1; j <= k; j++) v += split(j, g); return v; }
    function draw() {
      var g = +slider.value, s = '';
      for (var v = 0; v <= MAX; v += 50) {
        s += '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + y(v) + '" y2="' + y(v) + '" style="stroke:var(--rule)"/>' +
          '<text x="' + (X0 - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end" style="fill:var(--ink-3);font:10px var(--mono)">$' + v + 'M</text>';
      }
      for (var yr = 0; yr <= 5; yr++) {
        s += '<line x1="' + x(yr) + '" x2="' + x(yr) + '" y1="' + Y0 + '" y2="' + (Y0 + 6) + '" style="stroke:var(--ink-3)"/>' +
          '<text x="' + x(yr) + '" y="' + (Y0 + 20) + '" text-anchor="middle" style="fill:var(--ink-3);font:10px var(--mono)">' + (yr ? 'yr ' + yr : 'start') + '</text>';
      }
      var flat = [], curve = [];
      for (var k = 0; k <= 5; k++) { flat.push(x(k) + ',' + y(revenue(k, 0))); curve.push(x(k) + ',' + y(revenue(k, g))); }
      s += '<path d="M' + curve.join(' L') + ' L' + flat.slice().reverse().join(' L') + ' Z" style="fill:var(--c-profit);opacity:.16"/>';
      s += '<path d="M' + flat.join(' L') + '" style="fill:none;stroke:var(--ink-3);stroke-width:2;stroke-dasharray:5 4"/>';
      s += '<path d="M' + curve.join(' L') + '" style="fill:none;stroke:var(--c-profit);stroke-width:3.5;stroke-linejoin:round"/>';
      for (k = 1; k <= 5; k++) s += '<circle cx="' + x(k) + '" cy="' + y(revenue(k, g)) + '" r="5" style="fill:var(--paper);stroke:var(--c-profit);stroke-width:3"/>';
      s += '<text x="' + (x(5) - 8) + '" y="' + (y(revenue(5, 0)) + 22) + '" text-anchor="end" style="fill:var(--ink-3);font:10px var(--mono)">even pace</text>';
      if (g > 0) s += '<text x="' + (x(5) - 12) + '" y="' + (y(revenue(5, g)) - 4) + '" text-anchor="end" style="fill:var(--c-profit);font:italic 600 15px var(--display)">negative split</text>';
      svg.innerHTML = s;
      var maxSplit = split(5, 5), html = '';
      for (k = 1; k <= 5; k++) {
        html += '<div class="sp"><span class="sp-bar"><i style="height:' + (split(k, g) / maxSplit * 100) + '%"></i></span>' +
          '<b>+$' + split(k, g) + 'M</b><span>split ' + k + '</span></div>';
      }
      html += '<div class="sp-total">Year 5<b>$' + revenue(5, g) + 'M</b><span>vs $' + revenue(5, 0) + 'M</span></div>';
      splitsBox.innerHTML = html;
    }
    slider.addEventListener('input', draw);
    draw();
  }

  [track, term, ladder, coach, muda, race, rewrite, loop, chat, fast, trajectory].forEach(function (fn) {
    try { fn(); } catch (e) { if (window.console) console.error('bpe:', fn.name, e); }
  });
})();
