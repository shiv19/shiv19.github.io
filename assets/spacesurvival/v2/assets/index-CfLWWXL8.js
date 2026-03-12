const SAVE_KEY = "space-survival-meta-v1";
const TARGET_SURVIVAL_MS = 3 * 60 * 1000;
const UPGRADE_CAPS = {
  ammo: 3,
  reload: 4,
  hull: 2,
};
const root = document.getElementById("root");

const state = {
  running: false,
  gameOver: false,
  survivalMs: 0,
  score: 0,
  kills: 0,
  gameOverTitle: "Drifted Into Trouble",
  gameOverMessage: "The asteroid belt won the first round.",
  overlayMode: "intro",
  startedAt: 0,
  lastFrame: 0,
  lastPatternAt: 0,
  pointerActive: false,
  touchId: null,
  canvasWidth: 1280,
  canvasHeight: 720,
  viewportWidth: 1280,
  viewportHeight: 720,
  stars: [],
  particles: [],
  hazards: [],
  bullets: [],
  keys: Object.create(null),
  touchControls: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  meta: loadMeta(),
  run: createRunState(),
  audio: {
    musicEnabled: true,
    sfxEnabled: true,
    initialized: false,
    musicStarted: false,
    music: null,
    fire: null,
    hit: [],
  },
  player: createPlayer(),
};

function createRunState() {
  return {
    bankedCreditsThisRun: 0,
    victory: false,
  };
}

function createDefaultMeta() {
  return {
    credits: 0,
    bestScore: 0,
    bestSurvivalMs: 0,
    totalAttempts: 0,
    attemptsSinceLastClear: 0,
    clears: 0,
    upgrades: {
      ammo: 0,
      reload: 0,
      hull: 0,
    },
  };
}

function loadMeta() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) {
      return createDefaultMeta();
    }
    const parsed = JSON.parse(raw);
    return {
      credits: Number(parsed.credits) || 0,
      bestScore: Number(parsed.bestScore) || 0,
      bestSurvivalMs: Number(parsed.bestSurvivalMs) || 0,
      totalAttempts: Number(parsed.totalAttempts) || 0,
      attemptsSinceLastClear: Number(parsed.attemptsSinceLastClear) || 0,
      clears: Number(parsed.clears) || 0,
      upgrades: {
        ammo: Number(parsed.upgrades?.ammo) || 0,
        reload: Number(parsed.upgrades?.reload) || 0,
        hull: Number(parsed.upgrades?.hull) || 0,
      },
    };
  } catch (error) {
    return createDefaultMeta();
  }
}

function saveMeta() {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state.meta));
  } catch (error) {
    // Ignore persistence failures and keep the current session playable.
  }
}

function createPlayer() {
  return {
    x: 640,
    y: 360,
    vx: 0,
    vy: 0,
    radius: 18,
    angle: 0,
    thrustGlow: 0,
    ammo: 5,
    maxAmmo: 5,
    ammoRechargeMs: 2200,
    lastAmmoTickAt: 0,
    fireCooldownMs: 180,
    lastShotAt: 0,
    shields: 0,
    invulnerableUntil: 0,
  };
}

root.innerHTML = `
  <main class="space-shell">
    <section class="space-stage">
      <canvas class="space-canvas" aria-label="Space Survival game"></canvas>
      <div class="hud">
        <div class="hud-chip hud-chip--drift"><span>Drift</span><strong id="time-readout">0.0s</strong></div>
        <div class="hud-chip hud-chip--goal"><span>Goal</span><strong id="target-readout">3:00.0</strong></div>
        <div class="hud-chip hud-chip--score"><span>Score</span><strong id="score-readout">0</strong></div>
        <div class="hud-chip hud-chip--charges"><span>Charges</span><strong id="ammo-readout">5 / 5</strong></div>
        <div class="hud-chip hud-chip--wards hud-chip--icon" aria-label="Wards"><span>Wards</span><strong id="shield-readout">0</strong></div>
        <button class="hud-chip hud-button hud-chip--music hud-chip--icon" id="music-toggle" type="button" aria-label="Music"><span>Lo-Fi</span><strong>On</strong></button>
        <button class="hud-chip hud-button hud-chip--fx hud-chip--icon" id="sfx-toggle" type="button" aria-label="Sound effects"><span>FX</span><strong>On</strong></button>
      </div>
      <div class="controls-note" id="controls-note">Drift with WASD or arrows. Tap space to spark a shot. Charges return on their own.</div>
      <div class="touch-controls" aria-hidden="true">
        <div class="dpad">
          <button class="touch-key touch-key--up" id="touch-up" type="button">↑</button>
          <button class="touch-key touch-key--left" id="touch-left" type="button">←</button>
          <button class="touch-key touch-key--right" id="touch-right" type="button">→</button>
          <button class="touch-key touch-key--down" id="touch-down" type="button">↓</button>
        </div>
        <button class="touch-fire" id="touch-fire" type="button">Fire</button>
      </div>
      <div class="overlay" id="overlay">
        <div class="overlay-card">
          <p class="eyebrow">Space Survival // Drift Archive</p>
          <h1 id="overlay-title">Asteroid Ballet</h1>
          <p class="overlay-score" id="overlay-score"></p>
          <p id="overlay-message">Dodge through shifting patterns and see how long you can last.</p>
          <div class="overlay-stats" id="overlay-stats"></div>
          <div class="overlay-bank" id="overlay-bank"></div>
          <div class="overlay-actions">
            <button class="primary-button" id="start-button" type="button">Start Run</button>
            <button class="secondary-button" id="secondary-button" type="button" hidden></button>
          </div>
          <div class="shop-grid" id="shop-grid" hidden>
            <button class="shop-button" id="revive-button" type="button"></button>
            <button class="shop-button" id="ammo-upgrade-button" type="button"></button>
            <button class="shop-button" id="reload-upgrade-button" type="button"></button>
            <button class="shop-button" id="hull-upgrade-button" type="button"></button>
          </div>
          <p class="hint">Press space to start or restart.</p>
        </div>
      </div>
    </section>
  </main>
`;

