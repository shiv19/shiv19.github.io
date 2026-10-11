// Home title greeting: the whole line cycles "Hey, I'm Shiva" / "Kia ora, I'm Shiva" /
// "ನಮಸ್ಕಾರ, I'm Shiva". Variants are stacked in one grid cell, so nothing moves:
// the current line fades out (250 ms), then the next fades in (300 ms).
// Reduced motion (or no JS): a static "Hey, I'm Shiva".
(function() {
  var box = document.querySelector('.hero-hello');
  if (!box) return;
  var words = box.querySelectorAll('.hero-hello-word');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0, timer = 0, swapTimer = 0;

  function activate(n) {
    index = n;
    for (var i = 0; i < words.length; i++) words[i].classList.toggle('is-active', i === n);
  }
  function swap(n) {
    clearTimeout(swapTimer);
    words[index].classList.remove('is-active');
    swapTimer = setTimeout(function() { activate(n); }, 270);
  }
  function stop() {
    clearInterval(timer); clearTimeout(swapTimer);
    box.classList.remove('is-cycling');
    activate(0);
  }
  function start() {
    stop();
    if (motion.matches || words.length < 2) return;
    box.classList.add('is-cycling');
    timer = setInterval(function() { if (!document.hidden) swap((index + 1) % words.length); }, 4000);
  }
  start();
  if (motion.addEventListener) motion.addEventListener('change', start);
})();
