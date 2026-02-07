/* MiniPhone OS (Activity 2) - mobile-first simulation.
   Goal: students learn through interaction (cookies, permissions, tracking),
   while instructions live on the activity instructions page + PDF worksheet. */

const STORAGE_KEY = 'sgs-miniphone-os-v2';

const clampNumber = (value, min, max) => Math.min(Math.max(value, min), max);

const clone = (value) => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
};

const mergeNested = (base, patch) => ({
  ...clone(base),
  ...(patch && typeof patch === 'object' ? patch : {})
});

const DEFAULT_STATE = {
  missionIndex: 0,
  unlockedApps: ['messages', 'casefile', 'settings'],
  completedMissions: [],
  unreadMessages: 1,
  casefileHasNew: false,
  browser: {
    lastChoice: null, // 'all' | 'essential'
    triedAll: false,
    triedEssential: false
  },
  connectify: {
    found: [],
    choice: null // 'agree' | 'decline'
  },
  mapme: {
    location: null, // 'precise' | 'approx' | 'none'
    triedPrecise: false,
    triedApprox: false
  },
  freegame: {
    terms: null, // true/false
    tracking: null, // 'all' | 'essential'
    camera: null, // true/false
    contacts: null // true/false
  },
  footprint: [],
  discoveries: []
};

const MISSIONS = [
  {
    id: 'browser',
    title: 'Cookies in the Browser',
    app: 'browser',
    note: 'Try both cookie choices.',
    unlockLabel: 'Unlock Browser'
  },
  {
    id: 'connectify',
    title: 'Terms in Connectify',
    app: 'connectify',
    note: 'Spot what you are really agreeing to.',
    unlockLabel: 'Unlock Connectify'
  },
  {
    id: 'mapme',
    title: 'Location in MapMe',
    app: 'mapme',
    note: 'Try precise vs approximate.',
    unlockLabel: 'Unlock MapMe'
  },
  {
    id: 'freegame',
    title: 'Why "Free" Apps Ask for Data',
    app: 'freegame',
    note: 'Watch the permissions and tracking prompts.',
    unlockLabel: 'Unlock Super Puzzle'
  }
];

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    const merged = { ...clone(DEFAULT_STATE), ...parsed };

    merged.browser = mergeNested(DEFAULT_STATE.browser, parsed.browser);
    merged.connectify = mergeNested(DEFAULT_STATE.connectify, parsed.connectify);
    merged.mapme = mergeNested(DEFAULT_STATE.mapme, parsed.mapme);
    merged.freegame = mergeNested(DEFAULT_STATE.freegame, parsed.freegame);

    merged.unlockedApps = Array.isArray(parsed.unlockedApps) ? parsed.unlockedApps.slice() : clone(DEFAULT_STATE.unlockedApps);
    ['messages', 'casefile', 'settings'].forEach((app) => {
      if (!merged.unlockedApps.includes(app)) merged.unlockedApps.push(app);
    });

    merged.completedMissions = Array.isArray(parsed.completedMissions) ? parsed.completedMissions.slice() : [];
    merged.footprint = Array.isArray(parsed.footprint) ? parsed.footprint.slice() : [];
    merged.discoveries = Array.isArray(parsed.discoveries) ? parsed.discoveries.slice() : [];

    merged.missionIndex = typeof parsed.missionIndex === 'number' ? parsed.missionIndex : DEFAULT_STATE.missionIndex;
    merged.missionIndex = clampNumber(merged.missionIndex, 0, MISSIONS.length);

    merged.unreadMessages = typeof parsed.unreadMessages === 'number' ? parsed.unreadMessages : DEFAULT_STATE.unreadMessages;
    merged.unreadMessages = clampNumber(merged.unreadMessages, 0, 99);

    merged.casefileHasNew = Boolean(parsed.casefileHasNew);
    return merged;
  } catch {
    return clone(DEFAULT_STATE);
  }
};

const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

let state = loadState();

const $ = (selector, root = document) => root.querySelector(selector);

const els = {
  statusTime: null,
  toastContainer: null,
  screens: null,
  messagesBadge: null,
  casefileDot: null,
  messagesContainer: null,
  browserBody: null,
  cookieBanner: null,
  connectifyBody: null,
  mapmeBody: null,
  freegameBody: null,
  casefileBody: null,
  settingsBody: null,
  permissionOverlay: null,
  permissionIcon: null,
  permissionTitle: null,
  permissionDesc: null,
  permissionButtons: null
};

const getActiveMission = () => {
  if (state.missionIndex >= MISSIONS.length) return null;
  return MISSIONS[clampNumber(state.missionIndex, 0, MISSIONS.length - 1)];
};

const isUnlocked = (app) => state.unlockedApps.includes(app);