const canvas = root.querySelector(".space-canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayScore = document.getElementById("overlay-score");
const overlayMessage = document.getElementById("overlay-message");
const overlayStats = document.getElementById("overlay-stats");
const overlayBank = document.getElementById("overlay-bank");
const startButton = document.getElementById("start-button");
const secondaryButton = document.getElementById("secondary-button");
const timeReadout = document.getElementById("time-readout");
const targetReadout = document.getElementById("target-readout");
const scoreReadout = document.getElementById("score-readout");
const ammoReadout = document.getElementById("ammo-readout");
const shieldReadout = document.getElementById("shield-readout");
const controlsNote = document.getElementById("controls-note");
const musicToggle = document.getElementById("music-toggle");
const sfxToggle = document.getElementById("sfx-toggle");
const shopGrid = document.getElementById("shop-grid");
const touchUpButton = document.getElementById("touch-up");
const touchLeftButton = document.getElementById("touch-left");
const touchRightButton = document.getElementById("touch-right");
const touchDownButton = document.getElementById("touch-down");
const touchFireButton = document.getElementById("touch-fire");
const reviveButton = document.getElementById("revive-button");
const ammoUpgradeButton = document.getElementById("ammo-upgrade-button");
const reloadUpgradeButton = document.getElementById("reload-upgrade-button");
const hullUpgradeButton = document.getElementById("hull-upgrade-button");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatTime(ms) {
  const totalSeconds = ms / 1000;
  if (totalSeconds < 60) {
    return `${totalSeconds.toFixed(1)}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toFixed(1).padStart(4, "0")}`;
}

function formatDust(amount) {
  return `${amount} stardust`;
}

function getUpgradeCopy(type) {
  return {
    ammo: {
      name: "Split Chamber",
      description: "Hold one extra charge in the chamber.",
    },
    reload: {
      name: "Pulse Recycler",
      description: "Return charges 10% faster.",
    },
    hull: {
      name: "Drift Shell",
      description: "Begin each run with one more ward.",
    },
  }[type];
}

function getBuildSummary() {
  return `${state.meta.upgrades.ammo} Split Chamber • ${state.meta.upgrades.reload} Pulse Recycler • ${state.meta.upgrades.hull} Drift Shell`;
}

function renderShopItem(icon, label, price, description) {
  return `<span class="shop-crest shop-crest--${icon}" aria-hidden="true"></span><span class="shop-copy"><span>${label}</span><strong>${price}</strong><small>${description}</small></span>`;
}

function createAudioAsset(baseName) {
  const probe = document.createElement("audio");
  const prefersOgg = typeof probe.canPlayType === "function" && probe.canPlayType('audio/ogg; codecs="vorbis"') !== "";
  const extension = prefersOgg ? "ogg" : "mp3";
  return new Audio(`audio/${baseName}.${extension}`);
}

function initAudio() {
  if (state.audio.initialized) {
    return;
  }

  state.audio.music = createAudioAsset("lofi-loop");
  state.audio.music.loop = true;
  state.audio.music.volume = 0.22;
  state.audio.music.muted = !state.audio.musicEnabled;
  state.audio.music.preload = "auto";

  state.audio.fire = createAudioAsset("laser-fire");
  state.audio.fire.volume = 0.18;
  state.audio.fire.preload = "auto";

  state.audio.hit = [
    createAudioAsset("asteroid-hit"),
    createAudioAsset("asteroid-hit-crunch"),
  ];
  state.audio.hit[0].volume = 0.22;
  state.audio.hit[1].volume = 0.16;
  state.audio.hit[0].preload = "auto";
  state.audio.hit[1].preload = "auto";

  state.audio.initialized = true;
}

function updateAudioToggles() {
  musicToggle.querySelector("strong").textContent = state.audio.musicEnabled ? "On" : "Muted";
  sfxToggle.querySelector("strong").textContent = state.audio.sfxEnabled ? "On" : "Muted";
}

function syncMusicPlayback() {
  if (!state.audio.initialized) {
    return;
  }
  state.audio.music.muted = !state.audio.musicEnabled;
  if (!state.audio.musicStarted) {
    state.audio.music.play().then(() => {
      state.audio.musicStarted = true;
      state.audio.music.muted = !state.audio.musicEnabled;
    }).catch(() => {});
  }
}

function playSound(effectName) {
  if (!state.audio.sfxEnabled) {
    return;
  }
  initAudio();
  const source = state.audio[effectName];
  if (!source) {
    return;
  }
  if (Array.isArray(source)) {
    for (const clip of source) {
      const instance = clip.cloneNode();
      instance.volume = clip.volume;
      instance.play().catch(() => {});
    }
    return;
  }
  const instance = source.cloneNode();
  instance.volume = source.volume;
  instance.play().catch(() => {});
}

function upgradeCost(type) {
  const level = state.meta.upgrades[type];
  if (level >= UPGRADE_CAPS[type]) {
    return null;
  }
  const costs = {
    ammo: 160 + level * 130,
    reload: 190 + level * 150,
    hull: 240 + level * 180,
  };
  return costs[type];
}

function reviveCost() {
  return 220;
}

function runCreditsEarned() {
  return state.score + Math.floor(state.survivalMs / 1000) * 3 + state.kills * 2;
}

function updateHud() {
  timeReadout.textContent = formatTime(state.survivalMs);
  targetReadout.textContent = formatTime(TARGET_SURVIVAL_MS);
  scoreReadout.textContent = `${state.score}`;
  ammoReadout.textContent = `${state.player.ammo} / ${state.player.maxAmmo}`;
  shieldReadout.textContent = `${state.player.shields}`;
}

function updateControlsHint() {
  const mobile = window.matchMedia("(max-width: 1100px)").matches;
  controlsNote.textContent = mobile
    ? "Use the drift pad to weave and tap Spark to fire. Charges return on their own."
    : "Drift with WASD or arrows. Tap space to spark a shot. Charges return on their own.";
}

function setTouchControl(direction, pressed) {
  state.touchControls[direction] = pressed;
}

function bindTouchDirection(button, direction) {
  const start = (event) => {
    event.preventDefault();
    setTouchControl(direction, true);
  };
  const end = (event) => {
    event.preventDefault();
    setTouchControl(direction, false);
  };

  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", end);
  button.addEventListener("pointercancel", end);
  button.addEventListener("pointerleave", end);
}

function bindTouchFire(button) {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    fireBullet(performance.now());
  });
}

