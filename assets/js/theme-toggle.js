// Theme toggling logic

(function() {
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initial load
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    // If no stored theme, we don't set attribute and let CSS media query handle it.
    // BUT, for the toggle button to know the current state, we might want to set it explicitly or derive it.
    // Let's set it explicitly to avoid ambiguity.
    setTheme(systemPrefersDark ? 'dark' : 'light');
  }

  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
})();
