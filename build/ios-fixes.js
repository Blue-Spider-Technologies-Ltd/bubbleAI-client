/**
 * iOS PWA fixes and enhancements
 * This script addresses various iOS-specific issues when running as a PWA
 */

(function() {
  // Check if running on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (!isIOS) return;
  
  // Check if running in standalone mode (installed as PWA)
  const isInStandaloneMode = window.navigator.standalone === true;
  
  // Add a class to the body for iOS-specific styling
  document.body.classList.add('ios-device');
  
  if (isInStandaloneMode) {
    document.body.classList.add('ios-pwa');
    
    // Fix for iOS PWA navigation issues
    // This helps with handling external links and routing
    document.addEventListener('click', function(e) {
      let target = e.target;
      
      // Traverse up to find closest anchor tag
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      
      // If we found an anchor tag
      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');
        
        // Skip if no href, has target, or is a special link
        if (!href || target.getAttribute('target') || 
            href.startsWith('#') || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:') ||
            href.startsWith('sms:') ||
            href.startsWith('javascript:')) {
          return;
        }
        
        // Check if it's an external link
        if (href.startsWith('http') && !href.includes(window.location.hostname)) {
          // Open external links in a new tab
          e.preventDefault();
          window.open(href, '_blank');
          return;
        }
        
        // For internal links, let the router handle it
      }
    }, false);
    
    // Fix for iOS PWA status bar appearance
    const metaStatusBar = document.createElement('meta');
    metaStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    metaStatusBar.setAttribute('content', 'black-translucent');
    document.head.appendChild(metaStatusBar);
    
    // Fix for iOS PWA input focus issues
    const fixIOSInputs = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          // Add some padding to the bottom of the page when keyboard appears
          document.body.classList.add('keyboard-open');
          
          // Scroll the input into view with some extra space
          setTimeout(() => {
            window.scrollTo(0, this.getBoundingClientRect().top - 100);
          }, 300);
        });
        
        input.addEventListener('blur', function() {
          document.body.classList.remove('keyboard-open');
        });
      });
    };
    
    // Apply input fixes when DOM changes
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(fixIOSInputs);
      observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Initial application of input fixes
    document.addEventListener('DOMContentLoaded', fixIOSInputs);
    
    // Fix for iOS PWA orientation changes
    window.addEventListener('orientationchange', function() {
      // Small timeout to ensure the orientation has fully changed
      setTimeout(() => {
        // Force redraw by toggling a class
        document.body.classList.add('orientation-changed');
        setTimeout(() => {
          document.body.classList.remove('orientation-changed');
        }, 50);
      }, 300);
    });
    
    // Fix for iOS PWA scroll bounce
    document.addEventListener('touchmove', function(e) {
      // If at the top and trying to scroll up, or at the bottom and trying to scroll down
      if ((window.scrollY === 0 && e.touches[0].screenY > 0) ||
          (window.scrollY + window.innerHeight >= document.body.scrollHeight && e.touches[0].screenY < 0)) {
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  // iOS viewport height fix (for both standalone and non-standalone)
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  setViewportHeight();
})();