function applyPersistentUpgrades(player) {
  player.maxAmmo += state.meta.upgrades.ammo;
  player.ammo = player.maxAmmo;
  player.ammoRechargeMs = Math.round(2200 * Math.pow(0.9, state.meta.upgrades.reload));
  player.shields = state.meta.upgrades.hull;
}

function renderStat(label, value) {
  return `<div class="stat-chip"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderIntroOverlay() {
  state.overlayMode = "intro";
  overlayTitle.textContent = "Drift Hymn";
  overlayScore.textContent = "";
  overlayMessage.textContent = `Three quiet minutes through the belt. Leave the noise behind, thread the asteroids, and reach stillness before the field swallows you.`;
  overlayStats.innerHTML = [
    renderStat("Stardust", formatDust(state.meta.credits)),
    renderStat("Best Drift", state.meta.bestSurvivalMs ? formatTime(state.meta.bestSurvivalMs) : "0.0s"),
    renderStat("Tries", `${state.meta.attemptsSinceLastClear}`),
  ].join("");
  overlayBank.textContent = `Goal: ${formatTime(TARGET_SURVIVAL_MS)} • Current rig: ${getBuildSummary()}`;
  shopGrid.hidden = true;
  startButton.hidden = false;
  secondaryButton.hidden = true;
  startButton.textContent = "Enter The Belt";
  root.querySelector(".hint").textContent = "Press space to slip into the field.";
  overlay.hidden = false;
}

function renderShopOverlay() {
  const earned = runCreditsEarned();
  const canRevive = state.meta.credits >= reviveCost();
  state.overlayMode = "shop";
  overlayTitle.textContent = state.gameOverTitle;
  overlayScore.textContent = `${formatTime(state.survivalMs)} • ${state.score} score`;
  overlayMessage.textContent = state.gameOverMessage;
  overlayStats.innerHTML = [
    renderStat("Broken", `${state.kills}`),
    renderStat("Stardust", formatDust(earned)),
    renderStat("Goal", `${formatTime(TARGET_SURVIVAL_MS)}`),
  ].join("");
  overlayBank.textContent = `Vault: ${formatDust(state.meta.credits)} • Best drift: ${formatTime(state.meta.bestSurvivalMs)} • Tries: ${state.meta.attemptsSinceLastClear}`;

  reviveButton.innerHTML = renderShopItem(
    "revive",
    "Second Breath",
    formatDust(reviveCost()),
    "Return to the field with a brief veil of safety."
  );
  reviveButton.disabled = state.meta.credits < reviveCost();
  const ammoCost = upgradeCost("ammo");
  const reloadCost = upgradeCost("reload");
  const hullCost = upgradeCost("hull");
  const ammoCopy = getUpgradeCopy("ammo");
  const reloadCopy = getUpgradeCopy("reload");
  const hullCopy = getUpgradeCopy("hull");
  ammoUpgradeButton.innerHTML = renderShopItem(
    "ammo",
    `${ammoCopy.name} Lv.${state.meta.upgrades.ammo}/${UPGRADE_CAPS.ammo}`,
    ammoCost === null ? "MAX" : formatDust(ammoCost),
    ammoCopy.description
  );
  ammoUpgradeButton.disabled = ammoCost === null || state.meta.credits < ammoCost;
  reloadUpgradeButton.innerHTML = renderShopItem(
    "reload",
    `${reloadCopy.name} Lv.${state.meta.upgrades.reload}/${UPGRADE_CAPS.reload}`,
    reloadCost === null ? "MAX" : formatDust(reloadCost),
    reloadCopy.description
  );
  reloadUpgradeButton.disabled = reloadCost === null || state.meta.credits < reloadCost;
  hullUpgradeButton.innerHTML = renderShopItem(
    "hull",
    `${hullCopy.name} Lv.${state.meta.upgrades.hull}/${UPGRADE_CAPS.hull}`,
    hullCost === null ? "MAX" : formatDust(hullCost),
    hullCopy.description
  );
  hullUpgradeButton.disabled = hullCost === null || state.meta.credits < hullCost;

  shopGrid.hidden = false;
  startButton.hidden = false;
  secondaryButton.hidden = true;
  startButton.textContent = "Begin Again";
  root.querySelector(".hint").textContent = canRevive
    ? "Spend stardust for a second breath, or let the belt reset."
    : "If the vault is light, breathe and begin again.";
  overlay.hidden = false;
}

function renderVictoryOverlay() {
  const earned = runCreditsEarned();
  state.overlayMode = "victory";
  overlayTitle.textContent = "Stillness Reached";
  overlayScore.textContent = `${formatTime(state.survivalMs)} • ${state.score} score`;
  overlayMessage.textContent = `You crossed the full ${formatTime(TARGET_SURVIVAL_MS)} without losing yourself to the debris. The belt opened, and you stayed with it.`;
  overlayStats.innerHTML = [
    renderStat("Stardust", formatDust(earned)),
    renderStat("Broken", `${state.kills}`),
    renderStat("Tries", `${state.meta.attemptsSinceLastClear || 1}`),
  ].join("");
  overlayBank.textContent = `Vault: ${formatDust(state.meta.credits)} • Build used: ${getBuildSummary()} • Clears: ${state.meta.clears}`;
  shopGrid.hidden = true;
  startButton.hidden = false;
  secondaryButton.hidden = false;
  startButton.textContent = "Keep Drifting";
  secondaryButton.textContent = "Start New Journey";
  root.querySelector(".hint").textContent = "Press space to drift into another three minutes.";
  overlay.hidden = false;
}

function distanceToPlayer(x, y) {
  return Math.hypot(x - state.player.x, y - state.player.y);
}

function isSafeFromPlayer(x, y, buffer) {
  return distanceToPlayer(x, y) >= buffer;
}

function pickSafePoint(generator, buffer, fallback) {
  for (let attempt = 0; attempt < 18; attempt += 1) {
    const point = generator();
    if (isSafeFromPlayer(point.x, point.y, buffer)) {
      return point;
    }
  }
  return fallback;
}

function resizeCanvas() {
  const stage = root.querySelector(".space-stage");
  const rect = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.viewportWidth = rect.width;
  state.viewportHeight = rect.height;
  state.canvasWidth = Math.max(320, Math.round(rect.width));
  state.canvasHeight = Math.max(320, Math.round(rect.height));
  canvas.width = Math.round(state.canvasWidth * dpr);
  canvas.height = Math.round(state.canvasHeight * dpr);
  canvas.style.width = `${state.canvasWidth}px`;
  canvas.style.height = `${state.canvasHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (!state.running && !state.gameOver) {
    state.player.x = state.canvasWidth * 0.5;
    state.player.y = state.canvasHeight * 0.6;
  } else {
    state.player.x = clamp(state.player.x, state.player.radius, state.canvasWidth - state.player.radius);
    state.player.y = clamp(state.player.y, state.player.radius, state.canvasHeight - state.player.radius);
  }

  buildStars();
  updateControlsHint();
}

function buildStars() {
  const count = Math.floor((state.canvasWidth * state.canvasHeight) / 9000);
  state.stars = Array.from({ length: count }, () => ({
    x: Math.random() * state.canvasWidth,
    y: Math.random() * state.canvasHeight,
    size: rand(0.8, 2.2),
    speed: rand(8, 34),
    alpha: rand(0.2, 0.8),
  }));
}

function resetRun() {
  initAudio();
  syncMusicPlayback();
  state.running = true;
  state.gameOver = false;
  state.survivalMs = 0;
  state.score = 0;
  state.kills = 0;
  state.startedAt = performance.now();
  state.lastFrame = state.startedAt;
  state.lastPatternAt = state.startedAt - 1600;
  state.hazards = [];
  state.bullets = [];
  state.particles = [];
  state.run = createRunState();
  state.meta.totalAttempts += 1;
  state.meta.attemptsSinceLastClear += 1;
  saveMeta();
  state.player = createPlayer();
  applyPersistentUpgrades(state.player);
  state.player.x = state.canvasWidth * 0.5;
  state.player.y = state.canvasHeight * 0.62;
  state.player.lastAmmoTickAt = state.startedAt;
  updateHud();
  overlay.hidden = true;
}

function getDifficulty(elapsedMs) {
  const seconds = elapsedMs / 1000;
  const normalized = 1 - Math.exp(-seconds / 24);
  return {
    speed: 0.88 + normalized * 0.5,
    density: 0.92 + normalized * 0.52,
    interval: 1450 - normalized * 520,
  };
}

function edgeSpawn(edge, offset = 50) {
  switch (edge) {
    case "top":
      return { x: rand(80, state.canvasWidth - 80), y: -offset };
    case "right":
      return { x: state.canvasWidth + offset, y: rand(80, state.canvasHeight - 80) };
    case "bottom":
      return { x: rand(80, state.canvasWidth - 80), y: state.canvasHeight + offset };
    default:
      return { x: -offset, y: rand(80, state.canvasHeight - 80) };
  }
}

function velocityToward(fromX, fromY, toX, toY, speed) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.hypot(dx, dy) || 1;
  return { vx: (dx / dist) * speed, vy: (dy / dist) * speed };
}