const unlockApp = (app) => {
  if (isUnlocked(app)) return;
  state.unlockedApps.push(app);
  state.unreadMessages = 1;
  saveState();
  updateHomeIcons();
  updateBadges();
};

const markCasefileNew = () => {
  state.casefileHasNew = true;
  saveState();
  updateBadges();
};

const addFootprint = (item, icon, source) => {
  if (state.footprint.some((f) => f.item === item)) return;
  state.footprint.push({ item, icon, source });
  markCasefileNew();
  saveState();
  showToast('bad', 'Data collected', `${item}`);
};

const addDiscovery = (id, title, desc) => {
  if (state.discoveries.some((d) => d.id === id)) return;
  state.discoveries.push({ id, title, desc });
  markCasefileNew();
  saveState();
  showToast('info', 'Discovery', title);
};

const updateClock = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  els.statusTime.textContent = `${hh}:${mm}`;
};

const showToast = (tone, title, body) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.dataset.tone = tone;
  toast.innerHTML = `
    <div class="toast-title">${escapeHtml(title)}</div>
    <div class="toast-body">${escapeHtml(body)}</div>
  `;

  els.toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-6px)';
    toast.style.transition = 'opacity 180ms ease, transform 180ms ease';
    window.setTimeout(() => toast.remove(), 220);
  }, 2600);
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const showScreen = (screenId) => {
  els.screens.forEach((screen) => screen.classList.remove('active'));
  const next = document.getElementById(screenId);
  if (next) next.classList.add('active');
};

const goHome = () => {
  showScreen('home-screen');
  checkMissionCompletion();
};

const updateHomeIcons = () => {
  document.querySelectorAll('[data-app]').forEach((btn) => {
    const app = btn.getAttribute('data-app');
    if (!app) return;
    if (['messages', 'settings', 'casefile'].includes(app)) {
      btn.classList.remove('locked');
      return;
    }
    if (isUnlocked(app)) btn.classList.remove('locked');
    else btn.classList.add('locked');
  });
};

const updateBadges = () => {
  if (state.unreadMessages > 0) {
    els.messagesBadge.textContent = String(state.unreadMessages);
    els.messagesBadge.style.display = 'grid';
  } else {
    els.messagesBadge.style.display = 'none';
  }

  els.casefileDot.style.display = state.casefileHasNew ? 'block' : 'none';
};

const openApp = (app) => {
  const alwaysAllowed = ['messages', 'settings', 'casefile'];
  if (!alwaysAllowed.includes(app) && !isUnlocked(app)) {
    showToast('warn', 'Locked', 'Open Messages to unlock the next app.');
    return;
  }

  if (app === 'messages') {
    state.unreadMessages = 0;
    saveState();
    updateBadges();
    renderMessages();
    showScreen('screen-messages');
    return;
  }

  if (app === 'casefile') {
    state.casefileHasNew = false;
    saveState();
    updateBadges();
    renderCasefile();
    showScreen('screen-casefile');
    return;
  }

  if (app === 'browser') {
    renderBrowser();
    showScreen('screen-browser');
    return;
  }

  if (app === 'connectify') {
    renderConnectify();
    showScreen('screen-connectify');
    return;
  }

  if (app === 'mapme') {
    renderMapMe();
    showScreen('screen-mapme');
    return;
  }

  if (app === 'freegame') {
    renderFreeGame();
    showScreen('screen-freegame');
    return;
  }

  if (app === 'settings') {
    renderSettings();
    showScreen('screen-settings');
  }
};

const renderMessages = () => {
  const mission = getActiveMission();

  const cards = MISSIONS.map((m, index) => {
    const isDone = state.completedMissions.includes(m.id);
    const isActive = index === state.missionIndex && !isDone;
    const unlocked = isUnlocked(m.app);

    const status = isDone ? 'done' : isActive ? 'active' : 'locked';
    const statusLabel = isDone ? 'Completed' : isActive ? 'Active' : 'Locked';
    const statusIcon = isDone ? 'fa-circle-check' : isActive ? 'fa-bullseye' : 'fa-lock';

    let actionHtml = '';
    if (isDone) {
      actionHtml = `<div class="mission-status" data-state="done"><i class="fa-solid ${statusIcon}"></i> ${statusLabel}</div>`;
    } else if (isActive) {
      actionHtml = unlocked
        ? `<button class="btn btn-primary" type="button" data-open-app="${m.app}"><i class="fa-solid fa-arrow-right"></i> Open ${labelForApp(m.app)}</button>`
        : `<button class="btn btn-primary" type="button" data-unlock-app="${m.app}"><i class="fa-solid fa-unlock"></i> ${m.unlockLabel}</button>`;
    } else {
      actionHtml = `<div class="mission-status" data-state="locked"><i class="fa-solid ${statusIcon}"></i> ${statusLabel}</div>`;
    }

    return `
      <div class="mission-card" data-mission="${m.id}">
        <div class="mission-kicker">Mission ${index + 1}</div>
        <h4 class="mission-title">${escapeHtml(m.title)}</h4>
        <p class="mission-note">${escapeHtml(m.note)}</p>
        ${actionHtml}
      </div>
    `;
  }).join('');

  els.messagesContainer.innerHTML = `
    <div class="bubble from-hq"><strong>Mission Control</strong><br>Welcome, detective. Open the active mission and test what happens.</div>
    <div class="bubble from-you">OK.</div>
    ${cards}
    ${state.completedMissions.length >= MISSIONS.length
      ? `<div class="bubble from-hq"><strong>All missions complete.</strong> Open Case File to review what was collected.</div>`
      : `<div class="bubble from-hq"><strong>Current:</strong> ${mission ? escapeHtml(mission.title) : 'Open the active mission above.'}</div>`}
  `;
};

