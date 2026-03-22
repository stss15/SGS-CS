(function () {
    const html = document.documentElement;
    const localhostHosts = new Set(['localhost', '127.0.0.1', '::1']);
    const authModeParam = new URLSearchParams(window.location.search).get('auth');
    const isLocalhost = localhostHosts.has(window.location.hostname);
    const bypassAuthForLocal =
        isLocalhost && authModeParam !== 'on' && authModeParam !== 'force';
    const firebaseScriptTimeoutMs = 5000;
    const isSlideContext = () => {
        return Boolean(document.querySelector('.reveal .slides')) || /\/slides\//.test(window.location.pathname);
    };
    const state = {
        auth: null,
        modal: null,
        emailInput: null,
        passwordInput: null,
        submitBtn: null,
        errorEl: null,
        logoutControl: null
    };

    const setAuthReady = () => {
        html.classList.remove('auth-pending');
        html.classList.add('auth-ready');
    };

    const ensureBodyClass = (locked) => {
        document.body.classList.toggle('sgs-auth-locked', locked);
    };

    const setError = (message) => {
        if (!state.errorEl) return;
        state.errorEl.textContent = message || '';
    };

    const setSubmitting = (submitting) => {
        if (!state.submitBtn) return;
        state.submitBtn.disabled = submitting;
        state.submitBtn.textContent = submitting ? 'Signing in...' : 'Sign in';
    };

    const mapAuthError = (error) => {
        const code = error && error.code ? error.code : '';
        if (code === 'auth/invalid-email') return 'Please enter a valid email address.';
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
            return 'Incorrect username or password.';
        }
        if (code === 'auth/too-many-requests') return 'Too many attempts. Try again in a few minutes.';
        return 'Unable to sign in. Please try again.';
    };

    const ensureLogoutControl = () => {
        if (state.logoutControl) return state.logoutControl;

        const authSlot = document.querySelector('[data-auth-slot]');
        if (authSlot) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'sgs-auth-logout-inline';
            btn.hidden = true;
            btn.innerHTML = '<i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i><span>Log out</span>';
            btn.setAttribute('aria-label', 'Log out');
            authSlot.appendChild(btn);
            state.logoutControl = btn;
            return btn;
        }

        const menu = document.getElementById('tools-menu');
        if (menu) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'tool-item';
            btn.hidden = true;
            btn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Log out';
            menu.appendChild(btn);
            state.logoutControl = btn;
            return btn;
        }

        const floating = document.createElement('button');
        floating.type = 'button';
        floating.className = 'sgs-auth-logout-fab';
        if (isSlideContext()) {
            floating.classList.add('sgs-auth-logout-fab--slide');
        }
        floating.hidden = true;
        floating.innerHTML = '<i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i><span>Log out</span>';
        floating.setAttribute('aria-label', 'Log out');
        document.body.appendChild(floating);
        state.logoutControl = floating;
        return floating;
    };

    const toggleLogoutControl = (visible) => {
        const control = ensureLogoutControl();
        control.hidden = !visible;
    };

    const ensureModal = () => {
        if (state.modal) return state.modal;

        const overlay = document.createElement('div');
        overlay.id = 'sgs-auth-overlay';
        overlay.className = 'sgs-auth-overlay';
        overlay.innerHTML = `
            <div class="sgs-auth-modal" role="dialog" aria-modal="true" aria-labelledby="sgs-auth-title">
                <div class="sgs-auth-modal-header">
                    <img class="sgs-auth-logo" src="/images/logo-mark.svg" alt="SGS Logo" width="78" height="78">
                    <h2 class="sgs-auth-title" id="sgs-auth-title">SGS Education Login</h2>
                    <p class="sgs-auth-subtitle">Sign in to continue</p>
                </div>
                <form class="sgs-auth-body" id="sgs-auth-form">
                    <div class="sgs-auth-field">
                        <label for="sgs-auth-email">Username</label>
                        <input id="sgs-auth-email" type="email" autocomplete="username" required>
                    </div>
                    <div class="sgs-auth-field">
                        <label for="sgs-auth-password">Password</label>
                        <input id="sgs-auth-password" type="password" autocomplete="current-password" required>
                    </div>
                    <div class="sgs-auth-actions">
                        <button class="sgs-auth-submit" type="submit">Sign in</button>
                        <p class="sgs-auth-error" id="sgs-auth-error" role="alert" aria-live="polite"></p>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);
        state.modal = overlay;
        state.emailInput = overlay.querySelector('#sgs-auth-email');
        state.passwordInput = overlay.querySelector('#sgs-auth-password');
        state.submitBtn = overlay.querySelector('.sgs-auth-submit');
        state.errorEl = overlay.querySelector('#sgs-auth-error');

        const form = overlay.querySelector('#sgs-auth-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!state.auth) return;

            const email = state.emailInput.value.trim();
            const password = state.passwordInput.value;

            if (!email || !password) {
                setError('Enter both username and password.');
                return;
            }

            setSubmitting(true);
            setError('');

            try {
                await state.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                await state.auth.signInWithEmailAndPassword(email, password);
                state.passwordInput.value = '';
            } catch (error) {
                setError(mapAuthError(error));
            } finally {
                setSubmitting(false);
            }
        });

        return overlay;
    };

    const showModal = () => {
        const modal = ensureModal();
        modal.classList.add('active');
        ensureBodyClass(true);
        if (state.emailInput && !state.emailInput.value) {
            state.emailInput.value = 'user@sgs-science.com';
        }
        state.passwordInput && state.passwordInput.focus();
    };

    const hideModal = () => {
        if (!state.modal) return;
        state.modal.classList.remove('active');
        setError('');
        ensureBodyClass(false);
    };

    const bindLogout = () => {
        const control = ensureLogoutControl();
        if (control.dataset.authBound === 'true') return;
        control.dataset.authBound = 'true';
        control.addEventListener('click', async () => {
            if (!state.auth) return;
            try {
                await state.auth.signOut();
                // Force a new document load so browser back does not restore a stale protected snapshot.
                window.location.replace(window.location.pathname + window.location.search + window.location.hash);
            } catch (error) {
                console.error('[auth-gate] Logout failed', error);
            }
        });
    };

    const startAuth = () => {
        if (!window.firebase || !window.firebase.apps || window.firebase.apps.length === 0) {
            return false;
        }

        state.auth = window.firebase.auth();
        bindLogout();
        state.auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL).catch(() => {
            // Persistence fallback is handled by Firebase Auth.
        });

        state.auth.onAuthStateChanged((user) => {
            if (user) {
                hideModal();
                toggleLogoutControl(true);
            } else {
                showModal();
                toggleLogoutControl(false);
            }
            setAuthReady();
        });

        const enforceLockedState = () => {
            if (!state.auth || state.auth.currentUser) return;
            showModal();
            toggleLogoutControl(false);
        };

        window.addEventListener('pageshow', (event) => {
            if (!event.persisted || !state.auth) return;
            enforceLockedState();
        });
        window.addEventListener('popstate', enforceLockedState);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                enforceLockedState();
            }
        });

        return true;
    };

    const handleNoFirebase = () => {
        if (localhostHosts.has(window.location.hostname)) {
            setAuthReady();
            return;
        }
        showModal();
        setError('Authentication service unavailable. Refresh the page or contact support.');
        setAuthReady();
    };

    const boot = () => {
        if (bypassAuthForLocal) {
            setAuthReady();
            return;
        }

        let elapsed = 0;
        const tickMs = 100;

        const attempt = () => {
            if (startAuth()) return;
            elapsed += tickMs;
            if (elapsed >= firebaseScriptTimeoutMs) {
                handleNoFirebase();
                return;
            }
            window.setTimeout(attempt, tickMs);
        };

        attempt();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