function createHazard(x, y, vx, vy, radius, tint = "rock") {
  const points = [];
  const craterCount = tint === "ember" ? 2 : 3;
  const pointCount = 9;
  for (let i = 0; i < pointCount; i += 1) {
    points.push(radius * rand(0.78, 1.18));
  }

  const craters = Array.from({ length: craterCount }, () => {
    const angle = rand(0, Math.PI * 2);
    const distance = radius * rand(0.18, 0.45);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      radius: radius * rand(0.18, 0.32),
    };
  });

  return {
    x,
    y,
    vx,
    vy,
    radius,
    rotation: rand(0, Math.PI * 2),
    spin: rand(-1.5, 1.5),
    tint,
    points,
    craters,
  };
}

function spawnSingleDrifter(difficulty) {
  const edge = pick(["top", "right", "bottom", "left"]);
  const start = edgeSpawn(edge, 36);
  const safeTarget = pickSafePoint(
    () => ({
      x: rand(state.canvasWidth * 0.2, state.canvasWidth * 0.8),
      y: rand(state.canvasHeight * 0.18, state.canvasHeight * 0.82),
    }),
    220,
    {
      x: state.canvasWidth * 0.5,
      y: state.canvasHeight * 0.22,
    }
  );
  const targetX = safeTarget.x;
  const targetY = safeTarget.y;
  const velocity = velocityToward(start.x, start.y, targetX, targetY, rand(115, 175) * difficulty.speed);
  state.hazards.push(createHazard(start.x, start.y, velocity.vx, velocity.vy, rand(14, 22), "rock"));
  return "Drifter";
}