const labelForApp = (app) => {
  const map = {
    browser: 'Browser',
    connectify: 'Connectify',
    mapme: 'MapMe',
    freegame: 'Super Puzzle',
    settings: 'Settings',
    casefile: 'Case File',
    messages: 'Messages'
  };
  return map[app] || app;
};

const renderBrowser = () => {
  const cookieState = state.browser.lastChoice;
  const tried = `${state.browser.triedAll ? 1 : 0}${state.browser.triedEssential ? 1 : 0}`;
  const triedCount = (state.browser.triedAll ? 1 : 0) + (state.browser.triedEssential ? 1 : 0);

  const ad = cookieState === 'all'
    ? {
        title: 'Personalised ad',
        body: 'We noticed you were looking at gaming gear...',
        tone: 'bad',
        detail: 'This ad used tracking cookies.'
      }
    : cookieState === 'essential'
    ? {
        title: 'Generic ad',
        body: 'Big sale this weekend. Visit our store.',
        tone: 'good',
        detail: 'No tracking cookies were used.'
      }
    : {
        title: 'Ad loading',
        body: 'Choose cookie settings to continue.',
        tone: 'info',
        detail: 'Cookie choice not set yet.'
      };

  els.browserBody.innerHTML = `
    <div class="card">
      <p class="card-subtitle"><i class="fa-solid fa-lock"></i> www.shop-everything.com</p>
    </div>

    <div class="card">
      <h4 class="card-title">ShopEverything</h4>
      <p class="card-subtitle">A website that shows ads.</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-cookie-bite"></i> Cookies: ${cookieState ? escapeHtml(cookieState) : 'not set'}</span>
        <span class="pill"><i class="fa-solid fa-list-check"></i> Tried: ${triedCount}/2</span>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">${escapeHtml(ad.title)}</h4>
      <p class="card-subtitle">${escapeHtml(ad.body)}</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-shield-halved"></i> ${escapeHtml(ad.detail)}</span>
      </div>
      <div class="btn-row">
        <button class="btn" type="button" data-action="cookies-open">
          <i class="fa-solid fa-cookie-bite"></i> Change cookie settings
        </button>
        <button class="btn" type="button" data-open-app="casefile">
          <i class="fa-solid fa-folder-open"></i> Open Case File
        </button>
      </div>
    </div>
  `;

  renderCookieBanner();
};

const renderCookieBanner = () => {
  const shouldShow = state.browser.lastChoice === null;
  els.cookieBanner.innerHTML = '';
  if (!shouldShow) return;

  els.cookieBanner.innerHTML = `
    <div class="cookie-card">
      <h4 class="cookie-title"><i class="fa-solid fa-cookie-bite"></i> Cookie choice</h4>
      <p class="cookie-desc">Choose one option. You will try both options for the mission.</p>
      <div class="btn-row">
        <button class="btn btn-danger" type="button" data-cookie-choice="all">
          <i class="fa-solid fa-check"></i> Accept all cookies
        </button>
        <button class="btn btn-primary" type="button" data-cookie-choice="essential">
          <i class="fa-solid fa-shield-halved"></i> Essential only
        </button>
      </div>
    </div>
  `;
};

const handleCookieChoice = (choice) => {
  state.browser.lastChoice = choice;
  if (choice === 'all') {
    state.browser.triedAll = true;
    addFootprint('Browsing history', 'fa-clock-rotate-left', 'Browser');
    addFootprint('Shopping interests', 'fa-cart-shopping', 'Browser');
    addFootprint('Ad profile', 'fa-bullhorn', 'Browser');
    showToast('warn', 'Cookies', 'Tracking cookies enabled.');
  } else {
    state.browser.triedEssential = true;
    showToast('good', 'Cookies', 'Essential cookies only.');
  }

  saveState();
  els.cookieBanner.innerHTML = '';
  renderBrowser();
  checkMissionCompletion();
};

