/**
 * Holiday Mode - Festive snowfall effect
 * Supports both light and dark themes
 *
 * Auto-enabled from Dec 20 to Jan 5 every year
 * To force on/off, set HOLIDAY_MODE_OVERRIDE to true or false
 */
const HOLIDAY_MODE_OVERRIDE = null; // Set to true/false to override auto dates

function isHolidaySeason() {
  if (HOLIDAY_MODE_OVERRIDE !== null) return HOLIDAY_MODE_OVERRIDE;

  const now = new Date();
  const month = now.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  const day = now.getDate();

  // Dec 20 - Dec 31 OR Jan 1 - Jan 5
  return (month === 11 && day >= 20) || (month === 0 && day <= 5);
}

(function() {
  if (!isHolidaySeason()) return;

  // Add holiday class to body for CSS styling
  document.documentElement.classList.add('holiday-mode');

  // Snowflake configuration
  const SNOWFLAKE_COUNT = 50;
  const SNOWFLAKES = ['*', '*', '*', '*'];

  // Create snowfall container
  const snowContainer = document.createElement('div');
  snowContainer.className = 'snowfall';
  snowContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(snowContainer);

  // Generate snowflakes
  for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    createSnowflake();
  }

  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = SNOWFLAKES[Math.floor(Math.random() * SNOWFLAKES.length)];

    // Randomize properties
    const startX = Math.random() * 100;
    const duration = 8 + Math.random() * 12; // 8-20 seconds
    const delay = Math.random() * -20; // Start at different times
    const size = 0.6 + Math.random() * 1; // 0.6-1.6em
    const opacity = 0.4 + Math.random() * 0.6; // 0.4-1.0

    snowflake.style.cssText = `
      left: ${startX}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      font-size: ${size}em;
      opacity: ${opacity};
    `;

    snowContainer.appendChild(snowflake);
  }
})();