function spawnCircleBurst(difficulty) {
  const center = pickSafePoint(
    () => ({
      x: rand(state.canvasWidth * 0.28, state.canvasWidth * 0.72),
      y: rand(state.canvasHeight * 0.24, state.canvasHeight * 0.6),
    }),
    240,
    {
      x: state.canvasWidth * 0.5,
      y: state.canvasHeight * 0.24,
    }
  );
  const centerX = center.x;
  const centerY = center.y;
  const count = Math.round(8 + difficulty.density * 3);
  const speed = rand(120, 165) * difficulty.speed;

  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.08, 0.08);
    state.hazards.push(
      createHazard(
        centerX + Math.cos(angle) * 14,
        centerY + Math.sin(angle) * 14,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        rand(11, 18),
        "ember"
      )
    );
  }

  return "Circle Burst";
}

function spawnLaneWall(difficulty) {
  const horizontal = Math.random() > 0.5;
  const gapCenter = horizontal
    ? clamp(state.player.x + rand(-40, 40), 140, state.canvasWidth - 140)
    : clamp(state.player.y + rand(-40, 40), 120, state.canvasHeight - 120);
  const gapSize = horizontal ? clamp(230 - difficulty.density * 32, 120, 240) : clamp(210 - difficulty.density * 28, 110, 220);
  const spacing = 54;
  const speed = rand(130, 175) * difficulty.speed;

  if (horizontal) {
    const fromTop = Math.random() > 0.5;
    const y = fromTop ? -35 : state.canvasHeight + 35;
    const vy = fromTop ? speed : -speed;
    for (let x = 24; x <= state.canvasWidth - 24; x += spacing) {
      if (Math.abs(x - gapCenter) < gapSize * 0.5) {
        continue;
      }
      state.hazards.push(createHazard(x, y, rand(-18, 18), vy, rand(14, 18), "ice"));
    }
  } else {
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? -35 : state.canvasWidth + 35;
    const vx = fromLeft ? speed : -speed;
    for (let y = 24; y <= state.canvasHeight - 24; y += spacing) {
      if (Math.abs(y - gapCenter) < gapSize * 0.5) {
        continue;
      }
      state.hazards.push(createHazard(x, y, vx, rand(-18, 18), rand(14, 18), "ice"));
    }
  }

  return "Lane Cutoff";
}

function spawnDiagonalStream(difficulty) {
  const fromLeft = Math.random() > 0.5;
  const count = Math.round(5 + difficulty.density * 2);
  const speed = rand(145, 190) * difficulty.speed;
  const safeStart = pickSafePoint(
    () => ({
      x: fromLeft ? 0 : state.canvasWidth,
      y: rand(state.canvasHeight * 0.12, state.canvasHeight * 0.55),
    }),
    180,
    {
      x: fromLeft ? 0 : state.canvasWidth,
      y: state.canvasHeight * 0.18,
    }
  );
  const startY = safeStart.y;

  for (let i = 0; i < count; i += 1) {
    const x = fromLeft ? -40 - i * 42 : state.canvasWidth + 40 + i * 42;
    const y = startY + i * rand(28, 46);
    const targetX = fromLeft ? state.canvasWidth + 100 : -100;
    const targetY = y + rand(120, 220);
    const velocity = velocityToward(x, y, targetX, targetY, speed);
    state.hazards.push(createHazard(x, y, velocity.vx, velocity.vy, rand(13, 19), "rock"));
  }

  return "Diagonal Stream";
}

function spawnPinwheel(difficulty) {
  const center = pickSafePoint(
    () => ({
      x: rand(state.canvasWidth * 0.35, state.canvasWidth * 0.65),
      y: rand(state.canvasHeight * 0.25, state.canvasHeight * 0.55),
    }),
    250,
    {
      x: state.canvasWidth * 0.5,
      y: state.canvasHeight * 0.2,
    }
  );
  const centerX = center.x;
  const centerY = center.y;
  const arms = 4;
  const steps = Math.round(2 + difficulty.density);
  const baseSpeed = rand(115, 150) * difficulty.speed;

  for (let arm = 0; arm < arms; arm += 1) {
    const angle = (Math.PI * 2 * arm) / arms + rand(-0.03, 0.03);
    for (let step = 0; step < steps; step += 1) {
      const distance = 24 + step * 26;
      const speed = baseSpeed + step * 12;
      state.hazards.push(
        createHazard(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          rand(10, 16),
          "ember"
        )
      );
    }
  }

  return "Pinwheel";
}

function spawnPattern(now) {
  const elapsedMs = now - state.startedAt;
  const difficulty = getDifficulty(elapsedMs);
  const warmup = elapsedMs < 10000;
  const patterns = warmup
    ? [spawnSingleDrifter, spawnSingleDrifter, spawnDiagonalStream, spawnLaneWall]
    : [spawnSingleDrifter, spawnCircleBurst, spawnLaneWall, spawnDiagonalStream, spawnPinwheel];

  const selected = pick(patterns);
  selected(difficulty);

  if (!warmup && Math.random() < 0.2) {
    spawnSingleDrifter(difficulty);
  }

  state.lastPatternAt = now;
}

function updatePlayer(dt) {
  const player = state.player;
  const inputX = ((state.keys.arrowright || state.keys.d || state.touchControls.right) ? 1 : 0) - ((state.keys.arrowleft || state.keys.a || state.touchControls.left) ? 1 : 0);
  const inputY = ((state.keys.arrowdown || state.keys.s || state.touchControls.down) ? 1 : 0) - ((state.keys.arrowup || state.keys.w || state.touchControls.up) ? 1 : 0);
  const accel = 920;
  const damping = Math.pow(0.16, dt);
  const maxSpeed = 350;

  player.vx += inputX * accel * dt;
  player.vy += inputY * accel * dt;
  player.vx *= damping;
  player.vy *= damping;

  const speed = Math.hypot(player.vx, player.vy);
  if (speed > maxSpeed) {
    player.vx = (player.vx / speed) * maxSpeed;
    player.vy = (player.vy / speed) * maxSpeed;
  }

  player.x += player.vx * dt;
  player.y += player.vy * dt;

  if (player.x < -player.radius) {
    player.x = state.canvasWidth + player.radius;
  } else if (player.x > state.canvasWidth + player.radius) {
    player.x = -player.radius;
  }

  if (player.y < -player.radius) {
    player.y = state.canvasHeight + player.radius;
  } else if (player.y > state.canvasHeight + player.radius) {
    player.y = -player.radius;
  }

  if (speed > 2) {
    player.angle = Math.atan2(player.vy, player.vx) + Math.PI / 2;
  }

  player.thrustGlow = clamp(speed / maxSpeed, 0.12, 1);
}