const renderConnectify = () => {
  const foundCount = state.connectify.found.length;
  const choice = state.connectify.choice;

  if (!choice) {
    const choiceDisabled = foundCount < 2;
    els.connectifyBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Before you start</h4>
        <p class="card-subtitle">Tap the suspicious clauses. Then decide if you agree.</p>
        <div class="pill-row">
          <span class="pill"><i class="fa-solid fa-magnifying-glass"></i> Found: ${foundCount}/3</span>
        </div>
      </div>

      <div class="card">
        <h4 class="card-title">Terms &amp; Conditions</h4>
        <p class="card-subtitle">Tap any highlighted clause.</p>
        <div class="btn-row">
          ${renderClauseButton('data-retention', 'We keep your data forever')}
          ${renderClauseButton('background-location', 'We track your location often')}
          ${renderClauseButton('data-sharing', 'We share data with many companies')}
        </div>
      </div>

      <div class="card">
        <h4 class="card-title">Your choice</h4>
        <p class="card-subtitle">${choiceDisabled ? 'Find 2 clauses to unlock the buttons.' : 'Agree to use the app, or decline to protect privacy.'}</p>
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-connectify-choice="agree" ${choiceDisabled ? 'disabled' : ''}><i class="fa-solid fa-check"></i> I agree</button>
          <button class="btn" type="button" data-connectify-choice="decline" ${choiceDisabled ? 'disabled' : ''}><i class="fa-solid fa-xmark"></i> Decline</button>
        </div>
      </div>
    `;
    return;
  }

  if (choice === 'decline') {
    els.connectifyBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">You declined the terms</h4>
        <p class="card-subtitle">Connectify will not open. You protected your data.</p>
        <div class="btn-row">
          <button class="btn" type="button" data-connectify-reset><i class="fa-solid fa-rotate-left"></i> Try again</button>
          <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open"></i> Open Case File</button>
        </div>
      </div>
    `;
    return;
  }

  // choice === 'agree'
  els.connectifyBody.innerHTML = `
    <div class="card">
      <h4 class="card-title">Welcome to Connectify</h4>
      <p class="card-subtitle">You agreed to the terms. The app can now collect data you allowed.</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-check-circle"></i> Terms accepted</span>
      </div>
      <div class="btn-row">
        <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open"></i> Open Case File</button>
        <button class="btn" type="button" data-connectify-reset><i class="fa-solid fa-rotate-left"></i> Restart</button>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">Feed</h4>
      <p class="card-subtitle">Your friends are posting.</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-user"></i> Taylor</span>
        <span class="pill"><i class="fa-solid fa-camera"></i> Photo</span>
      </div>
    </div>
  `;
};

const renderClauseButton = (id, label) => {
  const found = state.connectify.found.includes(id);
  const icon = found ? 'fa-circle-check' : 'fa-triangle-exclamation';
  const tone = found ? 'btn-primary' : '';
  return `
    <button class="btn ${tone}" type="button" data-connectify-clause="${escapeHtml(id)}">
      <i class="fa-solid ${icon}"></i> ${escapeHtml(label)}
    </button>
  `;
};

const handleConnectifyClause = (id) => {
  if (state.connectify.found.includes(id)) return;
  state.connectify.found.push(id);
  const discoveries = {
    'data-retention': { title: 'Data never deleted', desc: 'Even if you uninstall, they keep it.' },
    'background-location': { title: 'Background tracking', desc: 'They can track where you go.' },
    'data-sharing': { title: 'Shared with partners', desc: 'Many companies can get your info.' }
  };
  if (discoveries[id]) addDiscovery(`connectify-${id}`, discoveries[id].title, discoveries[id].desc);
  saveState();
  renderConnectify();
  checkMissionCompletion();
};

const handleConnectifyChoice = (choice) => {
  state.connectify.choice = choice;
  if (choice === 'agree') {
    addFootprint('Profile info', 'fa-user', 'Connectify');
    addFootprint('Interests', 'fa-heart', 'Connectify');
    if (state.connectify.found.includes('data-retention')) addFootprint('Data kept forever', 'fa-infinity', 'Connectify');
    if (state.connectify.found.includes('background-location')) addFootprint('Background location pings', 'fa-location-dot', 'Connectify');
    if (state.connectify.found.includes('data-sharing')) addFootprint('Shared with partners', 'fa-share-nodes', 'Connectify');
  } else {
    showToast('good', 'Choice', 'You declined. App blocked.');
  }
  saveState();
  renderConnectify();
  checkMissionCompletion();
};

const resetConnectify = () => {
  state.connectify = clone(DEFAULT_STATE.connectify);
  saveState();
  showToast('info', 'Restarted', 'Connectify restarted.');
  renderConnectify();
};

