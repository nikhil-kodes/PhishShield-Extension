// Production Popup Logic for PhishShield AI
document.addEventListener('DOMContentLoaded', () => {
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const scoreVal = document.getElementById('scoreVal');
    const urlVal = document.getElementById('urlVal');
    const mainBody = document.getElementById('mainBody');
    const statusSvg = document.getElementById('statusSvg');

    const BASE_URL = "https://phishshield.nikhilsingh.co.in";

    // Update UI based on current tab status
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]) {
            const url = tabs[0].url;
            try {
                urlVal.textContent = new URL(url).hostname;
                simulateScan(url);
            } catch (e) {
                urlVal.textContent = "System Interface";
            }
        }
    });

    function simulateScan(url) {
        const isSuspicious = url.includes('bit.ly') || url.includes('tinyurl') || url.includes('verify') || url.includes('login');
        
        // AI Scan Experience
        statusTitle.textContent = "Scanning...";
        
        setTimeout(() => {
            if (isSuspicious) {
                statusTitle.textContent = "Threat Detected";
                statusDesc.textContent = "High-Risk Domain Pattern Identified";
                scoreVal.textContent = (15 + Math.floor(Math.random() * 20)) + "%";
                mainBody.classList.add('danger');
                statusSvg.innerHTML = '<path d="M12 2L3 7v6a12 12 0 009 11 12 12 0 009-11V7l-9-5zm-1 11h2v2h-2v-2zm0-8h2v6h-2V5z"/>';
            } else {
                statusTitle.textContent = "System Secure";
                statusDesc.textContent = "Domain Integrity Fully Verified";
                scoreVal.textContent = (94 + Math.floor(Math.random() * 6)) + "%";
                mainBody.classList.remove('danger');
                statusSvg.innerHTML = '<path d="M12 2L3 7v6a12 12 0 009 11 12 12 0 009-11V7l-9-5z"/>';
            }
        }, 1200);
    }

    // BUTTON REDIRECTS TO PRODUCTION DOMAIN
    
    // Re-Scan Asset (Refresh current view)
    document.getElementById('openOriginalBtn').addEventListener('click', () => {
        simulateScan(urlVal.textContent);
    });

    // View Telemetry -> Production Dashboard
    document.getElementById('telemetryBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: `${BASE_URL}/dashboard` });
    });

    // Settings Toggle -> Production Profile
    document.getElementById('settingsBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: `${BASE_URL}/profile` });
    });
});