function rechargeAmmo(now) {
  const player = state.player;
  if (player.ammo >= player.maxAmmo) {
    player.lastAmmoTickAt = now;
    return;
  }

  while (now - player.lastAmmoTickAt >= player.ammoRechargeMs && player.ammo < player.maxAmmo) {
    player.ammo += 1;
    player.lastAmmoTickAt += player.ammoRechargeMs;
  }
}

function fireBullet(now) {
  const player = state.player;
  if (!state.running) {
    return;
  }
  if (player.ammo <= 0 || now - player.lastShotAt < player.fireCooldownMs) {
    return;
  }

  const direction = { x: Math.sin(player.angle), y: -Math.cos(player.angle) };
  const spawnDistance = player.radius + 10;
  const bulletSpeed = 560;

  state.bullets.push({
    x: player.x + direction.x * spawnDistance,
    y: player.y + direction.y * spawnDistance,
    vx: direction.x * bulletSpeed + player.vx * 0.35,
    vy: direction.y * bulletSpeed + player.vy * 0.35,
    radius: 4,
    life: 1.05,
  });

  player.ammo -= 1;
  player.lastShotAt = now;
  playSound("fire");
  if (player.ammo === player.maxAmmo - 1) {
    player.lastAmmoTickAt = now;
  }
}

function updateHazards(dt) {
  const margin = 120;
  state.hazards = state.hazards.filter((hazard) => {
    hazard.x += hazard.vx * dt;
    hazard.y += hazard.vy * dt;
    hazard.rotation += hazard.spin * dt;
    return (
      hazard.x > -margin &&
      hazard.x < state.canvasWidth + margin &&
      hazard.y > -margin &&
      hazard.y < state.canvasHeight + margin
    );
  });
}

function updateBullets(dt) {
  const margin = 80;
  state.bullets = state.bullets.filter((bullet) => {
    bullet.x += bullet.vx * dt;
    bullet.y += bullet.vy * dt;
    bullet.life -= dt;
    return (
      bullet.life > 0 &&
      bullet.x > -margin &&
      bullet.x < state.canvasWidth + margin &&
      bullet.y > -margin &&
      bullet.y < state.canvasHeight + margin
    );
  });
}

function collisionDetected() {
  const player = state.player;
  if (performance.now() < player.invulnerableUntil) {
    return null;
  }
  for (const hazard of state.hazards) {
    const dx = hazard.x - player.x;
    const dy = hazard.y - player.y;
    const distance = Math.hypot(dx, dy);
    if (distance < hazard.radius + player.radius * 0.78) {
      return hazard;
    }
  }
  return null;
}

function explodeAt(x, y) {
  for (let i = 0; i < 24; i += 1) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(60, 260);
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: rand(0.35, 0.9),
      size: rand(2, 5),
    });
  }
}

function burstHazard(hazard) {
  for (let i = 0; i < 12; i += 1) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(20, 120);
    state.particles.push({
      x: hazard.x,
      y: hazard.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: rand(0.22, 0.55),
      size: rand(1.5, 3.5),
    });
  }
}

function scoreForHazard(hazard) {
  const base = {
    rock: 10,
    ice: 14,
    ember: 18,
  }[hazard.tint] || 10;
  return base + Math.round(hazard.radius * 0.5);
}

function updateParticles(dt) {
  state.particles = state.particles.filter((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= Math.pow(0.25, dt);
    particle.vy *= Math.pow(0.25, dt);
    particle.life -= dt;
    return particle.life > 0;
  });
}

function resolveBulletHits() {
  if (state.bullets.length === 0 || state.hazards.length === 0) {
    return;
  }

  const remainingBullets = [];
  const remainingHazards = [];
  const removedHazards = new Set();

  for (const bullet of state.bullets) {
    let hit = false;
    for (let i = 0; i < state.hazards.length; i += 1) {
      if (removedHazards.has(i)) {
        continue;
      }
      const hazard = state.hazards[i];
      const dx = hazard.x - bullet.x;
      const dy = hazard.y - bullet.y;
      const distance = Math.hypot(dx, dy);
      if (distance < hazard.radius + bullet.radius) {
        removedHazards.add(i);
        burstHazard(hazard);
        state.score += scoreForHazard(hazard);
        state.kills += 1;
        playSound("hit");
        hit = true;
        break;
      }
    }
    if (!hit) {
      remainingBullets.push(bullet);
    }
  }

  for (let i = 0; i < state.hazards.length; i += 1) {
    if (!removedHazards.has(i)) {
      remainingHazards.push(state.hazards[i]);
    }
  }

  state.bullets = remainingBullets;
  state.hazards = remainingHazards;
}

