// Site wallpaper: an 880px tile of tiny Barnsley ferns (Aotearoa) and a mixed
// family of rangoli (Karnataka: chukki, sikku, flower, star, lotus), drawn once
// into an offscreen canvas and used as the background of a fixed layer.
// Placement is seeded, so every page and every load gets the same tile.
// Colours come from the theme; a theme toggle re-renders the tile.
// Hidden under prefers-contrast: more (CSS).
(function() {
  var TILE = 880;
  var layer = document.createElement('div');
  layer.className = 'site-wallpaper';
  layer.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(layer, document.body.firstChild);

  function mulberry32(seed) {
    return function() {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Mirror curve around an n x n dot grid. Dots sit at odd lattice points
  // (doubled coordinates); the line runs diagonally between edge midpoints
  // and reflects off the border and off internal "mirrors". Mirrors are
  // chosen (4-fold symmetric when possible) until exactly `target` closed
  // lines remain: 1 for a chukki kolam, 2 or 3 for an interlaced sikku.
  function buildMirrorCurve(n, rand, target, flips) {
    var N2 = 2 * n, mirrors = {};
    var key = function(x, y) { return x + ',' + y; };
    var isMirror = function(x, y) {
      if (x % 2 === 0 && (x === 0 || x === N2)) return true;
      if (y % 2 === 0 && (y === 0 || y === N2)) return true;
      return !!mirrors[key(x, y)];
    };

    // Follow the line from (px,py) heading (dx,dy) until it closes; mark segments seen.
    function trace(px, py, dx, dy, seen) {
      var pts = [[px, py]], x = px, y = py, sdx = dx, sdy = dy;
      for (var guard = 0; guard < 10000; guard++) {
        seen[key(2 * x + dx, 2 * y + dy)] = true;
        x += dx; y += dy;
        if (isMirror(x, y)) { if (x % 2 === 0) dx = -dx; else dy = -dy; }
        if (x === px && y === py && dx === sdx && dy === sdy) break;
        pts.push([x, y]);
      }
      return pts;
    }
    // All separate closed lines.
    function loops() {
      var seen = {}, out = [];
      var dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (var x = 0; x <= N2; x++) {
        for (var y = 0; y <= N2; y++) {
          if ((x + y) % 2 === 0) continue;
          for (var d = 0; d < 4; d++) {
            var dx = dirs[d][0], dy = dirs[d][1];
            var qx = x + dx, qy = y + dy;
            if (qx < 0 || qy < 0 || qx > N2 || qy > N2) continue;
            if (seen[key(2 * x + dx, 2 * y + dy)]) continue;
            out.push(trace(x, y, dx, dy, seen));
          }
        }
      }
      return out;
    }

    // Interior edge midpoints, grouped into 4-fold rotational orbits.
    var interior = [], orbitSeen = {};
    for (var x = 1; x < N2; x++) {
      for (var y = 1; y < N2; y++) {
        if ((x + y) % 2 === 0) continue;
        if (orbitSeen[key(x, y)]) continue;
        var orbit = [], cx = x, cy = y;
        for (var r = 0; r < 4; r++) {
          var kk = key(cx, cy);
          if (!orbitSeen[kk]) { orbitSeen[kk] = true; orbit.push([cx, cy]); }
          var t = cx; cx = N2 - cy; cy = t;
        }
        interior.push(orbit);
      }
    }
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function toggle(group) {
      group.forEach(function(p) {
        var k = key(p[0], p[1]);
        if (mirrors[k]) delete mirrors[k]; else mirrors[k] = true;
      });
    }
    function reduce(groups) {
      var best = loops().length;
      for (var pass = 0; pass < 4 && best > target; pass++) {
        shuffle(groups).forEach(function(g) {
          if (best <= target) return;
          toggle(g);
          var c = loops().length;
          if (c < best && c >= target) best = c; else toggle(g);
        });
      }
      return best;
    }

    var groups = interior.slice();
    if (reduce(groups) !== target) {
      groups = [];
      interior.forEach(function(o) { o.forEach(function(p) { groups.push([p]); }); });
      reduce(groups);
    }
    // Vary the route: flip more mirrors that keep the same number of lines.
    var want = loops().length, extra = 0;
    shuffle(groups).forEach(function(g) {
      if (extra >= flips || rand() < 0.35) return;
      toggle(g);
      if (loops().length === want) extra++; else toggle(g);
    });
    return {
      n: n,
      loops: loops(),
      crossing: function(x, y) { return x > 0 && y > 0 && x < N2 && y < N2 && !isMirror(x, y); }
    };
  }

  // ---------- Rangoli family ----------
  // Every generator returns { paths: [{ pts, closed }], dots: [[x, y, rPx]] }
  // in unit coordinates (about -0.5..0.5); drawMotif scales, rotates and wraps.

  function pol(r, a) { return [r * Math.cos(a), r * Math.sin(a)]; }
  function quadPts(p0, c, p1, steps, out, from, to) {
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      if (t < from || t > to) continue;
      var u = 1 - t;
      out.push([u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
                u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]);
    }
    return out;
  }
  function circlePts(r, cx, cy, steps) {
    var out = [];
    for (var i = 0; i < steps; i++) out.push([cx + r * Math.cos(i / steps * Math.PI * 2), cy + r * Math.sin(i / steps * Math.PI * 2)]);
    return out;
  }
  function gridDots(n, rPx) {
    var dots = [];
    for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) dots.push([(2 * i + 1) / (2 * n) - 0.5, (2 * j + 1) / (2 * n) - 0.5, rPx]);
    return dots;
  }

  // Smooth a mirror-curve loop (quadratic from midpoint to midpoint, vertex as
  // control). With `weave`, the under-strand at each crossing gets a short gap.
  function curvePaths(mc, weave) {
    var n2 = 2 * mc.n, paths = [];
    var U = function(p) { return [p[0] / n2 - 0.5, p[1] / n2 - 0.5]; };
    mc.loops.forEach(function(loop) {
      var L = loop.length, pieces = [], cur = [];
      for (var i = 0; i < L; i++) {
        var a = loop[(i - 1 + L) % L], v = loop[i], c = loop[(i + 1) % L];
        var A = U(a), B = U(v), C = U(c);
        var m0 = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], m1 = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
        var under = false;
        if (weave && mc.crossing(v[0], v[1])) {
          var dx = v[0] - a[0], dy = v[1] - a[1];
          // Checkerboard rule: along any strand, crossings alternate over/under.
          under = (dx === dy) !== (v[0] % 2 === 0);
        }
        if (under) {
          quadPts(m0, B, m1, 10, cur, 0, 0.28);
          pieces.push(cur);
          cur = quadPts(m0, B, m1, 10, [], 0.72, 1);
        } else {
          if (cur.length) cur.pop();
          quadPts(m0, B, m1, 6, cur, 0, 1);
        }
      }
      if (!pieces.length) { paths.push({ pts: cur, closed: true }); return; }
      pieces[0] = cur.concat(pieces[0]);
      pieces.forEach(function(p) { paths.push({ pts: p, closed: false }); });
    });
    return paths;
  }

  // 1. Chukki kolam: one unbroken line looping around a 3x3..5x5 dot grid.
  function chukki(rand) {
    var n = 3 + Math.floor(rand() * 3);
    var mc = buildMirrorCurve(n, rand, 1, n * n);
    return { paths: curvePaths(mc, false), dots: gridDots(n, 1.1) };
  }

  // 2. Sikku kolam: two or three closed lines weaving over and under each
  // other on a diagonal dot grid.
  function sikku(rand) {
    var n = 3 + Math.floor(rand() * 2);
    var mc = buildMirrorCurve(n, rand, 2 + Math.floor(rand() * 2), 2);
    var m = { paths: curvePaths(mc, true), dots: gridDots(n, 1.1) };
    m.baseRot = Math.PI / 4; // diamond orientation
    return m;
  }

  // 3. Flower rangoli: 6 or 8 two-arc petals round a centre, inner dot ring,
  // sometimes an outer ring with dots between the petal tips.
  function flower(rand) {
    var petals = rand() < 0.5 ? 6 : 8, ring = rand() < 0.5;
    var r0 = 0.13, r1 = ring ? 0.38 : 0.46, w = Math.PI / petals * 0.78;
    var paths = [], dots = [[0, 0, 1.3]];
    for (var i = 0; i < petals; i++) {
      var a = i / petals * Math.PI * 2, pts = [];
      quadPts(pol(r0, a - w), pol(r1 * 0.78, a - w * 1.05), pol(r1, a), 10, pts, 0, 1);
      pts.pop();
      quadPts(pol(r1, a), pol(r1 * 0.78, a + w * 1.05), pol(r0, a + w), 10, pts, 0, 1);
      paths.push({ pts: pts, closed: false });
      dots.push(pol(r0 + 0.09, a).concat(0.9));
      if (ring) dots.push(pol(r1 + 0.02, a + Math.PI / petals).concat(1));
    }
    paths.push({ pts: circlePts(r0 * 0.62, 0, 0, 24), closed: true });
    if (ring) paths.push({ pts: circlePts(0.48, 0, 0, 56), closed: true });
    return { paths: paths, dots: dots };
  }

  // 4. Star rangoli: an 8-point star from two rotated squares, with a small
  // concentric motif inside (a ring or an octagon).
  function star(rand) {
    var R = 0.47, paths = [], dots = [[0, 0, 1.2]];
    rand(); // keeps the seeded sequence (and so the tile layout) stable
    for (var k = 0; k < 2; k++) {
      var pts = [], off = k * Math.PI / 4 - Math.PI / 2;
      for (var i = 0; i < 4; i++) pts.push(pol(R, off + i / 4 * Math.PI * 2));
      paths.push({ pts: pts, closed: true });
    }
    if (rand() < 0.5) {
      paths.push({ pts: circlePts(0.15, 0, 0, 28), closed: true });
    } else {
      var inner = [];
      for (var j = 0; j < 8; j++) inner.push(pol(0.17, j / 8 * Math.PI * 2 + Math.PI / 8));
      paths.push({ pts: inner, closed: true });
    }
    for (var t = 0; t < 8; t++) dots.push(pol(0.27, t / 8 * Math.PI * 2 - Math.PI / 2 + Math.PI / 8).concat(0.9));
    return { paths: paths, dots: dots };
  }

  // 5. Lotus: five to seven pointed petals fanning from a base arc.
  function lotus(rand) {
    var count = 5 + Math.floor(rand() * 3), spread = 1.0, paths = [], dots = [];
    var baseY = 0.26, hw = 0.075;
    // Side petals first, centre petal last, as it would be drawn by hand.
    var order = [];
    for (var i = 0; i < count; i++) order.push(i);
    order.sort(function(p, q) { return Math.abs(q - (count - 1) / 2) - Math.abs(p - (count - 1) / 2); });
    order.forEach(function(i) {
      var th = -spread + (2 * spread) * i / (count - 1);
      var len = 0.58 * (1 - 0.38 * Math.abs(th) / spread);
      var dir = [Math.sin(th), -Math.cos(th)], perp = [Math.cos(th), Math.sin(th)];
      var base = [Math.sin(th) * 0.3, baseY - Math.abs(Math.sin(th)) * 0.04];
      var tip = [base[0] + dir[0] * len, base[1] + dir[1] * len];
      var b0 = [base[0] - perp[0] * hw, base[1] - perp[1] * hw], b1 = [base[0] + perp[0] * hw, base[1] + perp[1] * hw];
      var c0 = [base[0] + dir[0] * len * 0.55 - perp[0] * hw * 1.9, base[1] + dir[1] * len * 0.55 - perp[1] * hw * 1.9];
      var c1 = [base[0] + dir[0] * len * 0.55 + perp[0] * hw * 1.9, base[1] + dir[1] * len * 0.55 + perp[1] * hw * 1.9];
      var pts = [];
      quadPts(b0, c0, tip, 10, pts, 0, 1);
      pts.pop();
      quadPts(tip, c1, b1, 10, pts, 0, 1);
      paths.push({ pts: pts, closed: false });
    });
    paths.push({ pts: quadPts([-0.42, baseY - 0.02], [0, baseY + 0.2], [0.42, baseY - 0.02], 16, [], 0, 1), closed: false });
    for (var d = -1; d <= 1; d++) dots.push([d * 0.12, baseY + 0.17 - Math.abs(d) * 0.03, 1]);
    return { paths: paths, dots: dots };
  }

  var RANGOLI = { chukki: chukki, sikku: sikku, flower: flower, star: star, lotus: lotus };
  var RANGOLI_SIZE = { chukki: [48, 64], sikku: [48, 60], flower: [52, 66], star: [46, 58], lotus: [54, 68] };

  // Barnsley fern IFS, plotted with wrap-around so fronds cross tile seams cleanly.
  function drawFern(ctx, rand, f, dot) {
    var cos = Math.cos(f.rot), sin = Math.sin(f.rot);
    var scale = f.h / 10, x = 0, y = 0;
    for (var i = 0; i < f.points; i++) {
      var r = rand(), nx, ny;
      if (r < 0.01) { nx = 0; ny = 0.16 * y; }
      else if (r < 0.86) { nx = 0.85 * x + 0.04 * y; ny = -0.04 * x + 0.85 * y + 1.6; }
      else if (r < 0.93) { nx = 0.2 * x - 0.26 * y; ny = 0.23 * x + 0.22 * y + 1.6; }
      else { nx = -0.15 * x + 0.28 * y; ny = 0.26 * x + 0.24 * y + 0.44; }
      x = nx; y = ny;
      if (i < 10) continue;
      // Centre the frond (IFS centre ~ (0.24, 5)); canvas y points down.
      var fx = (x - 0.24) * scale * (f.flip ? -1 : 1), fy = -(y - 5) * scale;
      var px = f.x + fx * cos - fy * sin, py = f.y + fx * sin + fy * cos;
      px = ((px % TILE) + TILE) % TILE;
      py = ((py % TILE) + TILE) % TILE;
      ctx.fillRect(px, py, dot, dot);
    }
  }

  // Stroke a rangoli motif at its place, wrapped across the tile edges.
  function drawMotif(ctx, m, ink) {
    var cos = Math.cos(m.rot), sin = Math.sin(m.rot), S = m.size;
    function P(p) { var lx = p[0] * S, ly = p[1] * S; return [m.x + lx * cos - ly * sin, m.y + lx * sin + ly * cos]; }
    var paths = m.shape.paths.map(function(path) { return { pts: path.pts.map(P), closed: path.closed }; });
    var dots = m.shape.dots.map(function(d) { return P(d).concat(d[2]); });
    ctx.fillStyle = ink;
    for (var ox = -TILE; ox <= TILE; ox += TILE) {
      for (var oy = -TILE; oy <= TILE; oy += TILE) {
        if (m.x + ox + S < 0 || m.x + ox - S > TILE || m.y + oy + S < 0 || m.y + oy - S > TILE) continue;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.beginPath();
        paths.forEach(function(path) {
          path.pts.forEach(function(p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); });
          if (path.closed) ctx.closePath();
        });
        ctx.stroke();
        dots.forEach(function(d) {
          ctx.beginPath();
          ctx.arc(d[0], d[1], d[2], 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    }
  }

  // Seeded scatter: dart-throwing on the torus so no two motifs crowd each
  // other, even across tile seams. Large fronds go first, then small ones.
  var rand = mulberry32(19);
  var placed = [];
  function place(radius) {
    for (var tries = 0; tries < 400; tries++) {
      var x = rand() * TILE, y = rand() * TILE, ok = true;
      for (var i = 0; i < placed.length && ok; i++) {
        var dx = Math.abs(x - placed[i].x), dy = Math.abs(y - placed[i].y);
        dx = Math.min(dx, TILE - dx); dy = Math.min(dy, TILE - dy);
        ok = Math.sqrt(dx * dx + dy * dy) > radius + placed[i].r + 34;
      }
      if (ok) { placed.push({ x: x, y: y, r: radius }); return placed[placed.length - 1]; }
    }
    return null;
  }

  var FERNS = [], KOLAMS = [];
  function addFern(h) {
    var spot = place(h * 0.5);
    if (!spot) return;
    FERNS.push({ x: spot.x, y: spot.y, h: h, rot: rand() * Math.PI * 2, flip: rand() < 0.5,
                 points: Math.round(h * h * 0.42 * (0.9 + rand() * 0.2)) });
  }
  function addRangoli(kind) {
    var range = RANGOLI_SIZE[kind], size = range[0] + rand() * (range[1] - range[0]);
    var spot = place(size * 0.62);
    if (!spot) return;
    var shape = RANGOLI[kind](rand);
    KOLAMS.push({ kind: kind, x: spot.x, y: spot.y, size: size, shape: shape,
                  rot: (shape.baseRot || 0) + rand() * Math.PI * 2 });
  }

  // Two large fronds first, then small fronds and rangoli alternate so
  // neither kind clusters. Every rangoli type appears at least once.
  var kinds = ['chukki', 'sikku', 'flower', 'star', 'lotus'];
  kinds = kinds.concat(kinds[Math.floor(rand() * 5)], kinds[Math.floor(rand() * 5)]);
  var smallFerns = [74, 66, 60, 56, 52, 48, 44, 40];
  addFern(128);
  addFern(112);
  for (var q = 0; q < Math.max(kinds.length, smallFerns.length); q++) {
    if (q < kinds.length) addRangoli(kinds[q]);
    if (q < smallFerns.length) addFern(smallFerns[q]);
  }

  var url = null, canvas = document.createElement('canvas');

  function render() {
    var css = getComputedStyle(document.documentElement);
    var fernInk = css.getPropertyValue('--wallpaper-fern').trim() || '#4f6f55';
    var kolamInk = css.getPropertyValue('--wallpaper-kolam').trim() || '#9b6a3a';
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = Math.round(TILE * dpr);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, TILE, TILE);

    var dot = Math.max(1, 1.1 * dpr) / dpr;
    ctx.fillStyle = fernInk;
    FERNS.forEach(function(f, i) { drawFern(ctx, mulberry32(101 + i), f, dot); });

    ctx.strokeStyle = kolamInk;
    ctx.lineWidth = 1.3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    KOLAMS.forEach(function(k) { drawMotif(ctx, k, kolamInk); });

    canvas.toBlob(function(blob) {
      if (!blob) return;
      var next = URL.createObjectURL(blob);
      layer.style.backgroundImage = 'url("' + next + '")';
      layer.classList.add('is-ready');
      if (url) URL.revokeObjectURL(url);
      url = next;
    });
  }

  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  var dark = window.matchMedia('(prefers-color-scheme: dark)');
  if (dark.addEventListener) dark.addEventListener('change', render);
})();
