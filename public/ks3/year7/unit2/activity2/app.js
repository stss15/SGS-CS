/**
 * Data Detective - Digital Footprint Investigation
 * Educational simulation for understanding privacy, cookies, and permissions
 */

// ==================== STATE MANAGEMENT ====================
const appState = {
    currentMission: 'welcome',
    unlockedApps: ['messages', 'settings'],
    completedMissions: [],
    visitedApps: [],
    
    permissions: {
        browserCookies: null,        // null, 'all', 'necessary', 'some'
        connectifyTerms: false,
        connectifyLocation: null,    // null, 'always', 'while-using', 'none'
        mapmeLocation: null,         // null, 'precise', 'approximate', 'none'
        freegameTerms: false,        // Terms accepted
        freegameCamera: false,       // Camera permission
        freegameContacts: false,     // Contacts permission
        freegameCookies: null        // null, 'all', 'necessary'
    },
    
    footprint: [],      // Array of { item, icon, source }
    discoveries: [],    // Array of { id, title, description }
    
    missionRequirements: {
        browser: { testedBoth: false, acceptedAll: false, acceptedNecessary: false },
        connectify: { foundClauses: 0, madeChoice: false },
        mapme: { testedPrecise: false, testedApproximate: false },
        freegame: { madeChoice: false, foundSecrets: 0 }
    }
};

// Mission order for progression
const missionOrder = ['welcome', 'browser', 'connectify', 'mapme', 'freegame'];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    updateClock();
    setInterval(updateClock, 1000);
});

function initializeApp() {
    // Set up app icon click handlers
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const appName = icon.dataset.app;
            openApp(appName);
        });
    });
    
    // Initialize displays
    updateHomeIcons();
    updateMissionPanel();
    updateFootprintPanel();
    loadMessages();
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('status-time').textContent = `${hours}:${mins}`;
}

// ==================== NAVIGATION ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    
    // Check if current mission should be completed
    const currentMission = getCurrentMission();
    if (isMissionComplete(currentMission) && !appState.completedMissions.includes(currentMission)) {
        // Mark mission complete
        appState.completedMissions.push(currentMission);
        
        // Show completion toast
        showToast('success', 'Mission Complete!', 'Check Messages for your next mission!');
        
        // Show badge notification for new message - they need to open it to unlock next app
        document.getElementById('messages-badge').style.display = 'flex';
        document.getElementById('messages-badge').textContent = '1';
        
        // Check if all missions complete
        if (appState.completedMissions.length >= 5) {
            setTimeout(() => showFinalComplete(), 1500);
        }
    }
    
    updateMissionPanel();
}

function openApp(appName) {
    // Check if app is locked
    if (!appState.unlockedApps.includes(appName) && appName !== 'messages' && appName !== 'settings') {
        showToast('warning', 'App Locked', 'Check your Messages to unlock this app!');
        return;
    }
    
    // Track visit
    if (!appState.visitedApps.includes(appName)) {
        appState.visitedApps.push(appName);
    }
    
    // Show the appropriate screen
    showScreen(`screen-${appName}`);
    
    // Initialize app-specific content
    initializeAppContent(appName);
}

function updateHomeIcons() {
    document.querySelectorAll('.app-icon').forEach(icon => {
        const appName = icon.dataset.app;
        if (appState.unlockedApps.includes(appName) || appName === 'messages' || appName === 'settings') {
            icon.classList.remove('locked');
        } else {
            icon.classList.add('locked');
        }
    });
}

// ==================== APP INITIALIZATION ====================
function initializeAppContent(appName) {
    switch (appName) {
        case 'messages':
            loadMessages();
            // Clear badge
            document.getElementById('messages-badge').style.display = 'none';
            break;
        case 'browser':
            initBrowser();
            break;
        case 'connectify':
            initConnectify();
            break;
        case 'mapme':
            initMapMe();
            break;
        case 'freegame':
            initFreeGame();
            break;
        case 'settings':
            initSettings();
            break;
    }
}

// ==================== MESSAGES APP ====================
function loadMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    // Welcome message (always shown)
    container.innerHTML += `
        <div class="message-sender">🕵️ Data Detective HQ</div>
        <div class="message-bubble message-received">
            Welcome, Agent! 👋
        </div>
        <div class="message-bubble message-received">
            Your mission: investigate the apps on this phone and discover what data they secretly collect about you.
        </div>
    `;
    
    // Browser mission
    if (appState.currentMission === 'welcome' || appState.completedMissions.includes('welcome')) {
        container.innerHTML += `
            <div class="message-card">
                <h4><i class="fa-solid fa-bullseye"></i> Mission 1: Browser Investigation</h4>
                <p>Open the <strong>Browser</strong> app and investigate how cookie settings affect what you see:</p>
                <ul>
                    <li>Try accepting <strong>ALL cookies</strong> - watch the ad</li>
                    <li>Then reset and try <strong>Necessary Only</strong></li>
                    <li>Compare what the website knows about you!</li>
                </ul>
                <button class="unlock-btn" onclick="unlockApp('browser')" ${appState.unlockedApps.includes('browser') ? 'disabled' : ''}>
                    <i class="fa-solid fa-unlock"></i>
                    ${appState.unlockedApps.includes('browser') ? 'Unlocked!' : 'Unlock Browser App'}
                </button>
            </div>
        `;
    }
    
    // Connectify mission
    if (appState.completedMissions.includes('browser')) {
        container.innerHTML += `
            <div class="message-bubble message-sent">I investigated the Browser cookies!</div>
            <div class="message-bubble message-received">
                Excellent work! 🎉 Did you see how the ad changed based on your cookie choice?
            </div>
            <div class="message-card">
                <h4><i class="fa-solid fa-bullseye"></i> Mission 2: Connectify Terms</h4>
                <p>Open <strong>Connectify</strong> and read the Terms & Conditions carefully:</p>
                <ul>
                    <li>Look for text highlighted in <span style="background: #FFF3CD; padding: 2px 6px; border-radius: 4px;">yellow</span></li>
                    <li>Click on suspicious clauses to investigate!</li>
                    <li>Find at least 3 hidden secrets!</li>
                </ul>
                <button class="unlock-btn" onclick="unlockApp('connectify')" ${appState.unlockedApps.includes('connectify') ? 'disabled' : ''}>
                    <i class="fa-solid fa-unlock"></i>
                    ${appState.unlockedApps.includes('connectify') ? 'Unlocked! Go back home to open it' : 'Unlock Connectify'}
                </button>
            </div>
        `;
    }
    
    // MapMe mission
    if (appState.completedMissions.includes('connectify')) {
        container.innerHTML += `
            <div class="message-bubble message-sent">I found suspicious clauses in the Terms!</div>
            <div class="message-bubble message-received">
                You found ${appState.discoveries.length} hidden secrets! Most people just click "Agree" without reading. 🕵️
            </div>
            <div class="message-card">
                <h4><i class="fa-solid fa-bullseye"></i> Mission 3: MapMe Location</h4>
                <p>Compare <strong>Precise</strong> vs <strong>Approximate</strong> location:</p>
                <ul>
                    <li>Try <strong>Precise Location</strong> first - what does it know?</li>
                    <li>Then change settings and try <strong>Approximate</strong></li>
                    <li>Does the map still work? What's the difference?</li>
                </ul>
                <button class="unlock-btn" onclick="unlockApp('mapme')" ${appState.unlockedApps.includes('mapme') ? 'disabled' : ''}>
                    <i class="fa-solid fa-unlock"></i>
                    ${appState.unlockedApps.includes('mapme') ? 'Unlocked! Go back home to open it' : 'Unlock MapMe'}
                </button>
            </div>
        `;
    }
    
    // FreeGame mission
    if (appState.completedMissions.includes('mapme')) {
        container.innerHTML += `
            <div class="message-bubble message-sent">The map works with approximate location!</div>
            <div class="message-bubble message-received">
                Exactly! 💡 Apps often ask for more data than they need. Time for your final mission...
            </div>
            <div class="message-card">
                <h4><i class="fa-solid fa-bullseye"></i> Mission 4: FreeGame Investigation</h4>
                <p>Investigate why "free" games aren't really free:</p>
                <ul>
                    <li>Read the Terms & Conditions carefully 👀</li>
                    <li>Look at what permissions it asks for</li>
                    <li>Find out what they do with your data!</li>
                </ul>
                <button class="unlock-btn" onclick="unlockApp('freegame')" ${appState.unlockedApps.includes('freegame') ? 'disabled' : ''}>
                    <i class="fa-solid fa-unlock"></i>
                    ${appState.unlockedApps.includes('freegame') ? 'Unlocked! Go back home to open it' : 'Unlock FreeGame'}
                </button>
            </div>
        `;
    }
    
    // Final completion message
    if (appState.completedMissions.includes('freegame')) {
        container.innerHTML += `
            <div class="message-bubble message-sent">I understand data minimization now!</div>
            <div class="message-bubble message-received">
                🎉 <strong>INVESTIGATION COMPLETE!</strong>
            </div>
            <div class="message-bubble message-received">
                You've learned that many apps ask for more data than they need. Always ask yourself: "Why does this app need THIS information?"
            </div>
            <div class="message-card" style="background: linear-gradient(135deg, #e8f5e9, #c8e6c9); border-color: var(--ios-green);">
                <h4 style="color: #2e7d32;"><i class="fa-solid fa-trophy"></i> Investigation Summary</h4>
                <p><strong>Data items shared:</strong> ${appState.footprint.length}</p>
                <p><strong>Hidden secrets discovered:</strong> ${appState.discoveries.length}</p>
                <p style="margin-top: 10px; font-style: italic;">Don't forget to fill in your Investigation Log in your exercise book!</p>
            </div>
        `;
    }
    
    // Scroll to bottom
    const body = container.parentElement;
    setTimeout(() => body.scrollTop = body.scrollHeight, 100);
}

