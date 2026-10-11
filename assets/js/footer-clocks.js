// Footer clocks: local time in Auckland and Bengaluru, refreshed each minute.
// The block stays hidden unless this script runs, so no stale times show without JS.
(function() {
  var root = document.getElementById('js-footer-roots');
  if (!root || typeof Intl === 'undefined' || !Intl.DateTimeFormat) return;

  var clocks = Array.prototype.slice.call(root.querySelectorAll('time[data-tz]')).map(function(el) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-NZ', {
        timeZone: el.getAttribute('data-tz'),
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return null;
    }
    return { el: el, fmt: fmt };
  });

  if (clocks.some(function(c) { return !c; })) return;

  function format(fmt, date) {
    var hour = '', minute = '', period = '';
    fmt.formatToParts(date).forEach(function(part) {
      if (part.type === 'hour') hour = part.value;
      else if (part.type === 'minute') minute = part.value;
      else if (part.type === 'dayPeriod') period = part.value.toLowerCase().replace(/\./g, '');
    });
    return hour + ':' + minute + (period ? ' ' + period : '');
  }

  function render() {
    var now = new Date();
    clocks.forEach(function(c) {
      c.el.textContent = format(c.fmt, now);
      c.el.setAttribute('datetime', now.toISOString());
    });
    // Re-render just after the next minute boundary.
    setTimeout(render, 60000 - (now.getTime() % 60000) + 50);
  }

  render();
  root.hidden = false;
})();
