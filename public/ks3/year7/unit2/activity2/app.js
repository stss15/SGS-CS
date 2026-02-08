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
    triedEssential: false,
    interest: 'gaming', // used for personalisation when tracking cookies are ON
    lastViewed: null // product id (only saved when tracking cookies are ON)
  },
  connectify: {
    found: [],
    choice: null, // 'agree' | 'decline'
    tab: 'home' // 'home' | 'explore' | 'profile' (only used after agreeing)
  },
  mapme: {
    location: null, // 'precise' | 'approx' | 'none'
    triedPrecise: false,
    triedApprox: false,
    selectedPlace: 'school'
  },
  freegame: {
    terms: null, // true/false
    tracking: null, // 'all' | 'essential'
    camera: null, // true/false
    contacts: null, // true/false
    coins: 120,
    watchedAds: 0
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

const ui = {
  activeApp: 'home'
};

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
  missionPanel: null,
  missionPanelInner: null,
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

const recomputeMissionIndex = () => {
  const nextIndex = MISSIONS.findIndex((m) => !state.completedMissions.includes(m.id));
  state.missionIndex = nextIndex === -1 ? MISSIONS.length : nextIndex;
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
  renderSidePanel();
};

const addDiscovery = (id, title, desc) => {
  if (state.discoveries.some((d) => d.id === id)) return;
  state.discoveries.push({ id, title, desc });
  markCasefileNew();
  saveState();
  showToast('info', 'Discovery', title);
  renderSidePanel();
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

  if (screenId === 'home-screen') ui.activeApp = 'home';
  else if (screenId.startsWith('screen-')) ui.activeApp = screenId.replace('screen-', '');
  renderSidePanel();
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

const MISSION_PANEL_CONFIG = {
  browser: {
    kickerIcon: 'fa-cookie-bite',
    tips: [
      { title: 'Essential cookies', desc: 'Keep a website working.' },
      { title: 'Tracking cookies', desc: 'Follow what you view for ads.' }
    ]
  },
  connectify: {
    kickerIcon: 'fa-file-contract',
    tips: [
      { title: 'Terms', desc: 'Rules you agree to.' },
      { title: 'Data sharing', desc: 'Your data can go to other companies.' }
    ]
  },
  mapme: {
    kickerIcon: 'fa-location-dot',
    tips: [
      { title: 'Precise', desc: 'Exact address-level.' },
      { title: 'Approximate', desc: 'Rough area-level.' }
    ]
  },
  freegame: {
    kickerIcon: 'fa-gamepad',
    tips: [
      { title: 'If it is free…', desc: 'Sometimes you pay with your data.' },
      { title: 'Permissions', desc: 'Only allow what is needed.' }
    ]
  }
};

const getPanelContext = () => {
  const app = ui.activeApp;
  const missionForApp = MISSIONS.find((m) => m.app === app) || null;
  const mission = missionForApp || getActiveMission() || null;
  return { app, mission, missionForApp: Boolean(missionForApp) };
};

const panelChecklistItems = (missionId) => {
  if (missionId === 'browser') {
    return [
      {
        id: 'browser-all',
        label: 'Accept all cookies',
        help: 'Notice personalised recommendations.',
        done: state.browser.triedAll
      },
      {
        id: 'browser-essential',
        label: 'Try essential only',
        help: 'Notice generic content.',
        done: state.browser.triedEssential
      }
    ];
  }

  if (missionId === 'connectify') {
    return [
      {
        id: 'connectify-spot',
        label: 'Spot 2 suspicious clauses',
        help: 'Tap highlighted parts of the terms.',
        done: state.connectify.found.length >= 2
      },
      {
        id: 'connectify-choice',
        label: 'Make a choice',
        help: 'Agree or decline.',
        done: state.connectify.choice !== null
      }
    ];
  }

  if (missionId === 'mapme') {
    return [
      {
        id: 'mapme-precise',
        label: 'Try precise location',
        help: 'See what changes on the map.',
        done: state.mapme.triedPrecise
      },
      {
        id: 'mapme-approx',
        label: 'Try approximate location',
        help: 'Compare with precise.',
        done: state.mapme.triedApprox
      }
    ];
  }

  if (missionId === 'freegame') {
    return [
      { id: 'fg-terms', label: 'Terms choice', help: 'Agree or decline.', done: state.freegame.terms !== null },
      { id: 'fg-tracking', label: 'Tracking choice', help: 'Allow tracking or not.', done: state.freegame.tracking !== null },
      { id: 'fg-camera', label: 'Camera permission', help: 'Allow or deny.', done: state.freegame.camera !== null },
      { id: 'fg-contacts', label: 'Contacts permission', help: 'Allow or deny.', done: state.freegame.contacts !== null }
    ];
  }

  return [];
};

const SOURCE_BY_APP = {
  browser: 'Browser',
  connectify: 'Connectify',
  mapme: 'MapMe',
  freegame: 'Super Puzzle Quest'
};

const DISCOVERY_PREFIX_BY_APP = {
  browser: 'browser-',
  connectify: 'connectify-',
  mapme: 'mapme-',
  freegame: 'freegame-'
};

const renderImpactList = (items) => {
  if (items.length === 0) {
    return `<div class="impact-item"><div class="impact-icon"><i class="fa-solid fa-circle-info" aria-hidden="true"></i></div><div class="impact-text"><div class="impact-title">Nothing yet</div><div class="impact-subtitle">Make choices in the app to see the impact.</div></div></div>`;
  }

  return items
    .map(
      (it) => `
      <div class="impact-item">
        <div class="impact-icon"><i class="fa-solid ${escapeHtml(it.icon)}" aria-hidden="true"></i></div>
        <div class="impact-text">
          <div class="impact-title">${escapeHtml(it.title)}</div>
          <div class="impact-subtitle">${escapeHtml(it.subtitle)}</div>
        </div>
      </div>
    `
    )
    .join('');
};

const renderSidePanel = () => {
  if (!els.missionPanelInner) return;

  const { app, mission } = getPanelContext();
  const missionIndex = mission ? MISSIONS.findIndex((m) => m.id === mission.id) + 1 : MISSIONS.length;
  const missionId = mission ? mission.id : null;
  const missionTitle = mission ? mission.title : 'All missions complete';
  const missionNote = mission ? mission.note : 'Open Case File to review what was collected.';

  const checklist = missionId ? panelChecklistItems(missionId) : [];
  const checklistHtml =
    checklist.length === 0
      ? `<p class="panel-subtitle">No checklist.</p>`
      : `<div class="checklist">
          ${checklist
            .map(
              (c) => `
            <div class="check-item" data-done="${c.done ? 'true' : 'false'}">
              <div class="check-box"><i class="fa-solid ${c.done ? 'fa-check' : 'fa-minus'}" aria-hidden="true"></i></div>
              <div>
                <div class="check-label">${escapeHtml(c.label)}</div>
                <div class="check-help">${escapeHtml(c.help)}</div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>`;

  const appSource = app && SOURCE_BY_APP[app] ? SOURCE_BY_APP[app] : null;
  const appFootprint = appSource ? state.footprint.filter((f) => f.source === appSource) : state.footprint.slice();
  const appPrefix = app && DISCOVERY_PREFIX_BY_APP[app] ? DISCOVERY_PREFIX_BY_APP[app] : null;
  const appDiscoveries = appPrefix ? state.discoveries.filter((d) => d.id.startsWith(appPrefix)) : state.discoveries.slice();

  const impactItems = [
    ...appFootprint
      .slice(-5)
      .reverse()
      .map((f) => ({ icon: f.icon, title: f.item, subtitle: `Collected by ${f.source}` })),
    ...appDiscoveries
      .slice(-3)
      .reverse()
      .map((d) => ({ icon: 'fa-lightbulb', title: d.title, subtitle: d.desc }))
  ].slice(0, 7);

  const config = mission ? MISSION_PANEL_CONFIG[mission.app] : null;
  const tips = config?.tips || [];
  const tipsHtml =
    tips.length === 0
      ? ''
      : `<div class="panel-card">
          <h4 class="panel-card-title"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Key ideas</h4>
          <div class="impact-list">
            ${renderImpactList(
              tips.map((t) => ({ icon: 'fa-circle-check', title: t.title, subtitle: t.desc }))
            )}
          </div>
        </div>`;

  const resetTarget = ['browser', 'connectify', 'mapme', 'freegame'].includes(app) ? app : mission?.app || null;
  const canReset = resetTarget && isUnlocked(resetTarget);

  els.missionPanelInner.innerHTML = `
    <div class="panel-head">
      <div class="panel-kicker">
        <i class="fa-solid ${escapeHtml(config?.kickerIcon || 'fa-bullseye')}" aria-hidden="true"></i>
        Mission ${missionIndex}/${MISSIONS.length} • ${escapeHtml(labelForApp(app === 'home' ? (mission?.app || 'messages') : app))}
      </div>
      <h2 class="panel-title">${escapeHtml(missionTitle)}</h2>
      <p class="panel-subtitle">${escapeHtml(missionNote)}</p>
    </div>

    <div class="panel-card">
      <h4 class="panel-card-title"><i class="fa-solid fa-list-check" aria-hidden="true"></i> Checklist</h4>
      ${checklistHtml}
    </div>

    ${tipsHtml}

    <div class="panel-card">
      <h4 class="panel-card-title"><i class="fa-solid fa-clipboard" aria-hidden="true"></i> Impact</h4>
      <div class="impact-list">
        ${renderImpactList(impactItems)}
      </div>
    </div>

    <div class="panel-card">
      <h4 class="panel-card-title"><i class="fa-solid fa-gear" aria-hidden="true"></i> Controls</h4>
      <div class="panel-actions">
        <button class="btn" type="button" data-action="reset-app" ${canReset ? '' : 'disabled'} ${resetTarget ? `data-reset-app="${escapeHtml(resetTarget)}"` : ''}>
          <i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset
        </button>
        <button class="btn btn-primary" type="button" data-open-app="casefile">
          <i class="fa-solid fa-folder-open" aria-hidden="true"></i> Case File
        </button>
      </div>
      <div class="btn-row" style="margin-top:10px;">
        <button class="btn" type="button" data-reset="all"><i class="fa-solid fa-trash-arrow-up" aria-hidden="true"></i> Reset everything</button>
      </div>
    </div>
  `;
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

  renderSidePanel();
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

const BROWSER_INTERESTS = [
  { id: 'gaming', label: 'Gaming', icon: 'fa-gamepad' },
  { id: 'sports', label: 'Sports', icon: 'fa-futbol' },
  { id: 'music', label: 'Music', icon: 'fa-music' },
  { id: 'fashion', label: 'Fashion', icon: 'fa-shirt' }
];

const BROWSER_CATALOG = {
  generic: [
    { id: 'gen-water', name: 'Water bottle', price: '£6.99', icon: 'fa-droplet', tone: 'cool' },
    { id: 'gen-notes', name: 'Notebook pack', price: '£3.49', icon: 'fa-book', tone: 'sun' },
    { id: 'gen-backpack', name: 'Backpack', price: '£24.99', icon: 'fa-bag-shopping', tone: 'ink' },
    { id: 'gen-earbuds', name: 'Wireless earbuds', price: '£19.99', icon: 'fa-headphones', tone: 'cool' },
    { id: 'gen-hoodie', name: 'Comfy hoodie', price: '£22.00', icon: 'fa-shirt', tone: 'rose' }
  ],
  gaming: [
    { id: 'gm-headset', name: 'Pro gaming headset', price: '£59.99', icon: 'fa-headphones', tone: 'ink' },
    { id: 'gm-keyboard', name: 'RGB keyboard', price: '£29.99', icon: 'fa-keyboard', tone: 'cool' },
    { id: 'gm-mouse', name: 'Gaming mouse', price: '£19.99', icon: 'fa-computer-mouse', tone: 'sun' },
    { id: 'gm-led', name: 'LED strip lights', price: '£14.99', icon: 'fa-lightbulb', tone: 'rose' },
    { id: 'gm-chair', name: 'Desk chair', price: '£79.00', icon: 'fa-chair', tone: 'ink' }
  ],
  sports: [
    { id: 'sp-bottle', name: 'Sports bottle', price: '£8.99', icon: 'fa-bottle-water', tone: 'cool' },
    { id: 'sp-trainers', name: 'Trainers', price: '£39.99', icon: 'fa-shoe-prints', tone: 'ink' },
    { id: 'sp-ball', name: 'Football', price: '£12.50', icon: 'fa-futbol', tone: 'sun' },
    { id: 'sp-watch', name: 'Fitness watch', price: '£29.00', icon: 'fa-stopwatch', tone: 'rose' },
    { id: 'sp-bag', name: 'Gym bag', price: '£18.00', icon: 'fa-dumbbell', tone: 'ink' }
  ],
  music: [
    { id: 'mu-speaker', name: 'Bluetooth speaker', price: '£24.99', icon: 'fa-volume-high', tone: 'cool' },
    { id: 'mu-phones', name: 'Headphones', price: '£34.99', icon: 'fa-headphones-simple', tone: 'ink' },
    { id: 'mu-mic', name: 'Mini microphone', price: '£12.99', icon: 'fa-microphone', tone: 'rose' },
    { id: 'mu-light', name: 'Mood light', price: '£9.99', icon: 'fa-lightbulb', tone: 'sun' },
    { id: 'mu-case', name: 'Phone case', price: '£6.00', icon: 'fa-mobile-screen', tone: 'cool' }
  ],
  fashion: [
    { id: 'fa-hoodie', name: 'Hoodie', price: '£22.00', icon: 'fa-shirt', tone: 'rose' },
    { id: 'fa-shoes', name: 'Trendy trainers', price: '£44.00', icon: 'fa-shoe-prints', tone: 'ink' },
    { id: 'fa-cap', name: 'Cap', price: '£9.50', icon: 'fa-hat-cowboy', tone: 'sun' },
    { id: 'fa-bag', name: 'Mini bag', price: '£15.00', icon: 'fa-bag-shopping', tone: 'cool' },
    { id: 'fa-jacket', name: 'Jacket', price: '£39.00', icon: 'fa-user-tie', tone: 'ink' }
  ]
};

const BROWSER_DEALS = [
  { id: 'dl-pens', name: 'Colour pens (12)', price: '£2.99', icon: 'fa-pen-fancy', tone: 'sun' },
  { id: 'dl-socks', name: 'Cosy socks', price: '£4.50', icon: 'fa-socks', tone: 'rose' },
  { id: 'dl-charger', name: 'USB charger', price: '£6.99', icon: 'fa-bolt', tone: 'cool' },
  { id: 'dl-snack', name: 'Snack box', price: '£5.99', icon: 'fa-cookie-bite', tone: 'sun' }
];

const getBrowserProductById = (id) => {
  const all = [
    ...BROWSER_CATALOG.generic,
    ...BROWSER_CATALOG.gaming,
    ...BROWSER_CATALOG.sports,
    ...BROWSER_CATALOG.music,
    ...BROWSER_CATALOG.fashion,
    ...BROWSER_DEALS
  ];
  return all.find((p) => p.id === id) || null;
};

const renderBrowserProductCard = (product, { compact = false } = {}) => `
  <button class="product-card ${compact ? 'product-card--compact' : ''}" type="button" data-browser-product="${escapeHtml(product.id)}">
    <div class="product-art" data-tone="${escapeHtml(product.tone || 'ink')}">
      <i class="fa-solid ${escapeHtml(product.icon)}" aria-hidden="true"></i>
    </div>
    <div class="product-meta">
      <div class="product-name">${escapeHtml(product.name)}</div>
      <div class="product-price">${escapeHtml(product.price)}</div>
    </div>
  </button>
`;

const renderBrowser = () => {
  const cookieState = state.browser.lastChoice;
  const triedCount = (state.browser.triedAll ? 1 : 0) + (state.browser.triedEssential ? 1 : 0);
  const interestId = state.browser.interest || 'gaming';
  const interest = BROWSER_INTERESTS.find((i) => i.id === interestId) || BROWSER_INTERESTS[0];
  const trackingOn = cookieState === 'all';

  const recommended = trackingOn
    ? BROWSER_CATALOG[interestId] || BROWSER_CATALOG.gaming
    : BROWSER_CATALOG.generic;

  const viewed = trackingOn && state.browser.lastViewed ? getBrowserProductById(state.browser.lastViewed) : null;

  const sponsor =
    cookieState === 'all'
      ? viewed
        ? {
            title: `Still thinking about ${viewed.name}?`,
            subtitle: 'This is personalised using tracking cookies.',
            tone: 'bad'
          }
        : {
            title: `Top picks for ${interest.label}`,
            subtitle: 'This is personalised using tracking cookies.',
            tone: 'bad'
          }
      : cookieState === 'essential'
      ? {
          title: 'Weekend sale: up to 30% off',
          subtitle: 'Generic ad (no tracking cookies).',
          tone: 'good'
        }
      : {
          title: 'Ads will appear here',
          subtitle: 'Choose cookie settings to continue.',
          tone: 'info'
        };

  const trackingChip =
    cookieState === 'all'
      ? { label: 'Tracking: ON', tone: 'danger', icon: 'fa-cookie-bite' }
      : cookieState === 'essential'
      ? { label: 'Tracking: OFF', tone: 'good', icon: 'fa-shield-halved' }
      : { label: 'Cookies: choose', tone: 'neutral', icon: 'fa-cookie-bite' };

  els.browserBody.innerHTML = `
    <div class="browser-toolbar">
      <div class="url-pill" aria-label="Address bar">
        <i class="fa-solid fa-lock" aria-hidden="true"></i>
        <span>shop-everything.com</span>
      </div>
      <button class="icon-btn" type="button" data-action="cookies-open" aria-label="Cookie settings">
        <i class="fa-solid fa-cookie-bite" aria-hidden="true"></i>
      </button>
      <button class="icon-btn" type="button" data-open-app="casefile" aria-label="Open Case File">
        <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
      </button>
    </div>

    <div class="store-hero">
      <div class="store-brand">
        <div class="brand-mark" aria-hidden="true">SE</div>
        <div>
          <div class="store-title">ShopEverything</div>
          <div class="store-tagline">Deals today</div>
        </div>
      </div>

      <div class="status-row" aria-label="Status">
        <span class="status-chip" data-tone="${escapeHtml(trackingChip.tone)}"><i class="fa-solid ${escapeHtml(trackingChip.icon)}" aria-hidden="true"></i> ${escapeHtml(trackingChip.label)}</span>
        <span class="status-chip" data-tone="neutral"><i class="fa-solid fa-list-check" aria-hidden="true"></i> Mission: ${triedCount}/2</span>
      </div>

      <div class="search-bar" role="search" aria-label="Search">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <span class="search-placeholder">Search</span>
        <i class="fa-solid fa-microphone" aria-hidden="true"></i>
      </div>

      <div class="category-row" aria-label="Categories">
        ${BROWSER_INTERESTS.map((item) => `
          <button class="chip-btn ${item.id === interestId ? 'is-active' : ''}" type="button" data-browser-interest="${escapeHtml(item.id)}">
            <i class="fa-solid ${escapeHtml(item.icon)}" aria-hidden="true"></i> ${escapeHtml(item.label)}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="store-section">
      <div class="section-head">
        <h4>${trackingOn ? 'Recommended for you' : 'Popular right now'}</h4>
        <span class="section-tag" data-tone="${trackingOn ? 'danger' : 'neutral'}">${trackingOn ? 'Personalised' : 'Generic'}</span>
      </div>
      <div class="product-strip" aria-label="Recommended products">
        ${recommended.map((p) => renderBrowserProductCard(p)).join('')}
      </div>
    </div>

    <div class="store-section">
      <div class="sponsor-banner" data-tone="${escapeHtml(sponsor.tone)}">
        <div class="sponsor-kicker">Sponsored</div>
        <div class="sponsor-title">${escapeHtml(sponsor.title)}</div>
        <div class="sponsor-subtitle">${escapeHtml(sponsor.subtitle)}</div>
      </div>
    </div>

    <div class="store-section">
      <div class="section-head">
        <h4>Deals</h4>
        <span class="section-tag" data-tone="neutral">Today</span>
      </div>
      <div class="deal-grid" aria-label="Deals grid">
        ${BROWSER_DEALS.map((p) => renderBrowserProductCard(p, { compact: true })).join('')}
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
    addDiscovery('browser-tracking', 'Tracking cookies personalise ads', 'Tracking cookies can remember what you view to target ads.');
    showToast('warn', 'Cookies', 'Tracking cookies enabled.');
  } else {
    state.browser.triedEssential = true;
    addDiscovery('browser-essential', 'Essential cookies keep sites working', 'Essential cookies help a site run without tracking you.');
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
  const trackingOn = state.browser.lastChoice === 'all';
  const interestId = state.browser.interest || 'gaming';
  const interest = BROWSER_INTERESTS.find((i) => i.id === interestId) || BROWSER_INTERESTS[0];

  const renderTermHighlight = (id, text) => {
    const found = state.connectify.found.includes(id);
    return `
      <button class="term-highlight ${found ? 'is-found' : ''}" type="button" data-connectify-clause="${escapeHtml(id)}">
        ${escapeHtml(text)}
        ${found ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : ''}
      </button>
    `;
  };

  if (!choice) {
    const choiceDisabled = foundCount < 2;
    els.connectifyBody.innerHTML = `
      <div class="connectify-shell">
        <div class="connectify-top">
          <div class="connectify-mark" aria-hidden="true"><i class="fa-solid fa-heart"></i></div>
          <div class="connectify-brand">
            <div class="connectify-name">Connectify</div>
            <div class="connectify-tag">Social • Chat • Share</div>
          </div>
          <button class="connectify-top-btn" type="button" data-open-app="casefile" aria-label="Open Case File">
            <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
          </button>
        </div>

        <div class="connectify-scroll">
          <div class="connectify-onboard">
            <div class="connectify-onboard-title">Before you join</div>
            <div class="connectify-onboard-sub">Tap any highlighted part you think is risky.</div>
            <div class="connectify-pill-row">
              <span class="connectify-pill"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Found ${foundCount}/3</span>
              <span class="connectify-pill"><i class="fa-solid fa-user-shield" aria-hidden="true"></i> You decide</span>
            </div>
          </div>

          <div class="connectify-sheet">
            <div class="connectify-sheet-head">
              <div>
                <div class="connectify-sheet-title">Terms &amp; privacy</div>
                <div class="connectify-sheet-sub">Short version (still important).</div>
              </div>
              <div class="connectify-sheet-badge" data-tone="${choiceDisabled ? 'warn' : 'good'}">
                <i class="fa-solid ${choiceDisabled ? 'fa-lock' : 'fa-unlock'}" aria-hidden="true"></i>
                ${choiceDisabled ? 'Find 2' : 'Unlocked'}
              </div>
            </div>

            <div class="connectify-terms">
              <p>By using Connectify you agree that we can ${renderTermHighlight('data-retention', 'keep your data forever')}.</p>
              <p>We may ${renderTermHighlight('background-location', 'track your location often')} even when you are not using the app.</p>
              <p>We may ${renderTermHighlight('data-sharing', 'share data with partner companies')} to improve ads and recommendations.</p>
              <p class="connectify-terms-small">Tip: If you do not understand a clause, do not tap “Agree” yet.</p>
            </div>

            <div class="connectify-actions">
              <button class="btn btn-primary" type="button" data-connectify-choice="agree" ${choiceDisabled ? 'disabled' : ''}>
                <i class="fa-solid fa-check" aria-hidden="true"></i> Agree
              </button>
              <button class="btn" type="button" data-connectify-choice="decline" ${choiceDisabled ? 'disabled' : ''}>
                <i class="fa-solid fa-xmark" aria-hidden="true"></i> Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  if (choice === 'decline') {
    els.connectifyBody.innerHTML = `
      <div class="connectify-shell connectify-shell--blocked">
        <div class="connectify-blocked">
          <div class="connectify-blocked-icon" aria-hidden="true"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="connectify-blocked-title">You declined</div>
          <div class="connectify-blocked-sub">Connectify stays locked. Your data is safer.</div>
          <div class="btn-row">
            <button class="btn btn-primary" type="button" data-connectify-reset><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Try again</button>
            <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> Case File</button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // choice === 'agree'
  const tab = state.connectify.tab || 'home';

  const sponsor = trackingOn
    ? { title: `Ad: ${interest.label} deal`, subtitle: 'Personalised using shared data.', tone: 'bad' }
    : { title: 'Ad: Weekend deal', subtitle: 'Generic ad (limited tracking).', tone: 'good' };

  const suggestedTitle = trackingOn ? `Suggested for you: ${interest.label}` : 'Trending right now';
  const suggestedSubtitle = trackingOn ? 'This can happen when apps share data.' : 'No personal data needed.';

  const feedHome = `
    <div class="connectify-stories" aria-label="Stories">
      ${['Aisha', 'Ben', 'Chloe', 'Diego', 'Fatima', 'Jay'].map((name) => `
        <button class="story" type="button" aria-label="Story: ${escapeHtml(name)}">
          <span class="story-avatar" aria-hidden="true">${escapeHtml(name[0])}</span>
          <span class="story-name">${escapeHtml(name)}</span>
        </button>
      `).join('')}
    </div>

    <div class="post">
      <div class="post-head">
        <span class="post-avatar" aria-hidden="true">T</span>
        <div class="post-meta">
          <div class="post-user">Taylor</div>
          <div class="post-time">Just now</div>
        </div>
      </div>
      <div class="post-body">
        <div class="post-text">New profile pic. Thoughts?</div>
        <div class="post-media" aria-hidden="true"><i class="fa-solid fa-camera"></i></div>
      </div>
      <div class="post-actions" aria-label="Post actions">
        <button class="post-action" type="button"><i class="fa-solid fa-heart" aria-hidden="true"></i> Like</button>
        <button class="post-action" type="button"><i class="fa-solid fa-comment" aria-hidden="true"></i> Comment</button>
        <button class="post-action" type="button"><i class="fa-solid fa-share" aria-hidden="true"></i> Share</button>
      </div>
    </div>

    <div class="connectify-sponsor" data-tone="${escapeHtml(sponsor.tone)}">
      <div class="connectify-sponsor-kicker">Sponsored</div>
      <div class="connectify-sponsor-title">${escapeHtml(sponsor.title)}</div>
      <div class="connectify-sponsor-sub">${escapeHtml(sponsor.subtitle)}</div>
    </div>

    <div class="connectify-suggest">
      <div class="connectify-suggest-title">${escapeHtml(suggestedTitle)}</div>
      <div class="connectify-suggest-sub">${escapeHtml(suggestedSubtitle)}</div>
      <div class="connectify-pill-row" style="margin-top:10px;">
        <span class="connectify-pill"><i class="fa-solid fa-users" aria-hidden="true"></i> ${trackingOn ? escapeHtml(`${interest.label} Club`) : 'Study club'}</span>
        <span class="connectify-pill"><i class="fa-solid fa-star" aria-hidden="true"></i> ${trackingOn ? '“Just for you”' : 'Popular'}</span>
      </div>
    </div>
  `;

  const feedExplore = `
    <div class="connectify-explore">
      <div class="connectify-explore-title">Explore</div>
      <div class="connectify-explore-sub">Tap a topic.</div>
      <div class="connectify-explore-grid">
        ${[
          { icon: 'fa-face-smile', label: 'Memes' },
          { icon: 'fa-futbol', label: 'Sports' },
          { icon: 'fa-music', label: 'Music' },
          { icon: 'fa-gamepad', label: 'Games' },
          { icon: 'fa-palette', label: 'Art' },
          { icon: 'fa-book', label: 'School' }
        ].map((t) => `
          <button class="explore-chip" type="button">
            <i class="fa-solid ${escapeHtml(t.icon)}" aria-hidden="true"></i>
            <span>${escapeHtml(t.label)}</span>
          </button>
        `).join('')}
      </div>
      <div class="connectify-note">Notice: apps can learn what you tap.</div>
    </div>
  `;

  const profile = `
    <div class="connectify-profile">
      <div class="profile-card">
        <div class="profile-avatar" aria-hidden="true">JD</div>
        <div>
          <div class="profile-name">John Doe</div>
          <div class="profile-sub">Joined today</div>
        </div>
      </div>

      <div class="profile-sheet">
        <div class="profile-sheet-title">Privacy snapshot</div>
        <div class="profile-rows">
          <div class="profile-row"><span>Terms</span><strong>Accepted</strong></div>
          <div class="profile-row"><span>Partner sharing</span><strong>Allowed</strong></div>
          <div class="profile-row"><span>Data retention</span><strong>Forever</strong></div>
        </div>
        <div class="btn-row" style="margin-top:12px;">
          <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> Case File</button>
          <button class="btn btn-primary" type="button" data-connectify-reset><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Restart</button>
        </div>
      </div>
    </div>
  `;

  const content = tab === 'explore' ? feedExplore : tab === 'profile' ? profile : feedHome;

  els.connectifyBody.innerHTML = `
    <div class="connectify-shell connectify-shell--feed">
      <div class="connectify-feed-top">
        <div class="connectify-mini-avatar" aria-hidden="true">JD</div>
        <div class="connectify-search" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i> Search</div>
        <button class="connectify-top-btn" type="button" data-open-app="casefile" aria-label="Open Case File">
          <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
        </button>
      </div>

      <div class="connectify-scroll">
        ${content}
      </div>

      <nav class="connectify-nav" aria-label="Connectify navigation">
        <button class="nav-btn ${tab === 'home' ? 'is-active' : ''}" type="button" data-connectify-tab="home">
          <i class="fa-solid fa-house" aria-hidden="true"></i>
          <span>Home</span>
        </button>
        <button class="nav-btn ${tab === 'explore' ? 'is-active' : ''}" type="button" data-connectify-tab="explore">
          <i class="fa-solid fa-compass" aria-hidden="true"></i>
          <span>Explore</span>
        </button>
        <button class="nav-btn ${tab === 'profile' ? 'is-active' : ''}" type="button" data-connectify-tab="profile">
          <i class="fa-solid fa-user" aria-hidden="true"></i>
          <span>You</span>
        </button>
      </nav>
    </div>
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
    state.connectify.tab = 'home';
    addFootprint('Profile info', 'fa-user', 'Connectify');
    addFootprint('Interests', 'fa-heart', 'Connectify');
    // Even if you did not spot them, agreeing means you accepted them.
    addFootprint('Data kept forever', 'fa-infinity', 'Connectify');
    addFootprint('Background location pings', 'fa-location-dot', 'Connectify');
    addFootprint('Shared with partners', 'fa-share-nodes', 'Connectify');
    addDiscovery('connectify-accepted', 'You accepted the terms', 'Once you tap “Agree”, the app can use the terms you accepted.');
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
      ? { title: 'Precise', detail: 'Exact spot', tone: 'bad' }
      : loc === 'approx'
      ? { title: 'Approx', detail: 'Rough area', tone: 'good' }
      : { title: 'Off', detail: 'No location', tone: 'info' };

  const PLACES = [
    { id: 'school', name: 'School', icon: 'fa-school', x: 22, y: 46, address: 'St George\'s School' },
    { id: 'park', name: 'Park', icon: 'fa-tree', x: 62, y: 28, address: 'Riverside Park' },
    { id: 'shops', name: 'Shops', icon: 'fa-store', x: 56, y: 72, address: 'City Shops' }
  ];

  const you = { x: 74, y: 54 };
  const selected = PLACES.find((p) => p.id === state.mapme.selectedPlace) || PLACES[0];

  const distanceLabelFor = (place) => {
    const dx = place.x - you.x;
    const dy = place.y - you.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const miles = Math.max(0.2, dist / 22).toFixed(1);
    if (loc === 'precise') return `${miles} mi`;
    if (loc === 'approx') return `~${miles} mi`;
    return '—';
  };

  const placeButton = (place) => `
    <button class="place-btn ${place.id === selected.id ? 'is-active' : ''}" type="button" data-mapme-place="${escapeHtml(place.id)}">
      <span class="place-icon" aria-hidden="true"><i class="fa-solid ${escapeHtml(place.icon)}"></i></span>
      <span class="place-name">${escapeHtml(place.name)}</span>
      <span class="place-dist">${escapeHtml(distanceLabelFor(place))}</span>
    </button>
  `;

  els.mapmeBody.innerHTML = `
    <div class="mapme-shell">
      <div class="mapme-top">
        <div class="mapme-search" role="search" aria-label="Search">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <span>Search places</span>
        </div>
        <button class="mapme-top-btn" type="button" data-action="mapme-change" aria-label="Change location">
          <i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i>
        </button>
        <button class="mapme-top-btn" type="button" data-open-app="casefile" aria-label="Open Case File">
          <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
        </button>
      </div>

      <div class="mapme-map" aria-label="Map">
        ${PLACES.map((p) => `
          <button class="map-pin ${p.id === selected.id ? 'is-active' : ''}" type="button" data-mapme-place="${escapeHtml(p.id)}" style="left:${p.x}%; top:${p.y}%;">
            <i class="fa-solid ${escapeHtml(p.icon)}" aria-hidden="true"></i>
            <span class="sr-only">${escapeHtml(p.name)}</span>
          </button>
        `).join('')}

        ${loc === 'none'
          ? `<div class="mapme-hint"><i class="fa-solid fa-eye-slash" aria-hidden="true"></i> Location is off</div>`
          : `
            <div class="you-wrap" style="left:${you.x}%; top:${you.y}%;">
              <div class="you-dot" data-mode="${escapeHtml(loc)}" aria-hidden="true"></div>
              ${loc === 'approx' ? `<div class="you-radius" aria-hidden="true"></div>` : ''}
            </div>
          `}
      </div>

      <div class="mapme-sheet" aria-label="Nearby places">
        <div class="mapme-sheet-head">
          <div class="mapme-sheet-title"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> MapMe</div>
          <div class="mapme-sheet-badges">
            <span class="mapme-badge" data-tone="${escapeHtml(status.tone)}">${escapeHtml(status.title)}</span>
            <span class="mapme-badge" data-tone="neutral">Tried ${triedCount}/2</span>
          </div>
        </div>

        <div class="place-list">
          ${PLACES.map(placeButton).join('')}
        </div>

        <div class="place-detail">
          <div class="place-detail-title">${escapeHtml(selected.address)}</div>
          <div class="place-detail-sub">
            ${loc === 'precise'
              ? 'Precise mode can reveal your exact routine.'
              : loc === 'approx'
              ? 'Approx mode still works without your exact address.'
              : 'You can still browse places without sharing location.'}
          </div>
        </div>
      </div>
    </div>
  `;
};

const setMapLocation = (value) => {
  hidePermissionDialog();
  state.mapme.location = value;
  if (value === 'precise') {
    state.mapme.triedPrecise = true;
    addFootprint('Exact location', 'fa-location-crosshairs', 'MapMe');
    addDiscovery('mapme-precise', 'Precise location is very specific', 'With precise location, an app can learn your exact address and routine.');
    showToast('warn', 'Location', 'Precise location shared.');
  } else if (value === 'approx') {
    state.mapme.triedApprox = true;
    addFootprint('General area', 'fa-map', 'MapMe');
    addDiscovery('mapme-approx', 'Approximate location is safer', 'Approximate location shares a rough area instead of your exact address.');
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
  const trackingOn = fg.tracking === 'all';
  const interestId = state.browser.interest || 'gaming';
  const interest = BROWSER_INTERESTS.find((i) => i.id === interestId) || BROWSER_INTERESTS[0];

  if (fg.terms === null) {
    els.freegameBody.innerHTML = `
      <div class="game-shell game-shell--splash">
        <div class="game-hero">
          <div class="game-logo" aria-hidden="true"><i class="fa-solid fa-puzzle-piece"></i></div>
          <div class="game-title">Super Puzzle Quest</div>
          <div class="game-sub">FREE to play</div>
          <div class="game-badges">
            <span class="game-badge"><i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> Ads</span>
            <span class="game-badge"><i class="fa-solid fa-user-shield" aria-hidden="true"></i> Permissions</span>
          </div>
        </div>

        <div class="game-card">
          <div class="game-card-title">Before you play</div>
          <div class="game-card-sub">Some free apps ask for data.</div>
          <div class="btn-row">
            <button class="btn btn-primary" type="button" data-freegame-terms="agree"><i class="fa-solid fa-play" aria-hidden="true"></i> Play</button>
            <button class="btn" type="button" data-freegame-terms="decline"><i class="fa-solid fa-xmark" aria-hidden="true"></i> No thanks</button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  if (fg.terms === false) {
    els.freegameBody.innerHTML = `
      <div class="game-shell game-shell--blocked">
        <div class="game-blocked">
          <div class="game-blocked-icon" aria-hidden="true"><i class="fa-solid fa-hand"></i></div>
          <div class="game-blocked-title">You declined</div>
          <div class="game-blocked-sub">Some apps block you unless you agree.</div>
          <div class="btn-row">
            <button class="btn btn-primary" type="button" data-freegame-reset><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Try again</button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Terms agreed; next: tracking choice
  if (fg.tracking === null) {
    els.freegameBody.innerHTML = `
      <div class="game-shell">
        <div class="game-card">
          <div class="game-card-title">Ad tracking</div>
          <div class="game-card-sub">Choose one option.</div>
          <div class="game-choice-grid">
            <button class="choice-tile choice-tile--danger" type="button" data-freegame-tracking="all">
              <i class="fa-solid fa-cookie-bite" aria-hidden="true"></i>
              <div class="choice-title">Allow tracking</div>
              <div class="choice-sub">More personalised ads</div>
            </button>
            <button class="choice-tile choice-tile--good" type="button" data-freegame-tracking="essential">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <div class="choice-title">Essential only</div>
              <div class="choice-sub">Less tracking</div>
            </button>
          </div>
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
      <div class="game-shell">
        <div class="game-card">
          <div class="game-card-title">Camera permission</div>
          <div class="game-card-sub">Choose in the pop-up.</div>
        </div>
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
      <div class="game-shell">
        <div class="game-card">
          <div class="game-card-title">Contacts permission</div>
          <div class="game-card-sub">Choose in the pop-up.</div>
        </div>
      </div>
    `;
    return;
  }

  // After decisions, show "game home"
  const shared = [];
  if (fg.tracking === 'all') shared.push('Tracking');
  if (fg.camera === true) shared.push('Camera');
  if (fg.contacts === true) shared.push('Contacts');

  const adTitle = trackingOn ? `Deal for ${interest.label} fans` : 'Deal of the day';
  const adSubtitle = trackingOn ? 'Personalised ad (tracking ON).' : 'Generic ad (limited tracking).';
  const adTone = trackingOn ? 'bad' : 'good';

  const coins = typeof fg.coins === 'number' ? fg.coins : 0;
  const watched = typeof fg.watchedAds === 'number' ? fg.watchedAds : 0;

  els.freegameBody.innerHTML = `
    <div class="game-shell">
      <div class="game-hud">
        <div class="hud-left">
          <div class="hud-avatar ${fg.camera ? 'is-live' : ''}" aria-hidden="true">${fg.camera ? 'JD' : '<i class="fa-solid fa-user"></i>'}</div>
          <div>
            <div class="hud-name">Player</div>
            <div class="hud-sub">${fg.camera ? 'Avatar set' : 'Avatar locked'}</div>
          </div>
        </div>
        <div class="hud-right">
          <div class="hud-chip"><i class="fa-solid fa-coins" aria-hidden="true"></i> ${coins}</div>
          <div class="hud-chip"><i class="fa-solid fa-eye" aria-hidden="true"></i> Ads: ${watched}</div>
        </div>
      </div>

      <div class="game-scroll">
        <div class="game-ad" data-tone="${escapeHtml(adTone)}">
          <div class="game-ad-kicker">Ad</div>
          <div class="game-ad-title">${escapeHtml(adTitle)}</div>
          <div class="game-ad-sub">${escapeHtml(adSubtitle)}</div>
          <button class="game-ad-btn" type="button" data-freegame-action="watch-ad">
            <i class="fa-solid fa-circle-play" aria-hidden="true"></i> Watch for coins
          </button>
        </div>

        <div class="game-card">
          <div class="game-card-title">Levels</div>
          <div class="level-grid" aria-label="Level grid">
            ${Array.from({ length: 9 }).map((_, idx) => `
              <button class="level-btn" type="button" data-freegame-level="${idx + 1}">
                <span class="level-num">${idx + 1}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="game-card">
          <div class="game-card-title">Features</div>
          <div class="feature-grid">
            <button class="feature-btn" type="button" data-freegame-action="photo" ${fg.camera ? '' : 'disabled'}>
              <i class="fa-solid fa-camera" aria-hidden="true"></i>
              <span>Avatar photo</span>
            </button>
            <button class="feature-btn" type="button" data-freegame-action="invite" ${fg.contacts ? '' : 'disabled'}>
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
              <span>Invite friends</span>
            </button>
            <button class="feature-btn" type="button" data-freegame-action="tracking">
              <i class="fa-solid fa-cookie-bite" aria-hidden="true"></i>
              <span>Tracking</span>
            </button>
            <button class="feature-btn" type="button" data-freegame-reset>
              <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
              <span>Restart</span>
            </button>
          </div>
          <div class="game-note">Shared: ${shared.length ? escapeHtml(shared.join(', ')) : 'very little'}.</div>
        </div>

        ${
          fg.contacts
            ? `<div class="game-card">
                <div class="game-card-title">Friends leaderboard</div>
                <div class="leader-row"><span>Aisha</span><strong>120</strong></div>
                <div class="leader-row"><span>Ben</span><strong>90</strong></div>
                <div class="leader-row"><span>Chloe</span><strong>70</strong></div>
              </div>`
            : `<div class="game-card">
                <div class="game-card-title">Friends leaderboard</div>
                <div class="game-card-sub">Locked (no contacts permission).</div>
              </div>`
        }

        <div class="btn-row">
          <button class="btn" type="button" data-open-app="casefile"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> Case File</button>
        </div>
      </div>
    </div>
  `;

  checkMissionCompletion();
};

const setFreeGamePermission = (key, value) => {
  hidePermissionDialog();
  state.freegame[key] = value;
  if (key === 'camera' && value === true) {
    addFootprint('Camera access', 'fa-camera', 'Super Puzzle Quest');
    addDiscovery('freegame-camera', 'Camera permission', 'If you allow it, an app can access your camera.');
  }
  if (key === 'contacts' && value === true) addFootprint('Contacts list', 'fa-address-book', 'Super Puzzle Quest');
  if (key === 'contacts' && value === true) addDiscovery('freegame-contacts', 'Contacts permission', 'Apps can read your contacts list if you allow it.');
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

const resetAppState = (app) => {
  if (!['browser', 'connectify', 'mapme', 'freegame'].includes(app)) return;

  if (app === 'browser') state.browser = clone(DEFAULT_STATE.browser);
  if (app === 'connectify') state.connectify = clone(DEFAULT_STATE.connectify);
  if (app === 'mapme') state.mapme = clone(DEFAULT_STATE.mapme);
  if (app === 'freegame') state.freegame = clone(DEFAULT_STATE.freegame);

  const source = SOURCE_BY_APP[app];
  if (source) state.footprint = state.footprint.filter((f) => f.source !== source);

  const prefix = DISCOVERY_PREFIX_BY_APP[app];
  if (prefix) state.discoveries = state.discoveries.filter((d) => !String(d.id).startsWith(prefix));

  const mission = MISSIONS.find((m) => m.app === app);
  if (mission) state.completedMissions = state.completedMissions.filter((id) => id !== mission.id);
  recomputeMissionIndex();

  state.casefileHasNew = true;
  state.unreadMessages = Math.max(state.unreadMessages, 1);
  saveState();
  updateBadges();
  updateHomeIcons();
  showToast('info', 'Reset', `${labelForApp(app)} reset.`);

  if (ui.activeApp === app) openApp(app);
  else renderSidePanel();
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

  renderSidePanel();
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

  renderSidePanel();
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
  recomputeMissionIndex();
  saveState();
  updateBadges();
  updateHomeIcons();
  showToast('good', 'Mission complete', 'Check Messages for the next mission.');
  renderSidePanel();
};

const wireEvents = () => {
  document.addEventListener('click', (event) => {
    const notesToggle = event.target.closest('[data-action="toggle-notes"]');
    if (notesToggle && els.missionPanel) {
      const isOpen = els.missionPanel.classList.toggle('is-open');
      notesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) els.missionPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

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

    const browserInterest = event.target.closest('[data-browser-interest]');
    if (browserInterest) {
      const interestId = browserInterest.getAttribute('data-browser-interest');
      if (!interestId) return;
      state.browser.interest = interestId;
      saveState();
      renderBrowser();
      const picked = BROWSER_INTERESTS.find((i) => i.id === interestId);
      if (state.browser.lastChoice === 'all') {
        showToast('warn', 'For you', `Now showing: ${picked ? picked.label : 'recommendations'}.`);
      } else {
        showToast('info', 'Popular', 'Tracking is OFF.');
      }
      return;
    }

    const browserProduct = event.target.closest('[data-browser-product]');
    if (browserProduct) {
      const productId = browserProduct.getAttribute('data-browser-product');
      if (!productId) return;
      const product = getBrowserProductById(productId);
      if (!product) return;

      if (state.browser.lastChoice === 'all') {
        state.browser.lastViewed = productId;
        saveState();
        renderBrowser();
        showToast('bad', 'Viewed', `${product.name} (saved)`);
      } else {
        showToast('good', 'Viewed', product.name);
      }
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

    const connectifyTab = event.target.closest('[data-connectify-tab]');
    if (connectifyTab) {
      const tab = connectifyTab.getAttribute('data-connectify-tab');
      if (tab && ['home', 'explore', 'profile'].includes(tab)) {
        state.connectify.tab = tab;
        saveState();
        renderConnectify();
      }
      return;
    }

    const mapPlace = event.target.closest('[data-mapme-place]');
    if (mapPlace) {
      const placeId = mapPlace.getAttribute('data-mapme-place');
      if (placeId) {
        state.mapme.selectedPlace = placeId;
        saveState();
        renderMapMe();
      }
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
      if (state.freegame.terms) {
        addFootprint('Device ID', 'fa-fingerprint', 'Super Puzzle Quest');
        addDiscovery('freegame-free', 'Free apps can make money from data', 'Some free apps earn money from ads and tracking instead of charging you.');
      }
      renderFreeGame();
      checkMissionCompletion();
      return;
    }

    const fgTracking = event.target.closest('[data-freegame-tracking]');
    if (fgTracking) {
      const v = fgTracking.getAttribute('data-freegame-tracking');
      state.freegame.tracking = v === 'all' ? 'all' : 'essential';
      if (state.freegame.tracking === 'all') {
        addFootprint('Ad tracking', 'fa-link', 'Super Puzzle Quest');
        addDiscovery('freegame-tracking', 'Tracking makes ads personalised', 'Tracking can change what ads and offers you see.');
      } else {
        addDiscovery('freegame-essential', 'Less tracking means more generic ads', 'The app can still show ads, but with less personalisation.');
      }
      saveState();
      renderFreeGame();
      checkMissionCompletion();
      return;
    }

    const fgLevel = event.target.closest('[data-freegame-level]');
    if (fgLevel) {
      const levelStr = fgLevel.getAttribute('data-freegame-level');
      const level = Number(levelStr);
      if (Number.isFinite(level)) {
        showToast('info', 'Level', `Level ${level} started.`);
      }
      return;
    }

    const fgAction = event.target.closest('[data-freegame-action]');
    if (fgAction) {
      const action = fgAction.getAttribute('data-freegame-action');
      if (action === 'photo') showToast('good', 'Profile', 'Profile photo updated.');
      if (action === 'invite') showToast('warn', 'Invites', 'Invites sent to your contacts.');
      if (action === 'watch-ad') {
        const tracking = state.freegame.tracking === 'all';
        const gain = tracking ? 50 : 15;
        state.freegame.coins = (typeof state.freegame.coins === 'number' ? state.freegame.coins : 0) + gain;
        state.freegame.watchedAds = (typeof state.freegame.watchedAds === 'number' ? state.freegame.watchedAds : 0) + 1;
        if (tracking) addFootprint('Ad engagement', 'fa-eye', 'Super Puzzle Quest');
        saveState();
        renderFreeGame();
        showToast(tracking ? 'bad' : 'good', 'Coins', `+${gain} coins from an ad.`);
        return;
      }
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
      return;
    }

    const resetAppBtn = event.target.closest('[data-reset-app]');
    if (resetAppBtn) {
      const app = resetAppBtn.getAttribute('data-reset-app');
      if (app) resetAppState(app);
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
  els.missionPanel = $('#mission-panel');
  els.missionPanelInner = $('#mission-panel-inner');

  els.permissionOverlay = $('#permission-overlay');
  els.permissionIcon = $('#permission-icon');
  els.permissionTitle = $('#permission-title');
  els.permissionDesc = $('#permission-desc');
  els.permissionButtons = $('#permission-buttons');

  recomputeMissionIndex();
  updateClock();
  window.setInterval(updateClock, 1000);

  wireEvents();
  updateHomeIcons();
  updateBadges();
  renderMessages();
  renderSidePanel();
};

document.addEventListener('DOMContentLoaded', initialize);