function unlockApp(appName) {
    if (!appState.unlockedApps.includes(appName)) {
        appState.unlockedApps.push(appName);
        
        // Mark welcome as complete if this is the first unlock
        if (!appState.completedMissions.includes('welcome')) {
            appState.completedMissions.push('welcome');
            appState.currentMission = appName;
        }
        
        updateHomeIcons();
        updateMissionPanel();
        loadMessages();
        showToast('success', 'App Unlocked!', `${appName.charAt(0).toUpperCase() + appName.slice(1)} is now available`);
    }
}

// ==================== BROWSER APP ====================
function initBrowser() {
    const body = document.getElementById('browser-body');
    
    body.innerHTML = `
        <div class="browser-url-bar">
            <i class="fa-solid fa-lock"></i>
            <span>www.shop-everything.com</span>
        </div>
        <div class="browser-page">
            <div class="website-header">
                <h2>🛒 ShopEverything</h2>
                <p>Your one-stop online store</p>
            </div>
            <div class="ad-box" id="ad-box">
                <h4>📢 ADVERTISEMENT</h4>
                <div class="ad-content" id="ad-content">
                    <p style="color: #999;">Loading advertisement...</p>
                </div>
            </div>
            <p style="color: #666; font-size: 0.85rem;">Welcome to ShopEverything! Browse our amazing deals on electronics, clothing, and more.</p>
        </div>
    `;
    
    // Show cookie banner if not yet decided
    if (appState.permissions.browserCookies === null) {
        setTimeout(() => {
            document.getElementById('cookie-banner').classList.add('active');
        }, 500);
    } else {
        updateBrowserAd();
    }
}

function toggleCookie(element) {
    if (!element.classList.contains('locked')) {
        element.classList.toggle('active');
    }
}

function handleCookies(choice) {
    const banner = document.getElementById('cookie-banner');
    
    if (choice === 'all') {
        // Accept all cookies
        appState.permissions.browserCookies = 'all';
        appState.missionRequirements.browser.acceptedAll = true;
        
        // Add to footprint with individual warnings
        addToFootprint('Browsing History', 'fa-clock-rotate-left', 'Browser');
        addToFootprint('Search Queries', 'fa-magnifying-glass', 'Browser');
        addToFootprint('Shopping Interests', 'fa-cart-shopping', 'Browser');
        addToFootprint('Ad Preferences', 'fa-bullhorn', 'Browser');
        
        // Show sequential individual warnings for each cookie type (queued)
        showAlert('warning', '🔍 <strong>Analytics Cookie Activated!</strong><br><br>This website now tracks every page you visit and how long you stay!');
        showAlert('danger', '📢 <strong>Advertising Cookie Activated!</strong><br><br>Advertisers can now follow you across the internet and know what you like!');
        showAlert('danger', '🔗 <strong>Third-Party Cookie Activated!</strong><br><br>Your data is being shared with 50+ partner companies you\'ve never heard of!');
        showAlert('warning', '🛒 <strong>Shopping Tracker Activated!</strong><br><br>Every product you look at is now recorded for targeted ads!');
        
    } else {
        // Check which cookies are selected
        const analytics = document.querySelector('[data-cookie="analytics"]').classList.contains('active');
        const advertising = document.querySelector('[data-cookie="advertising"]').classList.contains('active');
        const thirdparty = document.querySelector('[data-cookie="thirdparty"]').classList.contains('active');
        
        if (!analytics && !advertising && !thirdparty) {
            appState.permissions.browserCookies = 'necessary';
            appState.missionRequirements.browser.acceptedNecessary = true;
            showToast('success', 'Privacy Protected!', 'Only essential cookies accepted');
        } else {
            appState.permissions.browserCookies = 'some';
            if (analytics) addToFootprint('Page Views', 'fa-eye', 'Browser');
            if (advertising) addToFootprint('Ad Clicks', 'fa-bullhorn', 'Browser');
            if (thirdparty) addToFootprint('Cross-Site Data', 'fa-share-nodes', 'Browser');
        }
    }
    
    // Check if both options tested
    if (appState.missionRequirements.browser.acceptedAll && appState.missionRequirements.browser.acceptedNecessary) {
        appState.missionRequirements.browser.testedBoth = true;
    }
    
    banner.classList.remove('active');
    updateBrowserAd();
    updatePermissionDisplay('cookies', appState.permissions.browserCookies);
    updateMissionPanel();
}

function updateBrowserAd() {
    const adBox = document.getElementById('ad-box');
    const adContent = document.getElementById('ad-content');
    
    if (!adBox || !adContent) return;
    
    if (appState.permissions.browserCookies === 'all') {
        adBox.classList.add('personalized');
        adContent.innerHTML = `
            <p class="creepy" style="font-size: 1rem; margin-bottom: 10px;">
                <strong>👋 Hi there!</strong>
            </p>
            <p class="creepy" style="font-size: 0.85rem;">
                We noticed you searched for "birthday presents" yesterday and visited 3 gaming websites this week...
            </p>
            <p style="margin-top: 10px; font-weight: 600; color: var(--ios-red);">
                🎮 50% OFF Gaming Headsets - Just for YOU!
            </p>
            <p style="font-size: 0.7rem; color: #999; margin-top: 10px;">
                <i class="fa-solid fa-triangle-exclamation"></i> This ad knows your browsing history
            </p>
        `;
    } else if (appState.permissions.browserCookies === 'necessary') {
        adBox.classList.remove('personalized');
        adContent.innerHTML = `
            <p style="font-size: 1rem;"><strong>📰 Generic Advertisement</strong></p>
            <p style="color: #666; font-size: 0.85rem; margin-top: 8px;">
                Visit our store for great products!
            </p>
            <p style="font-size: 0.75rem; color: var(--ios-green); margin-top: 12px;">
                <i class="fa-solid fa-shield-halved"></i> This ad doesn't know anything about you
            </p>
        `;
    } else {
        adBox.classList.remove('personalized');
        adContent.innerHTML = `
            <p style="font-size: 1rem;"><strong>🛍️ Winter Sale!</strong></p>
            <p style="color: #666; font-size: 0.85rem; margin-top: 8px;">
                Check out our latest deals on electronics and more.
            </p>
            <p style="font-size: 0.75rem; color: #999; margin-top: 12px;">
                Partially personalized based on your settings
            </p>
        `;
    }
    
    // Add reset button
    adContent.innerHTML += `
        <button class="reset-cookies-btn" onclick="resetCookies()">
            <i class="fa-solid fa-gear"></i> Change Cookie Settings
        </button>
    `;
}

function resetCookies() {
    appState.permissions.browserCookies = null;
    // Reset toggles
    document.querySelectorAll('[data-cookie]').forEach(toggle => {
        toggle.classList.remove('active');
    });
    document.getElementById('cookie-banner').classList.add('active');
}

// ==================== CONNECTIFY APP ====================
function initConnectify() {
    const body = document.getElementById('connectify-body');
    
    if (!appState.permissions.connectifyTerms) {
        body.innerHTML = `
            <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 20px;">💬</div>
                <h2 style="margin-bottom: 10px;">Welcome to Connectify!</h2>
                <p style="color: #666; margin-bottom: 30px;">Connect with friends, share moments, discover what's happening nearby.</p>
                
                <div style="background: #f8f9fa; border-radius: 14px; padding: 20px; text-align: left; margin-bottom: 20px;">
                    <h4 style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-file-contract"></i> Before you start...
                    </h4>
                    <p style="font-size: 0.9rem; color: #666;">
                        Please review our Terms & Conditions.
                        <strong style="color: var(--ios-orange);">Detective tip: Look carefully for suspicious clauses!</strong>
                    </p>
                </div>
                
                <button onclick="showConnectifyTerms()" style="
                    background: var(--ios-blue);
                    color: white;
                    border: none;
                    padding: 14px 40px;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Read Terms & Conditions
                </button>
            </div>
        `;
    } else {
        renderConnectifyFeed();
    }
}