const renderMapMe = () => {
  if (state.mapme.location === null) {
    showPermissionDialog({
      icon: 'fa-location-dot',
      iconBg: 'linear-gradient(135deg, #5856d6, #2f5bea)',
      title: '"MapMe" wants your location',
      desc: 'Choose a location setting.',
      buttons: [
        { label: 'Precise location', tone: 'primary', onClick: () => setMapLocation('precise') },
        { label: 'Approximate location', tone: 'primary', onClick: () => setMapLocation('approx') },
        { label: "Don't allow", tone: 'default', onClick: () => setMapLocation('none') }
      ]
    });

    els.mapmeBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Location permission</h4>
        <p class="card-subtitle">Choose an option in the pop-up to continue.</p>
      </div>
    `;
    return;
  }

  const loc = state.mapme.location;
  const triedCount = (state.mapme.triedPrecise ? 1 : 0) + (state.mapme.triedApprox ? 1 : 0);
  const status =
    loc === 'precise'
      ? { title: 'Precise location', detail: 'Exact address level', tone: 'bad' }
      : loc === 'approx'
      ? { title: 'Approximate location', detail: 'Area level', tone: 'good' }
      : { title: 'Location off', detail: 'No location shared', tone: 'info' };

  els.mapmeBody.innerHTML = `
    <div class="card">
      <h4 class="card-title">Map</h4>
      <p class="card-subtitle">Location setting changes what the app can know.</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(status.title)}</span>
        <span class="pill"><i class="fa-solid fa-list-check"></i> Tried: ${triedCount}/2</span>
      </div>
      <div class="btn-row">
        <button class="btn" type="button" data-action="mapme-change">
          <i class="fa-solid fa-gear"></i> Change location
        </button>
        <button class="btn" type="button" data-open-app="casefile">
          <i class="fa-solid fa-folder-open"></i> Open Case File
        </button>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">${escapeHtml(status.detail)}</h4>
      <p class="card-subtitle">${loc === 'precise' ? 'The app can locate you very accurately.' : loc === 'approx' ? 'The app still works without your exact address.' : 'You can still search places manually.'}</p>
    </div>
  `;
};

const setMapLocation = (value) => {
  hidePermissionDialog();
  state.mapme.location = value;
  if (value === 'precise') {
    state.mapme.triedPrecise = true;
    addFootprint('Exact location', 'fa-location-crosshairs', 'MapMe');
    showToast('warn', 'Location', 'Precise location shared.');
  } else if (value === 'approx') {
    state.mapme.triedApprox = true;
    addFootprint('General area', 'fa-map', 'MapMe');
    showToast('good', 'Location', 'Approximate location shared.');
  } else {
    showToast('info', 'Location', 'Location not shared.');
  }

  saveState();
  renderMapMe();
  checkMissionCompletion();
};

const renderFreeGame = () => {
  const fg = state.freegame;

  if (fg.terms === null) {
    els.freegameBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Super Puzzle Quest</h4>
        <p class="card-subtitle">Free to play. Before you start, choose.</p>
        <div class="pill-row">
          <span class="pill"><i class="fa-solid fa-tag"></i> FREE</span>
          <span class="pill"><i class="fa-solid fa-triangle-exclamation"></i> May use your data</span>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-freegame-terms="agree"><i class="fa-solid fa-check"></i> Agree &amp; play</button>
          <button class="btn" type="button" data-freegame-terms="decline"><i class="fa-solid fa-xmark"></i> No thanks</button>
        </div>
      </div>

      <div class="card">
        <h4 class="card-title">What you might be asked for</h4>
        <div class="pill-row">
          <span class="pill"><i class="fa-solid fa-camera"></i> Camera</span>
          <span class="pill"><i class="fa-solid fa-address-book"></i> Contacts</span>
          <span class="pill"><i class="fa-solid fa-cookie-bite"></i> Tracking</span>
        </div>
      </div>
    `;
    return;
  }

  if (fg.terms === false) {
    els.freegameBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">You declined</h4>
        <p class="card-subtitle">The game will not open. (Some apps work like this.)</p>
        <div class="btn-row">
          <button class="btn" type="button" data-freegame-reset><i class="fa-solid fa-rotate-left"></i> Try again</button>
        </div>
      </div>
    `;
    return;
  }

  // Terms agreed; next: tracking choice
  if (fg.tracking === null) {
    els.freegameBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Tracking cookies</h4>
        <p class="card-subtitle">Choose one option.</p>
        <div class="btn-row">
          <button class="btn btn-danger" type="button" data-freegame-tracking="all"><i class="fa-solid fa-cookie-bite"></i> Allow tracking</button>
          <button class="btn btn-primary" type="button" data-freegame-tracking="essential"><i class="fa-solid fa-shield-halved"></i> Essential only</button>
        </div>
      </div>
    `;
    return;
  }

  // Permissions: camera then contacts
  if (fg.camera === null) {
    showPermissionDialog({
      icon: 'fa-camera',
      iconBg: 'linear-gradient(135deg, #af52de, #6a5cff)',
      title: '"Super Puzzle Quest" wants your camera',
      desc: 'For a profile photo.',
      buttons: [
        { label: 'Allow camera', tone: 'primary', onClick: () => setFreeGamePermission('camera', true) },
        { label: "Don't allow", tone: 'default', onClick: () => setFreeGamePermission('camera', false) }
      ]
    });

    els.freegameBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Camera permission</h4>
        <p class="card-subtitle">Choose an option in the pop-up to continue.</p>
      </div>
    `;
    return;
  }

  if (fg.contacts === null) {
    showPermissionDialog({
      icon: 'fa-address-book',
      iconBg: 'linear-gradient(135deg, #af52de, #6a5cff)',
      title: '"Super Puzzle Quest" wants your contacts',
      desc: 'To invite friends.',
      buttons: [
        { label: 'Allow contacts', tone: 'primary', onClick: () => setFreeGamePermission('contacts', true) },
        { label: "Don't allow", tone: 'default', onClick: () => setFreeGamePermission('contacts', false) }
      ]
    });

    els.freegameBody.innerHTML = `
      <div class="card">
        <h4 class="card-title">Contacts permission</h4>
        <p class="card-subtitle">Choose an option in the pop-up to continue.</p>
      </div>
    `;
    return;
  }

  // After decisions, show "game home"
  const shared = [];
  if (fg.tracking === 'all') shared.push('Tracking');
  if (fg.camera === true) shared.push('Camera');
  if (fg.contacts === true) shared.push('Contacts');

  els.freegameBody.innerHTML = `
    <div class="card">
      <h4 class="card-title">Game home</h4>
      <p class="card-subtitle">You can play now. Some choices may collect data.</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-database"></i> Shared: ${shared.length ? escapeHtml(shared.join(', ')) : 'very little'}</span>
      </div>
      <div class="btn-row">
        <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open"></i> Open Case File</button>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">Try features</h4>
      <p class="card-subtitle">See what changes when you say yes or no.</p>
      <div class="btn-row">
        <button class="btn" type="button" data-freegame-action="photo" ${fg.camera ? '' : 'disabled'}>
          <i class="fa-solid fa-camera"></i> Take profile photo
        </button>
        <button class="btn" type="button" data-freegame-action="invite" ${fg.contacts ? '' : 'disabled'}>
          <i class="fa-solid fa-user-plus"></i> Invite friends
        </button>
        <button class="btn" type="button" data-freegame-action="tracking">
          <i class="fa-solid fa-cookie-bite"></i> Change tracking choice
        </button>
        <button class="btn" type="button" data-freegame-reset>
          <i class="fa-solid fa-rotate-left"></i> Restart this app
        </button>
      </div>
    </div>

    ${
      fg.tracking === 'all'
        ? `<div class="card"><h4 class="card-title">Ad</h4><p class="card-subtitle">This ad is personalised because tracking is on.</p></div>`
        : `<div class="card"><h4 class="card-title">Ad</h4><p class="card-subtitle">Generic ad (tracking limited).</p></div>`
    }
  `;

  checkMissionCompletion();
};

const setFreeGamePermission = (key, value) => {
  hidePermissionDialog();
  state.freegame[key] = value;
  if (key === 'camera' && value === true) addFootprint('Camera access', 'fa-camera', 'Super Puzzle Quest');
  if (key === 'contacts' && value === true) addFootprint('Contacts list', 'fa-address-book', 'Super Puzzle Quest');
  if (key === 'contacts' && value === true) showToast('warn', 'Contacts', 'Invites sent to your contacts.');
  if (key === 'contacts' && value === false) showToast('good', 'Contacts', 'Contacts not shared.');
  saveState();
  renderFreeGame();
};

const resetFreeGame = () => {
  state.freegame = clone(DEFAULT_STATE.freegame);
  saveState();
  showToast('info', 'Restarted', 'Super Puzzle restarted.');
  renderFreeGame();
};

const renderCasefile = () => {
  const mission = getActiveMission();
  const missionTitle = mission ? escapeHtml(mission.title) : 'All missions complete';
  const footprintItems =
    state.footprint.length === 0
      ? `<p class="card-subtitle">No data collected yet.</p>`
      : state.footprint
          .map(
            (f) => `
      <div class="pill"><i class="fa-solid ${escapeHtml(f.icon)}"></i> ${escapeHtml(f.item)} <span style="opacity:0.55;">(${escapeHtml(f.source)})</span></div>
    `
          )
          .join('');

  const discoveries =
    state.discoveries.length === 0
      ? `<p class="card-subtitle">No discoveries yet.</p>`
      : state.discoveries
          .map(
            (d) => `
      <div class="card">
        <h4 class="card-title">${escapeHtml(d.title)}</h4>
        <p class="card-subtitle">${escapeHtml(d.desc)}</p>
      </div>
    `
          )
          .join('');

  els.casefileBody.innerHTML = `
    <div class="card">
      <h4 class="card-title">Progress</h4>
      <p class="card-subtitle">Current mission: ${missionTitle}</p>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-flag-checkered"></i> Completed: ${state.completedMissions.length}/${MISSIONS.length}</span>
        <span class="pill"><i class="fa-solid fa-shoe-prints"></i> Footprint: ${state.footprint.length}</span>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">Data collected</h4>
      <div class="pill-row">
        ${footprintItems}
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">Key ideas (quick)</h4>
      <p class="card-subtitle"><strong>Cookie</strong>: a small file websites use to remember you. Some cookies track you.</p>
      <p class="card-subtitle"><strong>Permission</strong>: an app asking to access something (location, camera, contacts).</p>
      <p class="card-subtitle"><strong>Tracking</strong>: collecting data about what you do, often for ads.</p>
    </div>

    <div class="card">
      <h4 class="card-title">Discoveries</h4>
      ${discoveries}
    </div>
  `;
};

const renderSettings = () => {
  els.settingsBody.innerHTML = `
    <div class="card">
      <h4 class="card-title">Privacy summary</h4>
      <div class="pill-row">
        <span class="pill"><i class="fa-solid fa-cookie-bite"></i> Browser: ${state.browser.lastChoice || 'not set'}</span>
        <span class="pill"><i class="fa-solid fa-location-dot"></i> MapMe: ${state.mapme.location || 'not set'}</span>
        <span class="pill"><i class="fa-solid fa-gamepad"></i> Super Puzzle: ${state.freegame.terms === null ? 'not started' : state.freegame.terms ? 'started' : 'declined'}</span>
      </div>
    </div>

    <div class="card">
      <h4 class="card-title">Reset</h4>
      <p class="card-subtitle">Start again if you need to.</p>
      <div class="btn-row">
        <button class="btn" type="button" data-reset="all"><i class="fa-solid fa-rotate-left"></i> Reset everything</button>
      </div>
    </div>
  `;
};

const resetAll = () => {
  state = clone(DEFAULT_STATE);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  showToast('info', 'Reset', 'Simulation reset.');
  saveState();
  updateHomeIcons();
  updateBadges();
  renderMessages();
  goHome();
};

const showPermissionDialog = ({ icon, iconBg, title, desc, buttons }) => {
  // Avoid stacking prompts.
  if (!els.permissionOverlay.hasAttribute('hidden')) return;

  els.permissionIcon.style.background = iconBg;
  els.permissionIcon.innerHTML = `<i class="fa-solid ${escapeHtml(icon)}"></i>`;
  els.permissionTitle.textContent = title;
  els.permissionDesc.textContent = desc;

  els.permissionButtons.innerHTML = '';
  buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = btn.tone === 'primary' ? 'btn btn-primary' : 'btn';
    button.textContent = btn.label;
    button.addEventListener('click', btn.onClick, { once: true });
    els.permissionButtons.appendChild(button);
  });

  els.permissionOverlay.removeAttribute('hidden');
  const firstButton = els.permissionButtons.querySelector('button');
  if (firstButton) firstButton.focus();
};

const hidePermissionDialog = () => {
  els.permissionOverlay.setAttribute('hidden', '');
  els.permissionButtons.innerHTML = '';
};

const checkMissionCompletion = () => {
  const active = getActiveMission();
  if (!active) return;

  const missionId = active.id;
  if (state.completedMissions.includes(missionId)) return;

  const completed = (() => {
    if (missionId === 'browser') return state.browser.triedAll && state.browser.triedEssential;
    if (missionId === 'connectify') return state.connectify.choice !== null && state.connectify.found.length >= 2;
    if (missionId === 'mapme') return state.mapme.triedPrecise && state.mapme.triedApprox;
    if (missionId === 'freegame') {
      const fg = state.freegame;
      return fg.terms !== null && fg.tracking !== null && fg.camera !== null && fg.contacts !== null;
    }
    return false;
  })();

  if (!completed) return;

  state.completedMissions.push(missionId);
  state.unreadMessages = 1;
  state.missionIndex = clampNumber(state.missionIndex + 1, 0, MISSIONS.length);
  saveState();
  updateBadges();
  updateHomeIcons();
  showToast('good', 'Mission complete', 'Check Messages for the next mission.');
};

const wireEvents = () => {
  document.addEventListener('click', (event) => {
    const appBtn = event.target.closest('[data-app]');
    if (appBtn) {
      const app = appBtn.getAttribute('data-app');
      if (app) openApp(app);
      return;
    }

    const homeBtn = event.target.closest('[data-action="home"]');
    if (homeBtn) {
      goHome();
      return;
    }

    const openAppBtn = event.target.closest('[data-open-app]');
    if (openAppBtn) {
      const app = openAppBtn.getAttribute('data-open-app');
      if (app) openApp(app);
      return;
    }

    const unlockBtn = event.target.closest('[data-unlock-app]');
    if (unlockBtn) {
      const app = unlockBtn.getAttribute('data-unlock-app');
      if (app) {
        unlockApp(app);
        showToast('good', 'Unlocked', `${labelForApp(app)} unlocked.`);
        renderMessages();
      }
      return;
    }

    const cookieOpen = event.target.closest('[data-action="cookies-open"]');
    if (cookieOpen) {
      state.browser.lastChoice = null;
      saveState();
      renderBrowser();
      return;
    }

    const cookieChoice = event.target.closest('[data-cookie-choice]');
    if (cookieChoice) {
      const choice = cookieChoice.getAttribute('data-cookie-choice');
      if (choice === 'all' || choice === 'essential') handleCookieChoice(choice);
      return;
    }

    const clause = event.target.closest('[data-connectify-clause]');
    if (clause) {
      const id = clause.getAttribute('data-connectify-clause');
      if (id) handleConnectifyClause(id);
      return;
    }

    const connectifyChoice = event.target.closest('[data-connectify-choice]');
    if (connectifyChoice) {
      const choice = connectifyChoice.getAttribute('data-connectify-choice');
      if (choice === 'agree' || choice === 'decline') handleConnectifyChoice(choice);
      return;
    }

    const connectifyReset = event.target.closest('[data-connectify-reset]');
    if (connectifyReset) {
      resetConnectify();
      return;
    }

    const mapChange = event.target.closest('[data-action="mapme-change"]');
    if (mapChange) {
      state.mapme.location = null;
      saveState();
      renderMapMe();
      return;
    }

    const fgTerms = event.target.closest('[data-freegame-terms]');
    if (fgTerms) {
      const t = fgTerms.getAttribute('data-freegame-terms');
      state.freegame.terms = t === 'agree';
      saveState();
      if (state.freegame.terms) addFootprint('Device ID', 'fa-fingerprint', 'Super Puzzle Quest');
      renderFreeGame();
      checkMissionCompletion();
      return;
    }

    const fgTracking = event.target.closest('[data-freegame-tracking]');
    if (fgTracking) {
      const v = fgTracking.getAttribute('data-freegame-tracking');
      state.freegame.tracking = v === 'all' ? 'all' : 'essential';
      if (state.freegame.tracking === 'all') addFootprint('Ad tracking', 'fa-link', 'Super Puzzle Quest');
      saveState();
      renderFreeGame();
      checkMissionCompletion();
      return;
    }

    const fgAction = event.target.closest('[data-freegame-action]');
    if (fgAction) {
      const action = fgAction.getAttribute('data-freegame-action');
      if (action === 'photo') showToast('good', 'Profile', 'Profile photo updated.');
      if (action === 'invite') showToast('warn', 'Invites', 'Invites sent to your contacts.');
      if (action === 'tracking') {
        state.freegame.tracking = null;
        saveState();
        showToast('info', 'Tracking', 'Change your tracking choice.');
        renderFreeGame();
      }
      return;
    }

    const fgReset = event.target.closest('[data-freegame-reset]');
    if (fgReset) {
      resetFreeGame();
      return;
    }

    const resetBtn = event.target.closest('[data-reset="all"]');
    if (resetBtn) {
      resetAll();
    }
  });

  // Clicking overlay background closes permission prompt? keep it strict: only buttons.
};

const initialize = () => {
  els.statusTime = $('#status-time');
  els.toastContainer = $('#toast-container');
  els.screens = Array.from(document.querySelectorAll('.screen'));
  els.messagesBadge = $('#messages-badge');
  els.casefileDot = $('#casefile-dot');
  els.messagesContainer = $('#messages-container');
  els.browserBody = $('#browser-body');
  els.cookieBanner = $('#cookie-banner');
  els.connectifyBody = $('#connectify-body');
  els.mapmeBody = $('#mapme-body');
  els.freegameBody = $('#freegame-body');
  els.casefileBody = $('#casefile-body');
  els.settingsBody = $('#settings-body');

  els.permissionOverlay = $('#permission-overlay');
  els.permissionIcon = $('#permission-icon');
  els.permissionTitle = $('#permission-title');
  els.permissionDesc = $('#permission-desc');
  els.permissionButtons = $('#permission-buttons');

  updateClock();
  window.setInterval(updateClock, 1000);

  wireEvents();
  updateHomeIcons();
  updateBadges();
  renderMessages();
};

document.addEventListener('DOMContentLoaded', initialize);