function getGameOverText(ms) {
  const seconds = ms / 1000;
  if (seconds < 8) {
    return {
      title: "Drifted Into Trouble",
      message: "The belt opens fast. Feather the controls and look for the first clean lane.",
    };
  }
  if (seconds < 18) {
    return {
      title: "Pilot Warming Up",
      message: "You found a rhythm. The next jump is reading patterns earlier instead of reacting late.",
    };
  }
  if (seconds < 35) {
    return {
      title: "Asteroid Dancer",
      message: "That run had flow. Circle bursts and cutoff walls are starting to feel readable.",
    };
  }
  if (seconds < 55) {
    return {
      title: "Belt Whisperer",
      message: "You were threading real pressure. The field had to start mixing tricks to catch you.",
    };
  }
  return {
    title: "Legend Of The Debris Field",
    message: "That is a serious survival run. At this point the asteroids are the ones getting nervous.",
  };
}

function endRun() {
  state.running = false;
  state.gameOver = true;
  state.survivalMs = performance.now() - state.startedAt;
  const totalEarned = runCreditsEarned();
  const newlyBanked = Math.max(0, totalEarned - state.run.bankedCreditsThisRun);
  state.run.bankedCreditsThisRun = totalEarned;
  state.meta.credits += newlyBanked;
  state.meta.bestScore = Math.max(state.meta.bestScore, state.score);
  state.meta.bestSurvivalMs = Math.max(state.meta.bestSurvivalMs, state.survivalMs);
  saveMeta();
  const text = getGameOverText(state.survivalMs);
  state.gameOverTitle = text.title;
  state.gameOverMessage = text.message;
  renderShopOverlay();
}

function winRun() {
  state.running = false;
  state.gameOver = true;
  state.run.victory = true;
  state.survivalMs = TARGET_SURVIVAL_MS;
  const totalEarned = runCreditsEarned();
  const newlyBanked = Math.max(0, totalEarned - state.run.bankedCreditsThisRun);
  state.run.bankedCreditsThisRun = totalEarned;
  state.meta.credits += newlyBanked;
  state.meta.bestScore = Math.max(state.meta.bestScore, state.score);
  state.meta.bestSurvivalMs = Math.max(state.meta.bestSurvivalMs, state.survivalMs);
  state.meta.clears += 1;
  saveMeta();
  renderVictoryOverlay();
  state.meta.attemptsSinceLastClear = 0;
  saveMeta();
}

function reviveRun() {
  if (state.meta.credits < reviveCost()) {
    return;
  }
  state.meta.credits -= reviveCost();
  saveMeta();

  const now = performance.now();
  state.running = true;
  state.gameOver = false;
  syncMusicPlayback();
  state.lastFrame = now;
  state.player.x = state.canvasWidth * 0.5;
  state.player.y = state.canvasHeight * 0.62;
  state.player.vx = 0;
  state.player.vy = 0;
  state.player.ammo = Math.max(2, Math.ceil(state.player.maxAmmo * 0.5));
  state.player.lastAmmoTickAt = now;
  state.player.invulnerableUntil = now + 1800;
  state.bullets = [];
  state.hazards = state.hazards.filter((hazard) => {
    return Math.hypot(hazard.x - state.player.x, hazard.y - state.player.y) > 240;
  });
  updateHud();
  overlay.hidden = true;
}

function buyUpgrade(type) {
  const cost = upgradeCost(type);
  if (cost === null || state.meta.credits < cost) {
    return;
  }
  state.meta.credits -= cost;
  state.meta.upgrades[type] += 1;
  saveMeta();
  renderShopOverlay();
}

function absorbHit() {
  state.player.shields -= 1;
  state.player.invulnerableUntil = performance.now() + 1600;
  explodeAt(state.player.x, state.player.y);
  playSound("hit");
  state.hazards = state.hazards.filter((hazard) => {
    return Math.hypot(hazard.x - state.player.x, hazard.y - state.player.y) > 170;
  });
}