function showConnectifyTerms() {
    const termsBody = document.getElementById('terms-body');
    
    termsBody.innerHTML = `
        <div style="padding: 16px;">
            <div class="terms-section">
                <h3>1. Data Collection</h3>
                <div class="terms-clause">
                    We collect basic information you provide when creating an account, including your name and email address.
                </div>
                <div class="terms-clause suspicious" data-discovery="data-retention" onclick="discoverClause(this)">
                    <strong>1.2 Data Retention:</strong> We retain your data indefinitely, even after you delete your account. This includes all photos, messages, and location history you've ever shared.
                </div>
            </div>
            
            <div class="terms-section">
                <h3>2. Location Services</h3>
                <div class="terms-clause">
                    Location data helps us show you relevant content and connect you with nearby friends.
                </div>
                <div class="terms-clause suspicious" data-discovery="location-tracking" onclick="discoverClause(this)">
                    <strong>2.3 Background Tracking:</strong> When you enable "Always Allow" location, we collect your location every 5 minutes, even when the app is closed, to build a complete picture of your daily movements.
                </div>
            </div>
            
            <div class="terms-section">
                <h3>3. Data Sharing</h3>
                <div class="terms-clause">
                    We may share anonymized data with partners to improve our services.
                </div>
                <div class="terms-clause suspicious" data-discovery="data-selling" onclick="discoverClause(this)">
                    <strong>3.4 Third-Party Partners:</strong> We share your profile information, interests, and browsing habits with over 200 advertising partners who may contact you directly or show you targeted advertisements.
                </div>
            </div>
        </div>
        
        <div class="terms-buttons">
            <button class="terms-btn agree" onclick="agreeToTerms()">I Agree</button>
            <button class="terms-btn decline" onclick="declineTerms()">Decline</button>
        </div>
    `;
    
    showScreen('screen-connectify-terms');
}

function discoverClause(element) {
    const discoveryId = element.dataset.discovery;
    
    if (element.classList.contains('discovered')) return;
    
    element.classList.add('discovered');
    appState.missionRequirements.connectify.foundClauses++;
    
    const discoveries = {
        'data-retention': {
            title: 'Data Never Deleted!',
            description: 'Connectify keeps ALL your data forever, even after you delete your account!'
        },
        'location-tracking': {
            title: 'Background Location Tracking!',
            description: 'They track your location every 5 minutes, even when you\'re not using the app!'
        },
        'data-selling': {
            title: 'Data Sold to 200+ Companies!',
            description: 'Your information is shared with over 200 advertising partners!'
        }
    };
    
    if (discoveries[discoveryId]) {
        addDiscovery(discoveryId, discoveries[discoveryId].title, discoveries[discoveryId].description);
    }
    
    updateMissionPanel();
}

function agreeToTerms() {
    appState.permissions.connectifyTerms = true;
    appState.missionRequirements.connectify.madeChoice = true;
    
    // Check if user found any clauses
    if (appState.missionRequirements.connectify.foundClauses > 0) {
        showAlert('warning', '⚠️ You agreed even after finding suspicious clauses! The company now has permission to collect your data.');
    }
    
    showScreen('screen-connectify');
    initConnectify();
    updateMissionPanel();
}

function declineTerms() {
    appState.missionRequirements.connectify.madeChoice = true;
    
    const body = document.getElementById('connectify-body');
    body.innerHTML = `
        <div style="padding: 40px 20px; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚫</div>
            <h2 style="margin-bottom: 10px;">Access Denied</h2>
            <p style="color: #666; margin-bottom: 20px;">
                You declined the Terms & Conditions. You cannot use Connectify without agreeing.
            </p>
            <div style="background: #e8f5e9; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
                <p style="font-size: 0.9rem; color: #2e7d32;">
                    <i class="fa-solid fa-shield-halved"></i>
                    <strong>Smart choice!</strong> You protected your privacy by not agreeing to those suspicious terms.
                </p>
            </div>
            <button onclick="initConnectify()" style="
                background: #f0f0f0;
                color: #333;
                border: none;
                padding: 12px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 0.9rem;
            ">
                Try Again
            </button>
        </div>
    `;
    
    showScreen('screen-connectify');
    showToast('success', 'Privacy Protected!', 'You declined the suspicious terms');
    updateMissionPanel();
}

function renderConnectifyFeed() {
    const body = document.getElementById('connectify-body');
    body.innerHTML = `
        <div style="padding: 16px;">
            <div style="background: #e8f5e9; border-radius: 14px; padding: 16px; margin-bottom: 16px;">
                <p style="font-size: 0.9rem; color: #2e7d32; text-align: center;">
                    <i class="fa-solid fa-check-circle"></i>
                    You agreed to the Terms & Conditions
                </p>
            </div>
            
            <div style="background: white; border-radius: 14px; padding: 16px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">TJ</div>
                    <div>
                        <h4 style="font-size: 0.95rem;">Taylor Jones</h4>
                        <span style="font-size: 0.8rem; color: #666;">2 hours ago</span>
                    </div>
                </div>
                <p style="font-size: 0.9rem;">Just finished my homework! 📚 Time for some gaming 🎮</p>
            </div>
            
            <div style="background: white; border-radius: 14px; padding: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, #11998e, #38ef7d); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">MK</div>
                    <div>
                        <h4 style="font-size: 0.95rem;">Morgan Kelly</h4>
                        <span style="font-size: 0.8rem; color: #666;">5 hours ago</span>
                    </div>
                </div>
                <p style="font-size: 0.9rem;">Beautiful sunset at the beach today! 🌅</p>
            </div>
        </div>
    `;
}

// ==================== MAPME APP ====================
function initMapMe() {
    if (appState.permissions.mapmeLocation === null) {
        showPermissionDialog({
            icon: 'fa-map-location-dot',
            iconBg: 'linear-gradient(135deg, #5856D6, #673ab7)',
            title: '"MapMe" Would Like to Access Your Location',
            description: 'Your location is used to show maps and provide directions.',
            buttons: [
                { text: 'Precise Location', class: 'primary', action: "setMapLocation('precise')" },
                { text: 'Approximate Location', class: 'primary', action: "setMapLocation('approximate')" },
                { text: "Don't Allow", class: 'secondary', action: "setMapLocation('none')" }
            ]
        });
    }
    renderMapMe();
}

function setMapLocation(value) {
    hidePermissionDialog();
    appState.permissions.mapmeLocation = value;
    
    if (value === 'precise') {
        appState.missionRequirements.mapme.testedPrecise = true;
        addToFootprint('Exact Address', 'fa-house', 'MapMe');
        addToFootprint('GPS Coordinates', 'fa-satellite', 'MapMe');
        showAlert('warning', '📍 Precise location shared! MapMe now knows your exact location within 3 meters.');
        updatePermissionDisplay('location', 'Precise');
    } else if (value === 'approximate') {
        appState.missionRequirements.mapme.testedApproximate = true;
        addToFootprint('General Area', 'fa-map', 'MapMe');
        showToast('success', 'Privacy Protected!', 'MapMe only knows your general area');
        updatePermissionDisplay('location', 'Approximate');
    } else {
        updatePermissionDisplay('location', 'Off');
    }
    
    renderMapMe();
    updateMissionPanel();
}

function renderMapMe() {
    const body = document.getElementById('mapme-body');
    const loc = appState.permissions.mapmeLocation;
    
    let mapContent = '';
    let statusContent = '';
    
    if (loc === 'precise') {
        mapContent = `
            <div class="map-grid"></div>
            <div class="map-marker precise" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <i class="fa-solid fa-location-dot"></i>
            </div>
        `;
        statusContent = `
            <div class="location-status precise">
                <i class="fa-solid fa-location-crosshairs"></i>
                <div>
                    <strong>Precise Location Active</strong>
                    <p>123 Oak Street, London (within 3m)</p>
                </div>
            </div>
            <div class="privacy-note warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Privacy Warning:</strong> The app knows your exact address!
            </div>
        `;
    } else if (loc === 'approximate') {
        mapContent = `
            <div class="map-grid"></div>
            <div class="map-radius"></div>
            <div class="map-marker approximate" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <i class="fa-solid fa-circle-dot"></i>
            </div>
        `;
        statusContent = `
            <div class="location-status approximate">
                <i class="fa-solid fa-circle-dot"></i>
                <div>
                    <strong>Approximate Location</strong>
                    <p>North London Area (within 1-2km)</p>
                </div>
            </div>
            <div class="privacy-note success">
                <i class="fa-solid fa-shield-halved"></i>
                <strong>Good choice!</strong> Maps still work without knowing your exact address.
            </div>
        `;
    } else {
        mapContent = `
            <div class="map-grid"></div>
            <div style="text-align: center; color: #666;">
                <i class="fa-solid fa-location-slash" style="font-size: 3rem; margin-bottom: 10px;"></i>
                <p>Location disabled</p>
            </div>
        `;
        statusContent = `
            <div class="location-status denied">
                <i class="fa-solid fa-location-slash"></i>
                <div>
                    <strong>Location Disabled</strong>
                    <p>You can still search for places manually</p>
                </div>
            </div>
            <div class="privacy-note success">
                <i class="fa-solid fa-shield-halved"></i>
                <strong>Maximum Privacy!</strong> The app has no location data.
            </div>
        `;
    }
    
    body.innerHTML = `
        <div class="map-container">
            ${mapContent}
        </div>
        <div class="map-info">
            ${statusContent}
            <button class="reset-cookies-btn" onclick="resetMapLocation()" style="margin-top: 12px;">
                <i class="fa-solid fa-gear"></i> Change Location Settings
            </button>
        </div>
    `;
}

function resetMapLocation() {
    appState.permissions.mapmeLocation = null;
    initMapMe();
}

