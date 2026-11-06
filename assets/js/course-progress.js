// Reading progress as a marathon: a runner moves along the header's course
// line as the reader scrolls through the post. Once the header leaves the
// screen, a slim copy of the course pins to the top of the viewport.
(function() {
  var course = document.querySelector('.page-hero-course[data-runner]');
  var article = document.querySelector('.post-content');
  if (!course || !article) return;

  var MARATHON_KM = 42.195;
  var VIEW_W = 1000, VIEW_H = 72;
  var line = course.querySelector('.course-line');
  var lineD = line.getAttribute('d');

  var profile = (function sample() {
    var len = line.getTotalLength(), pts = [];
    for (var i = 0; i <= 500; i++) pts.push(line.getPointAtLength(len * i / 500));
    return pts;
  })();

  function yAt(x) {
    for (var i = 1; i < profile.length; i++) {
      var a = profile[i - 1], b = profile[i];
      if (b.x >= x) return a.y + (b.y - a.y) * ((x - a.x) / ((b.x - a.x) || 1));
    }
    return profile[profile.length - 1].y;
  }

  var mini = document.createElement('div');
  mini.className = 'course-mini';
  mini.setAttribute('aria-hidden', 'true');
  mini.innerHTML =
    '<svg viewBox="0 0 ' + VIEW_W + ' ' + VIEW_H + '" preserveAspectRatio="none" focusable="false">' +
      '<defs><clipPath id="course-done-mini" clipPathUnits="userSpaceOnUse"><rect class="course-done-rect" width="0" height="' + VIEW_H + '"/></clipPath></defs>' +
      '<path class="course-line" d="' + lineD + '" vector-effect="non-scaling-stroke"/>' +
      '<path class="course-line course-line--done" d="' + lineD + '" clip-path="url(#course-done-mini)" vector-effect="non-scaling-stroke"/>' +
    '</svg>' +
    '<span class="course-runner"><span class="course-runner-km"></span></span>';
  document.body.appendChild(mini);

  var tracks = [course, mini].map(function(host) {
    return {
      host: host,
      svg: host.querySelector('svg'),
      rect: host.querySelector('.course-done-rect'),
      runner: host.querySelector('.course-runner'),
      label: host.querySelector('.course-runner-km')
    };
  });

  function progress() {
    var r = article.getBoundingClientRect();
    var p = (window.innerHeight * 0.5 - r.top) / r.height;
    return Math.min(1, Math.max(0, p));
  }

  function place(t, p) {
    var w = t.svg.clientWidth, h = t.svg.clientHeight;
    var x = Math.min(w - 8, Math.max(8, p * w));
    t.rect.setAttribute('width', p * VIEW_W);
    t.runner.style.transform = 'translate(' + x + 'px,' + (yAt(x / w * VIEW_W) / VIEW_H * h) + 'px)';
    t.label.textContent = p >= 0.995 ? 'Finish!' : 'km ' + (p * MARATHON_KM).toFixed(1);
    t.host.classList.toggle('is-finished', p >= 0.995);
    t.host.classList.toggle('is-late', p > 0.82);
  }

  var queued = false;
  function update() {
    queued = false;
    var p = progress();
    tracks.forEach(function(t) { place(t, p); });
    mini.classList.toggle('is-visible', course.getBoundingClientRect().bottom < 0);
  }
  function request() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  course.classList.add('is-live');
  update();
})();