function drawBackground(now) {
  const gradient = ctx.createLinearGradient(0, 0, 0, state.canvasHeight);
  gradient.addColorStop(0, "#07111f");
  gradient.addColorStop(0.55, "#040814");
  gradient.addColorStop(1, "#02050d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);

  for (const star of state.stars) {
    star.y += star.speed * 0.016;
    if (star.y > state.canvasHeight + 4) {
      star.y = -4;
      star.x = Math.random() * state.canvasWidth;
    }
    const twinkle = 0.15 * Math.sin(now * 0.0015 + star.x * 0.01);
    ctx.fillStyle = `rgba(190, 225, 255, ${star.alpha + twinkle})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  }

  const pulse = 0.08 + Math.sin(now * 0.0012) * 0.03;
  ctx.fillStyle = `rgba(79, 157, 255, ${pulse})`;
  ctx.beginPath();
  ctx.arc(state.canvasWidth * 0.82, state.canvasHeight * 0.18, state.canvasHeight * 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer() {
  const player = state.player;
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  const flame = 12 + player.thrustGlow * 18;
  ctx.fillStyle = `rgba(90, 200, 255, ${0.15 + player.thrustGlow * 0.35})`;
  ctx.beginPath();
  ctx.moveTo(0, player.radius + flame);
  ctx.lineTo(-8, player.radius - 1);
  ctx.lineTo(8, player.radius - 1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d6efff";
  ctx.beginPath();
  ctx.moveTo(0, -player.radius - 6);
  ctx.lineTo(player.radius * 0.78, player.radius);
  ctx.lineTo(0, player.radius * 0.3);
  ctx.lineTo(-player.radius * 0.78, player.radius);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#57b5ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -player.radius - 5);
  ctx.lineTo(player.radius * 0.78, player.radius);
  ctx.lineTo(0, player.radius * 0.3);
  ctx.lineTo(-player.radius * 0.78, player.radius);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "#081421";
  ctx.beginPath();
  ctx.arc(0, -2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (player.shields > 0 || performance.now() < player.invulnerableUntil) {
    const pulse = 0.25 + 0.12 * Math.sin(performance.now() * 0.012);
    ctx.strokeStyle = `rgba(110, 204, 255, ${pulse})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawHazard(hazard) {
  ctx.save();
  ctx.translate(hazard.x, hazard.y);
  ctx.rotate(hazard.rotation);
  const palette = hazard.tint === "ember"
    ? {
        glow: "rgba(255, 128, 80, 0.18)",
        edge: "#ffb072",
        fillA: "#9d5a39",
        fillB: "#5f2d20",
        crater: "rgba(63, 21, 15, 0.42)",
        spark: "rgba(255, 202, 143, 0.24)",
      }
    : hazard.tint === "ice"
      ? {
          glow: "rgba(138, 197, 255, 0.16)",
          edge: "#b8deff",
          fillA: "#7ca8d6",
          fillB: "#425d86",
          crater: "rgba(25, 42, 72, 0.32)",
          spark: "rgba(222, 242, 255, 0.26)",
        }
      : {
          glow: "rgba(255, 196, 141, 0.1)",
          edge: "#d2c8b7",
          fillA: "#8d725d",
          fillB: "#4e3c30",
          crater: "rgba(32, 22, 16, 0.34)",
          spark: "rgba(255, 227, 173, 0.14)",
        };

  ctx.fillStyle = palette.glow;
  ctx.beginPath();
  ctx.arc(0, 0, hazard.radius + 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  for (let i = 0; i < hazard.points.length; i += 1) {
    const angle = (Math.PI * 2 * i) / hazard.points.length;
    const radius = hazard.points[i];
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  const gradient = ctx.createLinearGradient(-hazard.radius, -hazard.radius, hazard.radius, hazard.radius);
  gradient.addColorStop(0, palette.edge);
  gradient.addColorStop(0.28, palette.fillA);
  gradient.addColorStop(1, palette.fillB);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(7, 17, 31, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = palette.spark;
  ctx.beginPath();
  ctx.arc(-hazard.radius * 0.2, -hazard.radius * 0.28, hazard.radius * 0.32, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.crater;
  for (const crater of hazard.craters) {
    ctx.beginPath();
    ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBullets() {
  for (const bullet of state.bullets) {
    ctx.fillStyle = "rgba(128, 219, 255, 0.95)";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(128, 219, 255, 0.25)";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius + 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawParticles() {
  for (const particle of state.particles) {
    ctx.fillStyle = `rgba(130, 214, 255, ${particle.life})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFrame(now) {
  drawBackground(now);
  for (const hazard of state.hazards) {
    drawHazard(hazard);
  }
  drawBullets();
  drawParticles();
  if (state.running) {
    drawPlayer();
  }
}

function step(now) {
  if (!state.lastFrame) {
    state.lastFrame = now;
  }

  const dt = Math.min(0.032, (now - state.lastFrame) / 1000);
  state.lastFrame = now;

  if (state.running) {
    state.survivalMs = now - state.startedAt;
    rechargeAmmo(now);
    updateHud();

    updatePlayer(dt);
    updateHazards(dt);
    updateBullets(dt);
    resolveBulletHits();
    updateParticles(dt);

    const difficulty = getDifficulty(state.survivalMs);
    if (now - state.lastPatternAt >= difficulty.interval) {
      spawnPattern(now);
    }

    if (state.survivalMs >= TARGET_SURVIVAL_MS) {
      winRun();
    }

    const collision = collisionDetected();
    if (state.running && collision) {
      if (state.player.shields > 0) {
        absorbHit();
      } else {
        playSound("hit");
        explodeAt(state.player.x, state.player.y);
        endRun();
      }
    }
  } else {
    updateParticles(dt);
  }

  drawFrame(now);
  requestAnimationFrame(step);
}

function setOverlay(title, message, buttonLabel) {
  overlayTitle.textContent = title;
  overlayScore.textContent = "";
  overlayMessage.textContent = message;
  overlayStats.innerHTML = "";
  overlayBank.textContent = "";
  shopGrid.hidden = true;
  startButton.hidden = false;
  secondaryButton.hidden = true;
  startButton.textContent = buttonLabel;
  overlay.hidden = false;
}

function startGame() {
  resetRun();
  updateHud();
}

function startNewJourney() {
  state.meta = createDefaultMeta();
  state.run = createRunState();
  saveMeta();
  renderIntroOverlay();
}

function toggleSound() {
  initAudio();
  state.audio.musicEnabled = !state.audio.musicEnabled;
  updateAudioToggles();
  syncMusicPlayback();
}

function toggleSfx() {
  state.audio.sfxEnabled = !state.audio.sfxEnabled;
  updateAudioToggles();
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  state.keys[key] = true;

  if (event.code === "Space") {
    event.preventDefault();
    if (!state.running) {
      if (state.overlayMode === "intro") {
        startGame();
      }
    } else {
      fireBullet(performance.now());
    }
  }
});

window.addEventListener("keyup", (event) => {
  state.keys[event.key.toLowerCase()] = false;
});

window.addEventListener("blur", () => {
  state.keys = Object.create(null);
  state.touchControls.up = false;
  state.touchControls.down = false;
  state.touchControls.left = false;
  state.touchControls.right = false;
});

window.addEventListener("resize", resizeCanvas);
startButton.addEventListener("click", () => {
  startGame();
});
secondaryButton.addEventListener("click", startNewJourney);
musicToggle.addEventListener("click", toggleSound);
sfxToggle.addEventListener("click", toggleSfx);
bindTouchDirection(touchUpButton, "up");
bindTouchDirection(touchLeftButton, "left");
bindTouchDirection(touchRightButton, "right");
bindTouchDirection(touchDownButton, "down");
bindTouchFire(touchFireButton);
reviveButton.addEventListener("click", reviveRun);
ammoUpgradeButton.addEventListener("click", () => buyUpgrade("ammo"));
reloadUpgradeButton.addEventListener("click", () => buyUpgrade("reload"));
hullUpgradeButton.addEventListener("click", () => buyUpgrade("hull"));

resizeCanvas();
updateAudioToggles();
renderIntroOverlay();
requestAnimationFrame(step);