// ==================== FREEGAME APP ====================
function initFreeGame() {
    const body = document.getElementById('freegame-body');
    
    // Check if all permissions granted - show creepy camera
    if (appState.permissions.freegameTerms && 
        appState.permissions.freegameCamera && 
        appState.permissions.freegameContacts &&
        appState.permissions.freegameCookies === 'all') {
        showCreepyCamera();
        return;
    }
    
    // Show Terms & Conditions first
    if (!appState.permissions.freegameTerms) {
        renderFreeGameTerms();
        return;
    }
    
    // Then cookies
    if (appState.permissions.freegameCookies === null) {
        renderFreeGameCookies();
        return;
    }
    
    // Then camera permission
    if (!appState.permissions.freegameCamera) {
        showPermissionDialog({
            icon: 'fa-camera',
            iconBg: 'linear-gradient(135deg, #AF52DE, #9b59b6)',
            title: '"Super Puzzle Quest" Would Like to Access the Camera',
            description: 'To take profile photos and scan QR codes for bonus points.',
            buttons: [
                { text: 'Allow Camera', class: 'primary', action: "setFreeGameCamera(true)" },
                { text: "Don't Allow", class: 'secondary', action: "setFreeGameCamera(false)" }
            ]
        });
        renderFreeGameLoading();
        return;
    }
    
    // Then contacts permission
    if (!appState.permissions.freegameContacts) {
        showPermissionDialog({
            icon: 'fa-address-book',
            iconBg: 'linear-gradient(135deg, #AF52DE, #9b59b6)',
            title: '"Super Puzzle Quest" Would Like to Access Your Contacts',
            description: 'To find friends who also play and send them invites!',
            buttons: [
                { text: 'Allow Access', class: 'primary', action: "setFreeGameContacts(true)" },
                { text: "Don't Allow", class: 'secondary', action: "setFreeGameContacts(false)" }
            ]
        });
        renderFreeGameLoading();
        return;
    }
    
    // Show normal game screen
    renderFreeGame();
}

function renderFreeGameTerms() {
    const body = document.getElementById('freegame-body');
    body.innerHTML = `
        <div class="terms-container">
            <div class="terms-header">
                <div class="game-logo">🎮</div>
                <h3>Super Puzzle Quest</h3>
                <p class="free-badge">FREE TO PLAY!</p>
            </div>
            <div class="terms-scroll">
                <h4>Terms of Service & Privacy Policy</h4>
                <p>Please read and accept our terms to continue:</p>
                
                <div class="terms-text">
                    <p>1. <strong>Account & Data</strong></p>
                    <p>By using Super Puzzle Quest, you grant us permission to collect and store your account information...</p>
                    
                    <p class="suspicious-clause" onclick="discoverFreeGameSecret('data-selling')">
                        2. <strong>Data Sharing</strong><br>
                        We may share your personal information, including your name, age, location, device information, and gameplay data with <strong>our trusted advertising partners and third-party companies</strong> to provide you with a "personalised experience" and relevant advertisements.
                    </p>
                    
                    <p>3. <strong>In-App Purchases</strong></p>
                    <p>The game contains optional in-app purchases. You are responsible for all purchases made...</p>
                    
                    <p class="suspicious-clause" onclick="discoverFreeGameSecret('forever-data')">
                        4. <strong>Data Retention</strong><br>
                        All data collected through this app, including photos, messages, and contact lists, will be <strong>stored permanently on our servers</strong>, even after you delete your account or uninstall the application.
                    </p>
                    
                    <p>5. <strong>Push Notifications</strong></p>
                    <p>We may send you notifications about game updates, special offers, and promotional content...</p>
                    
                    <p class="suspicious-clause" onclick="discoverFreeGameSecret('sell-contacts')">
                        6. <strong>Contact Information</strong><br>
                        By granting contact access, you agree that we may <strong>collect your entire contact list</strong> and use this information for marketing purposes, including contacting people you know to promote our games.
                    </p>
                    
                    <p>7. <strong>User Content</strong></p>
                    <p>You retain ownership of content you create, but grant us a worldwide license to use it...</p>
                </div>
            </div>
            <div class="terms-buttons">
                <button class="terms-btn accept" onclick="acceptFreeGameTerms(true)">
                    <i class="fa-solid fa-check"></i> I Agree
                </button>
                <button class="terms-btn decline" onclick="acceptFreeGameTerms(false)">
                    <i class="fa-solid fa-times"></i> Decline
                </button>
            </div>
        </div>
    `;
}

