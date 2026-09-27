/* ============================================================
   SOURCE CODE PROTECTION SCRIPT
   © Ayub Khan — All Rights Reserved
   Domain Lock: quran-paak.vercel.app
============================================================ */

(function() {
    'use strict';

    // ✅ Allowed domains
    const ALLOWED_DOMAINS = [
        'quran-paak.vercel.app',
        'localhost',
        '127.0.0.1'
    ];

    // ✅ Check current domain
    const currentDomain = window.location.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(allowed => {
        // Exact match or subdomain match
        return currentDomain === allowed || currentDomain.endsWith('.' + allowed);
    });

    // ❌ Not allowed → block karo
    if (!isAllowed) {
        document.documentElement.innerHTML = `
            <div style="
                display:flex;align-items:center;justify-content:center;
                height:100vh;background:linear-gradient(135deg,#0a0a0a,#1a1200);
                color:#FFD400;font-family:sans-serif;text-align:center;
                padding:2rem;flex-direction:column;margin:0;
            ">
                <div style="font-size:4rem;margin-bottom:1.5rem;
                    text-shadow:0 0 30px rgba(255,212,0,0.6);">🔒</div>
                <h1 style="
                    font-size:1.6rem;margin-bottom:0.7rem;
                    color:#FFD400;letter-spacing:0.1em;
                ">Unauthorized Domain</h1>
                <p style="color:#999;font-size:0.95rem;max-width:400px;line-height:1.6;">
                    This application is protected and can only run on its official domain.
                </p>
                <p style="color:#666;font-size:0.8rem;margin-top:2rem;">
                    © Ayub Khan — All Rights Reserved
                </p>
                <a href="https://quran-paak.vercel.app"
                   style="
                       margin-top:1.5rem;padding:0.7rem 1.5rem;
                       background:linear-gradient(135deg,#9A7B00,#FFD400);
                       color:#000;border-radius:8px;text-decoration:none;
                       font-weight:700;font-size:0.85rem;
                   ">
                   Visit Official Site
                </a>
            </div>
        `;
        // Poora script ro do
        throw new Error('🔒 Unauthorized Domain — © Ayub Khan');
    }

    // ============================================================
    // ✅ PROTECTION FEATURES (Sirf allowed domain par chalenge)
    // ============================================================

    // 1. Right-Click Disable
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 2. Text Selection Disable (inputs ke ilawa)
    document.addEventListener('selectstart', function(e) {
        const tag = e.target.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // 3. Drag & Drop Disable
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 4. Copy Disable (inputs ke ilawa)
    document.addEventListener('copy', function(e) {
        const tag = e.target.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault();
            if (window.UI && typeof UI.showToast === 'function') {
                UI.showToast('🚫 Copy not allowed');
            }
            return false;
        }
    });

    // 5. Cut Disable
    document.addEventListener('cut', function(e) {
        const tag = e.target.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // 6. Keyboard Shortcuts Block
    document.addEventListener('keydown', function(e) {
        const key = e.key.toUpperCase();

        // F12 — DevTools
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I / J / C — DevTools
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U — View Source
        if (e.ctrlKey && key === 'U') {
            e.preventDefault();
            return false;
        }

        // Ctrl+S — Save
        if (e.ctrlKey && key === 'S') {
            e.preventDefault();
            return false;
        }

        // Ctrl+A — Select All
        if (e.ctrlKey && key === 'A') {
            const tag = document.activeElement.tagName;
            if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        }

        // Ctrl+P — Print
        if (e.ctrlKey && key === 'P') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+K — Firefox Console
        if (e.ctrlKey && e.shiftKey && key === 'K') {
            e.preventDefault();
            return false;
        }

        // Cmd+Option+I / J / C — Mac
        if (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(key)) {
            e.preventDefault();
            return false;
        }

        // Cmd+U — Mac View Source
        if (e.metaKey && key === 'U') {
            e.preventDefault();
            return false;
        }

        // Cmd+S — Mac Save
        if (e.metaKey && key === 'S') {
            e.preventDefault();
            return false;
        }
    });

    // 7. Prevent iframe embedding (Clickjacking)
    try {
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
    } catch (e) {
        // Cross-origin iframe — block karo
        document.documentElement.innerHTML = `
            <div style="padding:3rem;text-align:center;font-family:sans-serif;">
                <h1 style="color:#FFD400;">🔒 Blocked</h1>
                <p style="color:#888;">This site cannot be embedded in an iframe.</p>
            </div>
        `;
    }

    // 8. DevTools Open Detection (optional, halka sa effect)
    let devtoolsOpen = false;
    const threshold = 160;
    setInterval(function() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const isOpen = widthDiff > threshold || heightDiff > threshold;

        if (isOpen && !devtoolsOpen) {
            devtoolsOpen = true;
            // Halka sa console clean karo
            try { console.clear(); } catch(e) {}
        } else if (!isOpen && devtoolsOpen) {
            devtoolsOpen = false;
        }
    }, 1500);

    // 9. Console Warning Message (jo bhi console khole)
    const warnStyle = 'color:#FF0000;font-size:32px;font-weight:bold;text-shadow:0 0 10px rgba(255,0,0,0.5);';
    const infoStyle = 'color:#FFD400;font-size:15px;font-weight:bold;';
    const noteStyle = 'color:#888;font-size:12px;';

    console.log('%c⚠️  STOP!', warnStyle);
    console.log('%cYe ek protected application hai.', infoStyle);
    console.log('%cYahan kuch bhi paste karna aapki security ke liye khatarnak ho sakta hai.', noteStyle);
    console.log('%c© Ayub Khan — All Rights Reserved', noteStyle);

    // 10. Disable inspect element shortcut (bonus)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'E') {
            e.preventDefault();
            return false;
        }
    });

})();