function renderFreeGameCookies() {
    const body = document.getElementById('freegame-body');
    body.innerHTML = `
        <div class="terms-container">
            <div class="terms-header">
                <div class="game-logo">🍪</div>
                <h3>Cookie Preferences</h3>
            </div>
            <div class="cookie-consent-box">
                <p>Super Puzzle Quest uses cookies to enhance your gaming experience:</p>
                
                <div class="cookie-option-game">
                    <div class="cookie-info">
                        <strong>Essential Cookies</strong>
                        <span>Required to save your game progress</span>
                    </div>
                    <div class="toggle-switch active locked"></div>
                </div>
                
                <div class="cookie-option-game">
                    <div class="cookie-info">
                        <strong>Analytics Cookies</strong>
                        <span>Help us understand how you play</span>
                    </div>
                    <div class="toggle-switch" data-cookie="analytics" onclick="toggleGameCookie(this)"></div>
                </div>
                
                <div class="cookie-option-game">
                    <div class="cookie-info">
                        <strong>Advertising Cookies</strong>
                        <span>Show you "relevant" game ads</span>
                    </div>
                    <div class="toggle-switch" data-cookie="advertising" onclick="toggleGameCookie(this)"></div>
                </div>
                
                <div class="terms-buttons" style="margin-top: 20px;">
                    <button class="accept-all-btn" onclick="setFreeGameCookies('all')">
                        Accept All Cookies
                    </button>
                    <button class="save-choices-btn" onclick="setFreeGameCookies('necessary')">
                        Essential Only
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFreeGameLoading() {
    const body = document.getElementById('freegame-body');
    body.innerHTML = `
        <div class="game-loading">
            <div class="game-logo-large">🎮</div>
            <h3>Super Puzzle Quest</h3>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <p>Setting up your game...</p>
        </div>
    `;
}

function renderFreeGame() {
    const body = document.getElementById('freegame-body');
    appState.missionRequirements.freegame.madeChoice = true;
    
    // Check what data was shared
    let dataShared = [];
    if (appState.permissions.freegameTerms) dataShared.push('Personal Data');
    if (appState.permissions.freegameCamera === true) dataShared.push('Camera Access');
    if (appState.permissions.freegameContacts === true) dataShared.push('Contact List');
    if (appState.permissions.freegameCookies === 'all') dataShared.push('Tracking Cookies');
    
    let privacyStatus = '';
    if (dataShared.length >= 3) {
        privacyStatus = `
            <div class="privacy-note warning" style="margin: 16px;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Lots of data shared!</strong> This "free" game now knows a lot about you.
            </div>
        `;
    } else if (dataShared.length <= 1) {
        privacyStatus = `
            <div class="privacy-note success" style="margin: 16px;">
                <i class="fa-solid fa-shield-halved"></i>
                <strong>Good job!</strong> You limited what this game can access.
            </div>
        `;
    }
    
    body.innerHTML = `
        <div class="game-screen">
            <div class="game-header">
                <div class="game-score">Score: 1,250</div>
                <div class="game-coins">💎 50</div>
            </div>
            <div class="game-grid">
                <div class="puzzle-piece" style="background: #FF6B6B;">🔴</div>
                <div class="puzzle-piece" style="background: #4ECDC4;">🟢</div>
                <div class="puzzle-piece" style="background: #45B7D1;">🔵</div>
                <div class="puzzle-piece" style="background: #96CEB4;">🟡</div>
                <div class="puzzle-piece" style="background: #FFEAA7;">⭐</div>
                <div class="puzzle-piece" style="background: #DDA0DD;">💜</div>
                <div class="puzzle-piece" style="background: #98D8C8;">💚</div>
                <div class="puzzle-piece" style="background: #F7DC6F;">🌟</div>
                <div class="puzzle-piece" style="background: #BB8FCE;">🔮</div>
            </div>
            <p style="text-align: center; color: #666; font-size: 0.85rem;">This is a demo game</p>
        </div>
        ${privacyStatus}
        <button class="reset-cookies-btn" onclick="resetFreeGame()" style="margin: 16px auto; display: block;">
            <i class="fa-solid fa-rotate-left"></i> Reset & Try Again
        </button>
    `;
    
    updateMissionPanel();
}

function showCreepyCamera() {
    const body = document.getElementById('freegame-body');
    appState.missionRequirements.freegame.madeChoice = true;
    
    body.innerHTML = `
        <div class="creepy-camera-screen">
            <div class="camera-feed">
                <video id="camera-video" autoplay muted playsinline></video>
                <div class="camera-overlay">
                    <div class="creepy-text">
                        <div class="blink">📸 CAMERA ACTIVE 📸</div>
                        <h2>THANK YOU FOR ALL YOUR DATA!</h2>
                        <p>Your personal information is now being collected:</p>
                        <ul>
                            <li>✓ Face Recognition Data</li>
                            <li>✓ Contact List (${Math.floor(Math.random() * 50) + 100} contacts)</li>
                            <li>✓ Browsing History</li>
                            <li>✓ Location Data</li>
                        </ul>
                        <div class="money-text">💰 SOLD TO ${Math.floor(Math.random() * 50) + 200} COMPANIES 💰</div>
                        <p class="small-text">(Don't worry - this is just a demonstration!)</p>
                    </div>
                </div>
            </div>
            <button class="reset-cookies-btn danger" onclick="resetFreeGame()" style="margin: 16px auto; display: block;">
                <i class="fa-solid fa-shield-halved"></i> I Get It! Reset Everything
            </button>
        </div>
    `;
    
    // Try to start camera
    startCamera();
    
    addToFootprint('Face Scan Data', 'fa-face-viewfinder', 'FreeGame');
    addToFootprint('All Contacts', 'fa-address-book', 'FreeGame');
    addToFootprint('Full Tracking', 'fa-eye', 'FreeGame');
    
    showAlert('danger', '😱 This is what happens when you accept EVERYTHING without reading! Your camera, contacts, and data are all being accessed.');
    
    updateMissionPanel();
}

function startCamera() {
    const video = document.getElementById('camera-video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.log('Camera not available:', err);
                // Show static image instead
                video.style.display = 'none';
            });
    }
}

function toggleGameCookie(element) {
    element.classList.toggle('active');
}

function discoverFreeGameSecret(secretId) {
    const secrets = {
        'data-selling': {
            title: 'Data Selling Discovered!',
            description: 'This game sells your personal data to advertising companies!'
        },
        'forever-data': {
            title: 'Permanent Storage Found!',
            description: 'Your data is kept FOREVER, even after you delete the app!'
        },
        'sell-contacts': {
            title: 'Contact Harvesting!',
            description: 'They take your ENTIRE contact list and use it for marketing!'
        }
    };
    
    const secret = secrets[secretId];
    if (secret && !appState.discoveries.find(d => d.id === secretId)) {
        appState.discoveries.push({
            id: secretId,
            title: secret.title,
            description: secret.description
        });
        appState.missionRequirements.freegame.foundSecrets++;
        updateFootprintPanel();
        showToast('warning', secret.title, secret.description);
    }
}

function acceptFreeGameTerms(accepted) {
    if (accepted) {
        appState.permissions.freegameTerms = true;
        addToFootprint('Terms Accepted', 'fa-file-signature', 'FreeGame');
        showSequentialAlert('Terms Accepted', 'warning', 'You agreed to let them share your data with "advertising partners"!');
    } else {
        showAlert('info', '❌ Without accepting terms, you cannot play the game. This is how companies force you to agree!');
    }
    initFreeGame();
}

function setFreeGameCookies(choice) {
    appState.permissions.freegameCookies = choice;
    
    if (choice === 'all') {
        addToFootprint('Game Analytics', 'fa-chart-line', 'FreeGame');
        addToFootprint('Ad Tracking', 'fa-bullseye', 'FreeGame');
        showSequentialAlert('All Cookies Accepted', 'warning', 'Your gaming habits are now being tracked!');
    } else {
        showToast('success', 'Smart Choice!', 'Only essential cookies enabled');
    }
    
    initFreeGame();
}

function setFreeGameCamera(allowed) {
    hidePermissionDialog();
    appState.permissions.freegameCamera = allowed;
    
    if (allowed) {
        addToFootprint('Camera Access', 'fa-camera', 'FreeGame');
        showSequentialAlert('Camera Access Granted', 'danger', 'The game can now take photos and videos anytime!');
    }
    
    initFreeGame();
}

function setFreeGameContacts(allowed) {
    hidePermissionDialog();
    appState.permissions.freegameContacts = allowed;
    
    if (allowed) {
        addToFootprint('Contact List', 'fa-address-book', 'FreeGame');
        showSequentialAlert('Contacts Shared', 'danger', 'All your friends\' phone numbers are now collected!');
    }
    
    initFreeGame();
}

function resetFreeGame() {
    // Stop camera if running
    const video = document.getElementById('camera-video');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
    
    appState.permissions.freegameTerms = false;
    appState.permissions.freegameCamera = false;
    appState.permissions.freegameContacts = false;
    appState.permissions.freegameCookies = null;
    appState.missionRequirements.freegame.madeChoice = false;
    initFreeGame();
}

// ==================== SETTINGS APP ====================
function initSettings() {
    const body = document.getElementById('settings-body');
    
    body.innerHTML = `
        <div class="settings-section">
            <div class="settings-section-title">Privacy & Permissions</div>
            <div class="settings-item">
                <div class="settings-icon" style="background: var(--ios-blue);">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="settings-item-info">
                    <h4>Location Services</h4>
                </div>
                <span class="settings-value" id="settings-location">${getLocationStatus()}</span>
            </div>
            <div class="settings-item">
                <div class="settings-icon" style="background: var(--ios-orange);">
                    <i class="fa-solid fa-cookie"></i>
                </div>
                <div class="settings-item-info">
                    <h4>Browser Cookies</h4>
                </div>
                <span class="settings-value" id="settings-cookies">${getCookieStatus()}</span>
            </div>
            <div class="settings-item">
                <div class="settings-icon" style="background: var(--ios-purple);">
                    <i class="fa-solid fa-link"></i>
                </div>
                <div class="settings-item-info">
                    <h4>Cross-App Tracking</h4>
                </div>
                <span class="settings-value" id="settings-tracking">${getTrackingStatus()}</span>
            </div>
        </div>
        
        <div class="settings-section">
            <div class="settings-section-title">Data Collected</div>
            <div class="settings-item">
                <div class="settings-item-info">
                    <h4>${appState.footprint.length} items</h4>
                    <span>Data points shared with apps</span>
                </div>
            </div>
        </div>
        
        <div class="settings-section">
            <div class="settings-section-title">Reset</div>
            <div class="settings-item" onclick="resetAllPermissions()" style="cursor: pointer;">
                <div class="settings-icon" style="background: var(--ios-red);">
                    <i class="fa-solid fa-rotate-left"></i>
                </div>
                <div class="settings-item-info">
                    <h4 style="color: var(--ios-red);">Reset All Permissions</h4>
                    <span>Start fresh with the investigation</span>
                </div>
            </div>
        </div>
    `;
}

function getLocationStatus() {
    const locations = [appState.permissions.mapmeLocation, appState.permissions.connectifyLocation].filter(l => l && l !== 'none');
    return locations.length > 0 ? `${locations.length} apps` : 'Off';
}

function getCookieStatus() {
    const cookies = appState.permissions.browserCookies;
    if (cookies === 'all') return 'All';
    if (cookies === 'necessary') return 'Necessary';
    if (cookies === 'some') return 'Some';
    return 'Not set';
}

function getTrackingStatus() {
    if (appState.permissions.freegameTracking === true) return 'On';
    if (appState.permissions.freegameTracking === false) return 'Off';
    return 'Not set';
}

// ==================== PERMISSION DIALOG ====================
function showPermissionDialog(config) {
    const overlay = document.getElementById('permission-overlay');
    const icon = document.getElementById('permission-icon');
    const title = document.getElementById('permission-title');
    const desc = document.getElementById('permission-desc');
    const buttons = document.getElementById('permission-buttons');
    
    icon.style.background = config.iconBg;
    icon.innerHTML = `<i class="fa-solid ${config.icon}"></i>`;
    title.textContent = config.title;
    desc.textContent = config.description;
    
    buttons.innerHTML = config.buttons.map(btn => `
        <button class="permission-btn ${btn.class}" onclick="${btn.action}">
            ${btn.text}
        </button>
    `).join('');
    
    overlay.classList.add('active');
}

function hidePermissionDialog() {
    document.getElementById('permission-overlay').classList.remove('active');
}

// ==================== MISSION PANEL ====================
function updateMissionPanel() {
    const currentMission = getCurrentMission();
    const missionTitle = document.getElementById('mission-title');
    const missionSteps = document.getElementById('mission-steps');
    const completeBtn = document.getElementById('complete-mission-btn');
    
    const missionInfo = getMissionInfo(currentMission);
    missionTitle.textContent = missionInfo.title;
    
    missionSteps.innerHTML = missionInfo.steps.map(step => `
        <div class="step-item">
            <span class="step-icon">${step.icon}</span>
            <span class="step-text">${step.text}</span>
        </div>
    `).join('');
    
    // Update progress list
    updateProgressList();
    
    // Hide complete button - missions now auto-complete when pressing Back
    completeBtn.style.display = 'none';
}

function getCurrentMission() {
    if (!appState.completedMissions.includes('welcome')) return 'welcome';
    if (!appState.completedMissions.includes('browser')) return 'browser';
    if (!appState.completedMissions.includes('connectify')) return 'connectify';
    if (!appState.completedMissions.includes('mapme')) return 'mapme';
    if (!appState.completedMissions.includes('freegame')) return 'freegame';
    return 'complete';
}

function getMissionInfo(mission) {
    const missions = {
        welcome: {
            title: 'Mission Briefing',
            steps: [
                { icon: '💬', text: 'Open Messages to receive your first mission' },
                { icon: '🔓', text: 'Click the unlock button to start' }
            ]
        },
        browser: {
            title: 'Browser Investigation',
            steps: [
                { icon: '🌐', text: 'Open the Browser app' },
                { icon: '🍪', text: 'Try "Accept All Cookies" - see the ad' },
                { icon: '🔄', text: 'Reset and try "Necessary Only"' },
                { icon: '📝', text: 'Compare what the website knows!' }
            ]
        },
        connectify: {
            title: 'Connectify Terms Analysis',
            steps: [
                { icon: '💬', text: 'Open Connectify app' },
                { icon: '📄', text: 'Read the Terms & Conditions' },
                { icon: '🔍', text: 'Find 3 suspicious yellow clauses' },
                { icon: '✅', text: 'Decide: Agree or Decline?' }
            ]
        },
        mapme: {
            title: 'MapMe Location Test',
            steps: [
                { icon: '🗺️', text: 'Open MapMe app' },
                { icon: '📍', text: 'Try Precise Location first' },
                { icon: '🌍', text: 'Then try Approximate Location' },
                { icon: '🤔', text: 'Does the map still work?' }
            ]
        },
        freegame: {
            title: 'FreeGame Investigation',
            steps: [
                { icon: '🎮', text: 'Open the FreeGame app' },
                { icon: '📄', text: 'Read the Terms & Conditions carefully' },
                { icon: '🔍', text: 'Find the suspicious clauses' },
                { icon: '💰', text: 'Discover why "free" isn\'t really free!' }
            ]
        },
        complete: {
            title: 'Investigation Complete! 🎉',
            steps: [
                { icon: '✅', text: 'All missions completed!' },
                { icon: '📥', text: 'Download your Data Summary' },
                { icon: '📝', text: 'Fill in your exercise book' }
            ]
        }
    };
    
    return missions[mission] || missions.welcome;
}

function isMissionComplete(mission) {
    switch (mission) {
        case 'welcome':
            return appState.unlockedApps.includes('browser');
        case 'browser':
            return appState.permissions.browserCookies !== null;
        case 'connectify':
            return appState.missionRequirements.connectify.madeChoice;
        case 'mapme':
            return appState.permissions.mapmeLocation !== null;
        case 'freegame':
            return appState.missionRequirements.freegame.madeChoice;
        default:
            return false;
    }
}

function updateProgressList() {
    const items = document.querySelectorAll('.progress-item');
    
    items.forEach(item => {
        const mission = item.dataset.mission;
        
        item.classList.remove('locked', 'active', 'completed');
        
        if (appState.completedMissions.includes(mission)) {
            item.classList.add('completed');
            item.querySelector('.progress-checkbox').innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if (mission === getCurrentMission()) {
            item.classList.add('active');
            item.querySelector('.progress-checkbox').innerHTML = '';
        } else if (!appState.unlockedApps.includes(mission)) {
            item.classList.add('locked');
            item.querySelector('.progress-checkbox').innerHTML = '<i class="fa-solid fa-lock"></i>';
        }
    });
}

function checkMissionComplete() {
    const currentMission = getCurrentMission();
    if (isMissionComplete(currentMission) && !appState.completedMissions.includes(currentMission)) {
        document.getElementById('complete-mission-btn').style.display = 'flex';
    }
}

function completeMission() {
    const currentMission = getCurrentMission();
    
    if (!appState.completedMissions.includes(currentMission)) {
        appState.completedMissions.push(currentMission);
        
        showToast('success', 'Mission Complete!', `You've completed the ${getMissionInfo(currentMission).title}`);
        
        // Show badge notification
        document.getElementById('messages-badge').style.display = 'flex';
        document.getElementById('messages-badge').textContent = '1';
        
        updateMissionPanel();
        loadMessages();
        
        // Check if all missions complete
        if (appState.completedMissions.length >= 5) {
            showFinalComplete();
        }
    }
    
    document.getElementById('complete-mission-btn').style.display = 'none';
}

function showFinalComplete() {
    const modal = document.getElementById('complete-modal');
    const stats = document.getElementById('complete-stats');
    
    stats.innerHTML = `
        <div class="stat-item">
            <div class="stat-value">${appState.discoveries.length}</div>
            <div class="stat-label">Secrets Found</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${appState.footprint.length}</div>
            <div class="stat-label">Data Items</div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeCompleteModal() {
    document.getElementById('complete-modal').classList.remove('active');
}

// ==================== FOOTPRINT PANEL ====================
function updateFootprintPanel() {
    updateFootprintCounter();
    updateDataList();
    updateDiscoveriesList();
}

function updateFootprintCounter() {
    document.getElementById('footprint-counter').textContent = appState.footprint.length;
}

function addToFootprint(item, icon, source) {
    if (!appState.footprint.find(f => f.item === item)) {
        appState.footprint.push({ item, icon, source });
        updateFootprintPanel();
        showToast('danger', 'Data Collected!', `"${item}" added to your footprint`);
    }
}

function updateDataList() {
    const list = document.getElementById('data-list');
    
    if (appState.footprint.length === 0) {
        list.innerHTML = `
            <div class="data-empty">
                <p>No data collected yet.</p>
                <span>Try using some apps to see what they collect about you!</span>
            </div>
        `;
    } else {
        list.innerHTML = appState.footprint.map(f => `
            <div class="data-tag">
                <i class="fa-solid ${f.icon}"></i>
                <span>${f.item}</span>
            </div>
        `).join('');
    }
}

function addDiscovery(id, title, description) {
    if (!appState.discoveries.find(d => d.id === id)) {
        appState.discoveries.push({ id, title, description });
        updateDiscoveriesList();
        showToast('discovery', '🔍 Secret Discovered!', title);
    }
}

function updateDiscoveriesList() {
    const list = document.getElementById('discoveries-list');
    
    if (appState.discoveries.length === 0) {
        list.innerHTML = `
            <div class="discovery-empty">
                <p>No secrets uncovered yet.</p>
                <span>Look for <span class="highlight-yellow">yellow highlighted</span> text in apps!</span>
            </div>
        `;
    } else {
        list.innerHTML = appState.discoveries.map(d => `
            <div class="discovery-item">
                <strong><i class="fa-solid fa-lightbulb"></i> ${d.title}</strong>
                <p>${d.description}</p>
            </div>
        `).join('');
    }
}

function updatePermissionDisplay(type, value) {
    const statusMap = {
        location: 'perm-location',
        photos: 'perm-photos',
        tracking: 'perm-tracking',
        cookies: 'perm-cookies'
    };
    
    const el = document.getElementById(statusMap[type]);
    if (el) {
        el.textContent = value;
        if (value !== 'Off' && value !== 'None' && value !== 'Necessary') {
            el.classList.add('on');
        } else {
            el.classList.remove('on');
        }
    }
}

// ==================== MISSION GUIDE MODAL ====================
function openMissionGuide() {
    const modal = document.getElementById('guide-modal');
    const title = document.getElementById('guide-title');
    const body = document.getElementById('guide-body');
    
    const currentMission = getCurrentMission();
    const guideContent = getGuideContent(currentMission);
    
    title.innerHTML = `<i class="fa-solid fa-book-open"></i> ${guideContent.title}`;
    body.innerHTML = guideContent.content;
    
    modal.classList.add('active');
}

function closeGuideModal() {
    document.getElementById('guide-modal').classList.remove('active');
}

function getGuideContent(mission) {
    const guides = {
        welcome: {
            title: 'Getting Started',
            content: `
                <h3>🕵️ Welcome, Detective!</h3>
                <p>You've been recruited to investigate how apps on your phone collect your personal data. Every time you use an app, you leave behind clues about yourself - this is called your <strong>Digital Footprint</strong>.</p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Set Up Your Exercise Book</h4>
                    <p>Write this title at the top of a new page:</p>
                    <p style="text-align: center; font-size: 1.2rem; font-weight: bold; background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        📱 Digital Footprint Investigation 📱
                    </p>
                    <p>Write today's date underneath.</p>
                    <p>You'll be doing <strong>4 missions</strong> today - leave plenty of space!</p>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-lightbulb"></i> What You'll Discover</h4>
                    <ul>
                        <li>🍪 What happens when you accept cookies on websites</li>
                        <li>📜 What's REALLY hidden in Terms & Conditions</li>
                        <li>📍 The difference between precise and approximate location</li>
                        <li>🤔 Why "free" apps aren't really free</li>
                    </ul>
                </div>
                
                <h3>📱 How to Start</h3>
                <ol>
                    <li>Look at the phone in the middle of the screen</li>
                    <li>Tap on the <strong>Messages</strong> app (green icon with speech bubble)</li>
                    <li>Read your mission briefing</li>
                    <li>Click the <strong>Unlock</strong> button to unlock your first app!</li>
                </ol>
                
                <div class="reflection-box">
                    <h4>💡 Top Tip</h4>
                    <p>After each app investigation, click <strong>Back</strong> to return home. You'll get a new message with your next mission!</p>
                </div>
            `
        },
        browser: {
            title: 'Browser Investigation Guide',
            content: `
                <h3>🎯 Mission Objective</h3>
                <p>Discover what happens when you click "Accept All Cookies" vs "Necessary Only" on a website.</p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 1: Accept ALL Cookies</h4>
                    <p>In your exercise book, write the heading: <strong>"Accept All Cookies Test"</strong></p>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Open the Browser app</li>
                        <li>Click <strong>"Accept All"</strong></li>
                        <li>Watch the warning messages that pop up!</li>
                    </ol>
                    
                    <p><strong>Write down in your book:</strong></p>
                    <ul>
                        <li>📋 List each warning message that appeared</li>
                        <li>👁️ What does the advertisement say about YOU?</li>
                        <li>😰 How does this make you feel? Why?</li>
                    </ul>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 2: Necessary Cookies Only</h4>
                    <p>Now write: <strong>"Necessary Only Test"</strong></p>
                    
                    <p><strong>What are "Necessary" cookies?</strong> These are cookies the website NEEDS to work properly - like remembering what's in your shopping basket. They don't track you or share your data.</p>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Click "Change Cookie Settings" on the page</li>
                        <li>Make sure NO toggles are switched on (except "Necessary")</li>
                        <li>Click <strong>"Save My Choices"</strong></li>
                    </ol>
                    
                    <p><strong>Write down:</strong></p>
                    <ul>
                        <li>📋 What warnings appeared this time? (Hint: none!)</li>
                        <li>👁️ What does the advertisement say now?</li>
                        <li>✅ Does the website still work?</li>
                    </ul>
                </div>
                
                <div class="reflection-box">
                    <h4>💭 Think About It</h4>
                    <p>Answer these questions in your book:</p>
                    <ol>
                        <li>What's the <strong>benefit</strong> of accepting all cookies? (Hint: personalised ads might show things you like)</li>
                        <li>What's the <strong>risk</strong> of accepting all cookies?</li>
                        <li>Why do you think websites make the "Accept All" button <strong>bigger and brighter</strong>?</li>
                        <li>What would YOU choose in real life? Why?</li>
                    </ol>
                </div>
                
                <div class="task-box" style="background: #e8f5e9; border-left-color: var(--ios-green);">
                    <h4 style="color: var(--ios-green);"><i class="fa-solid fa-flag-checkered"></i> When You're Done</h4>
                    <p>Once you have tested <strong>both</strong> options and answered the questions, click the <strong>Back</strong> button to return to the home screen. You'll get a new message with your next mission!</p>
                </div>
            `
        },
        connectify: {
            title: 'Connectify Terms Analysis',
            content: `
                <h3>🎯 Mission Objective</h3>
                <p>Most people click "I Agree" without reading. Your job is to find out what you're ACTUALLY agreeing to!</p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 1: Hunt for Hidden Secrets</h4>
                    <p>In your exercise book, write: <strong>"Terms & Conditions Investigation"</strong></p>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Open Connectify app</li>
                        <li>Click "Read Terms & Conditions"</li>
                        <li>Scroll through and look for <span style="background: #FFF3CD; padding: 2px 6px; border-radius: 4px;">yellow highlighted</span> text</li>
                        <li>Click on each yellow section - a secret will be revealed!</li>
                    </ol>
                    
                    <p><strong>For each secret you find, write down:</strong></p>
                    <ul>
                        <li>🔍 <strong>Secret #1:</strong> What did you discover?</li>
                        <li>🔍 <strong>Secret #2:</strong> What did you discover?</li>
                        <li>🔍 <strong>Secret #3:</strong> What did you discover?</li>
                    </ul>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 2: Make Your Choice</h4>
                    <p>Now you know what the Terms say, you need to decide:</p>
                    
                    <p><strong>If you click "I Agree":</strong></p>
                    <ul>
                        <li>✅ You CAN use the app and see your friends</li>
                        <li>❌ BUT the company can keep your data forever</li>
                        <li>❌ AND they can share it with 200+ other companies</li>
                    </ul>
                    
                    <p><strong>If you click "Decline":</strong></p>
                    <ul>
                        <li>✅ Your data stays private</li>
                        <li>❌ BUT you can't use the app at all</li>
                    </ul>
                    
                    <p><strong>Write down:</strong> What did YOU choose and why?</p>
                </div>
                
                <div class="reflection-box">
                    <h4>💭 Think About It</h4>
                    <p>Answer these questions in your book:</p>
                    <ol>
                        <li>Why do companies write Terms & Conditions in complicated language?</li>
                        <li>If you posted a selfie and then deleted your account, should the company still have your photo? Why/why not?</li>
                        <li>Is it fair that you have to agree to EVERYTHING or you can't use the app at all?</li>
                    </ol>
                </div>
                
                <div class="task-box" style="background: #e8f5e9; border-left-color: var(--ios-green);">
                    <h4 style="color: var(--ios-green);"><i class="fa-solid fa-flag-checkered"></i> When You're Done</h4>
                    <p>Once you have found all <strong>3 secrets</strong>, made your choice, and answered the questions, click <strong>Back</strong> to get your next mission!</p>
                </div>
            `
        },
        mapme: {
            title: 'MapMe Location Investigation',
            content: `
                <h3>🎯 Mission Objective</h3>
                <p>Find out the difference between giving an app your <strong>exact location</strong> vs your <strong>general area</strong>.</p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 1: Precise Location Test</h4>
                    <p>In your exercise book, write: <strong>"Location Permissions Test"</strong></p>
                    
                    <p><strong>What is Precise Location?</strong> This shares your EXACT position - accurate to just 3 metres! The app knows exactly which house you're in.</p>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Open MapMe app</li>
                        <li>Choose <strong>"Precise Location"</strong></li>
                        <li>Look at what the app shows</li>
                    </ol>
                    
                    <p><strong>Write down:</strong></p>
                    <ul>
                        <li>📍 What location does the app show? (e.g., your street address)</li>
                        <li>⚠️ What warning message appeared?</li>
                        <li>🤔 Who might want to know your exact address? Could this be dangerous?</li>
                    </ul>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 2: Approximate Location Test</h4>
                    <p><strong>What is Approximate Location?</strong> This only shares your general area - like "North London" or "Birmingham". The app knows roughly where you are, but NOT your exact address.</p>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Click "Change Location Settings"</li>
                        <li>Choose <strong>"Approximate Location"</strong></li>
                        <li>Look at what the app shows now</li>
                    </ol>
                    
                    <p><strong>Write down:</strong></p>
                    <ul>
                        <li>📍 What location does the app show now?</li>
                        <li>✅ Does the map still work?</li>
                        <li>🔒 Why is this safer than precise location?</li>
                    </ul>
                </div>
                
                <div class="reflection-box">
                    <h4>💭 Think About It</h4>
                    <p>Which location type would you choose for these apps? Write <strong>Precise</strong> or <strong>Approximate</strong> next to each:</p>
                    <ul>
                        <li>🚗 Google Maps for driving directions: _______</li>
                        <li>📰 BBC News app: _______</li>
                        <li>📸 Instagram/TikTok: _______</li>
                        <li>🎮 A game app: _______</li>
                    </ul>
                    <p><strong>Explain:</strong> Why should you only give precise location when it's REALLY needed?</p>
                </div>
                
                <div class="task-box" style="background: #e8f5e9; border-left-color: var(--ios-green);">
                    <h4 style="color: var(--ios-green);"><i class="fa-solid fa-flag-checkered"></i> When You're Done</h4>
                    <p>Once you have tested <strong>both</strong> location options and answered the questions, click <strong>Back</strong> to get your next mission!</p>
                </div>
            `
        },
        freegame: {
            title: 'FreeGame Investigation',
            content: `
                <h3>🎯 Mission Objective</h3>
                <p>Find out why "FREE" games aren't really free - <strong>YOU are the product!</strong></p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> The Big Question</h4>
                    <p>In your exercise book, write: <strong>"Why Free Games Aren't Free"</strong></p>
                    
                    <p><strong>Think about this:</strong> How do game companies make money if the game is free? 🤔</p>
                    
                    <p>The answer: <strong>They sell YOUR data!</strong> Your personal information, your habits, and even your friends' contact details are worth money to advertisers.</p>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 1: Read the Terms & Conditions</h4>
                    
                    <p><strong>Steps:</strong></p>
                    <ol>
                        <li>Open the FreeGame app</li>
                        <li>Read the Terms & Conditions <strong>carefully</strong></li>
                        <li>Look for text highlighted in <span style="background: #FFF3CD; padding: 2px 6px; border-radius: 4px;">yellow</span></li>
                        <li>Click on each yellow section to reveal what it REALLY means</li>
                    </ol>
                    
                    <p><strong>Write down the 3 secrets you discover:</strong></p>
                    <ul>
                        <li>🔍 <strong>Secret #1:</strong> _______________________</li>
                        <li>🔍 <strong>Secret #2:</strong> _______________________</li>
                        <li>🔍 <strong>Secret #3:</strong> _______________________</li>
                    </ul>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Part 2: Permission Requests</h4>
                    
                    <p>After accepting the Terms, the app will ask for:</p>
                    <ul>
                        <li>📷 <strong>Camera Access</strong> - Does a puzzle game need your camera?</li>
                        <li>📒 <strong>Contacts Access</strong> - Does a puzzle game need your friends' phone numbers?</li>
                        <li>🍪 <strong>Cookies</strong> - To track everything you do</li>
                    </ul>
                    
                    <p><strong>For each permission, write:</strong></p>
                    <ul>
                        <li>Did you allow it? Yes / No</li>
                        <li>Does the game NEED this to work? Yes / No</li>
                        <li>What could they do with this data?</li>
                    </ul>
                </div>
                
                <div class="reflection-box">
                    <h4>💭 Think About It</h4>
                    <p>Answer these questions:</p>
                    <ol>
                        <li>If a game is "free", how does the company make money?</li>
                        <li>Why would a puzzle game want access to your <strong>camera</strong> and <strong>contacts</strong>?</li>
                        <li>What happens to your friends if you share your contact list?</li>
                        <li>Would you still download this game in real life? Why or why not?</li>
                    </ol>
                </div>
                
                <div class="task-box" style="background: #e8f5e9; border-left-color: var(--ios-green);">
                    <h4 style="color: var(--ios-green);"><i class="fa-solid fa-flag-checkered"></i> When You're Done</h4>
                    <p>Once you have found the secrets and answered the questions, click <strong>Back</strong>. This is your <strong>final mission</strong> - well done, Detective! 🎉</p>
                </div>
            `
        },
        complete: {
            title: 'Investigation Complete!',
            content: `
                <h3>🎉 Congratulations, Detective!</h3>
                <p>You've completed all your missions! You now know more about digital privacy than most adults!</p>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-pencil"></i> Final Report</h4>
                    <p>In your exercise book, write the heading: <strong>"What I Learned"</strong></p>
                    
                    <p><strong>Answer these questions:</strong></p>
                    <ol>
                        <li>What are <strong>3 things</strong> that surprised you about how apps collect data?</li>
                        <li>What will you do <strong>differently</strong> next time you download an app?</li>
                        <li>If a friend was about to click "Accept All Cookies" without reading, what would you tell them?</li>
                    </ol>
                </div>
                
                <div class="task-box">
                    <h4><i class="fa-solid fa-trophy"></i> Your Detective Stats</h4>
                    <p>Look at the <strong>Digital Footprint</strong> panel on the right side of the screen.</p>
                    <ul>
                        <li>📊 How many data items did you share in total?</li>
                        <li>🔍 How many secrets did you discover?</li>
                    </ul>
                    <p>Write these numbers in your book!</p>
                </div>
                
                <div class="reflection-box">
                    <h4>📥 Download Your Report</h4>
                    <p>Click the <strong>"Download Data Summary"</strong> button on the right panel. This gives you a summary of everything you discovered - you can show it to your family!</p>
                </div>
                
                <div class="task-box" style="background: #e8f5e9; border-left-color: var(--ios-green);">
                    <h4 style="color: var(--ios-green);"><i class="fa-solid fa-star"></i> Remember</h4>
                    <p>Every time you use an app, ask yourself:</p>
                    <ul>
                        <li>❓ What data is this app asking for?</li>
                        <li>❓ Does it REALLY need this to work?</li>
                        <li>❓ What's the trade-off if I say yes or no?</li>
                    </ul>
                    <p><strong>You're in control of your digital footprint!</strong></p>
                </div>
            `
        }
    };
    
    return guides[mission] || guides.welcome;
}

// Close modal on outside click
document.getElementById('guide-modal').addEventListener('click', (e) => {
    if (e.target.id === 'guide-modal') {
        closeGuideModal();
    }
});

// ==================== TOAST NOTIFICATIONS ====================
function showToast(type, title, message, duration = 5000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-circle-check',
        warning: 'fa-triangle-exclamation',
        danger: 'fa-circle-xmark',
        discovery: 'fa-magnifying-glass',
        info: 'fa-circle-info'
    };
    
    toast.innerHTML = `
        <i class="fa-solid ${icons[type] || 'fa-circle-info'}"></i>
        <div class="toast-content">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==================== ALERT SYSTEM ====================
const alertQueue = [];
let alertShowing = false;

function showAlert(type, message) {
    alertQueue.push({ type, message });
    processAlertQueue();
}

function processAlertQueue() {
    if (alertShowing || alertQueue.length === 0) return;
    
    alertShowing = true;
    const { type, message } = alertQueue.shift();
    
    const overlay = document.getElementById('alert-overlay');
    const box = document.getElementById('alert-box');
    const iconDisplay = document.getElementById('alert-icon-display');
    const messageEl = document.getElementById('alert-message');
    
    const icons = {
        warning: '⚠️',
        danger: '🚨',
        info: '💡',
        success: '✅'
    };
    
    box.className = `alert-box ${type}`;
    iconDisplay.textContent = icons[type] || '💡';
    messageEl.innerHTML = message;
    
    overlay.classList.add('active');
}

function dismissAlert() {
    document.getElementById('alert-overlay').classList.remove('active');
    alertShowing = false;
    
    // Show next alert after a short delay
    setTimeout(() => processAlertQueue(), 300);
}

// ==================== RESET FUNCTION ====================
function resetAllPermissions() {
    if (confirm('Reset all permissions and start the investigation fresh?')) {
        // Reset state
        appState.permissions = {
            browserCookies: null,
            connectifyTerms: false,
            connectifyLocation: null,
            mapmeLocation: null,
            freegameTerms: false,
            freegameCamera: false,
            freegameContacts: false,
            freegameCookies: null
        };
        appState.footprint = [];
        appState.discoveries = [];
        appState.completedMissions = [];
        appState.visitedApps = [];
        appState.unlockedApps = ['messages', 'settings'];
        appState.missionRequirements = {
            browser: { testedBoth: false, acceptedAll: false, acceptedNecessary: false },
            connectify: { foundClauses: 0, madeChoice: false },
            mapme: { testedPrecise: false, testedApproximate: false },
            freegame: { madeChoice: false, foundSecrets: 0 }
        };
        
        // Update UI
        updateHomeIcons();
        updateMissionPanel();
        updateFootprintPanel();
        
        // Reset permission displays
        document.getElementById('perm-location').textContent = 'Off';
        document.getElementById('perm-photos').textContent = 'Off';
        document.getElementById('perm-tracking').textContent = 'Off';
        document.getElementById('perm-cookies').textContent = 'None';
        
        showToast('success', 'Reset Complete', 'All permissions cleared. Start fresh!');
        goHome();
    }
}

// ==================== EXPORT REPORT ====================
function exportReport() {
    const reportContent = generateReportContent();
    
    // Create a blob and download
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My_Digital_Footprint_Report.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('success', 'Report Downloaded!', 'Check your downloads folder');
}

function generateReportContent() {
    const date = new Date().toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const footprintList = appState.footprint.map(f => `<li>📌 ${f.item} (from ${f.source})</li>`).join('');
    const discoveriesList = appState.discoveries.map(d => `<li>🔍 <strong>${d.title}:</strong> ${d.description}</li>`).join('');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>My Digital Footprint Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            max-width: 700px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .report {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1a1a2e;
            border-bottom: 3px solid #007AFF;
            padding-bottom: 10px;
        }
        h2 {
            color: #333;
            margin-top: 30px;
        }
        .stat-box {
            display: flex;
            gap: 20px;
            margin: 20px 0;
        }
        .stat {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            flex: 1;
            text-align: center;
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #007AFF;
        }
        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        .warning-box {
            background: #FFF3CD;
            border-left: 5px solid #FFD700;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 10px 10px 0;
        }
        .success-box {
            background: #D4EDDA;
            border-left: 5px solid #28A745;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 10px 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #999;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="report">
        <h1>🕵️ My Digital Footprint Report</h1>
        <p><strong>Date:</strong> ${date}</p>
        
        <div class="stat-box">
            <div class="stat">
                <div class="stat-number">${appState.footprint.length}</div>
                <div class="stat-label">Data Items Shared</div>
            </div>
            <div class="stat">
                <div class="stat-number">${appState.discoveries.length}</div>
                <div class="stat-label">Secrets Discovered</div>
            </div>
            <div class="stat">
                <div class="stat-number">${appState.completedMissions.length}</div>
                <div class="stat-label">Missions Completed</div>
            </div>
        </div>
        
        <h2>📊 Data I Shared</h2>
        ${appState.footprint.length > 0 ? `<ul>${footprintList}</ul>` : '<p>No data was shared - great privacy protection!</p>'}
        
        <h2>🔍 Secrets I Discovered</h2>
        ${appState.discoveries.length > 0 ? `<ul>${discoveriesList}</ul>` : '<p>No hidden secrets found yet.</p>'}
        
        <h2>📝 My Privacy Settings</h2>
        <ul>
            <li><strong>Browser Cookies:</strong> ${appState.permissions.browserCookies || 'Not set'}</li>
            <li><strong>MapMe Location:</strong> ${appState.permissions.mapmeLocation || 'Not set'}</li>
            <li><strong>FreeGame Terms:</strong> ${appState.permissions.freegameTerms ? 'Accepted' : 'Not accepted'}</li>
            <li><strong>FreeGame Camera:</strong> ${appState.permissions.freegameCamera ? 'Allowed' : 'Denied'}</li>
            <li><strong>FreeGame Contacts:</strong> ${appState.permissions.freegameContacts ? 'Allowed' : 'Denied'}</li>
        </ul>
        
        <div class="warning-box">
            <strong>⚠️ Remember:</strong> Every time you use an app, think about what data you're sharing and whether it's really necessary!
        </div>
        
        <div class="success-box">
            <strong>✅ Key Learning:</strong> Apps often ask for more data than they need. You can protect your privacy by:
            <ul>
                <li>Reading Terms & Conditions (look for yellow flags!)</li>
                <li>Choosing "Approximate Location" when possible</li>
                <li>Only accepting "Necessary" cookies</li>
                <li>Saying "No" to cross-app tracking</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Generated by Data Detective - Digital Footprint Investigation</p>
        </div>
    </div>
</body>
</html>
    `;
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGuideModal();
        dismissAlert();
        closeCompleteModal();
        hidePermissionDialog();
    }
});

