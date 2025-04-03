/**
 * Performance Fixes
 * Optimizations and fixes to improve PWA performance
 */

(function() {
  // Check if the browser supports the features we need
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  const supportsIdleCallback = 'requestIdleCallback' in window;
  
  // Polyfill for requestIdleCallback if not available
  if (!supportsIdleCallback) {
    window.requestIdleCallback = function(callback, options) {
      const start = Date.now();
      return setTimeout(function() {
        callback({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };
    
    window.cancelIdleCallback = function(id) {
      clearTimeout(id);
    };
  }
  
  // Lazy load images
  if (supportsIntersectionObserver) {
    const lazyLoadImages = () => {
      const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
      
      if (lazyImages.length === 0) {
        return;
      }
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
            }
            
            lazyImage.classList.add('loaded');
            imageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(lazyImage => {
        imageObserver.observe(lazyImage);
      });
    };
    
    // Initialize lazy loading
    if (document.readyState === 'complete') {
      lazyLoadImages();
    } else {
      window.addEventListener('load', lazyLoadImages);
    }
    
    // Re-check for new images when DOM changes
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(lazyLoadImages);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  // Defer non-critical CSS
  const deferCSS = (url) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.type = 'text/css';
    link.media = 'print';
    document.head.appendChild(link);
    
    // Switch to all media after load
    window.requestIdleCallback(() => {
      link.onload = () => {
        link.media = 'all';
      };
    });
  };
  
  // Preconnect to important domains
  const preconnect = (url) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };
  
  // Prefetch important pages
  const prefetch = (url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };
  
  // Preload critical assets
  const preload = (url, as) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  };
  
  // Optimize font loading
  const optimizeFonts = () => {
    // Add font-display: swap to all font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap !important;
      }
    `;
    document.head.appendChild(style);
  };
  
  // Optimize animations
  const optimizeAnimations = () => {
    // Add a class to the body when animations should be disabled
    const disableAnimations = () => {
      document.body.classList.add('reduce-motion');
    };
    
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      disableAnimations();
    }
    
    // Listen for changes to the prefers-reduced-motion media query
    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        disableAnimations();
      } else {
        document.body.classList.remove('reduce-motion');
      }
    });
    
    // Add CSS for reduced motion
    const style = document.createElement('style');
    style.textContent = `
      .reduce-motion * {
        animation-duration: 0.001s !important;
        transition-duration: 0.001s !important;
      }
    `;
    document.head.appendChild(style);
  };
  
  // Optimize rendering
  const optimizeRendering = () => {
    // Add CSS containment to improve rendering performance
    const style = document.createElement('style');
    style.textContent = `
      .card, .panel, .list-item {
        contain: content;
      }
      
      .scrollable {
        contain: strict;
      }
      
      .static-content {
        contain: paint style layout;
      }
    `;
    document.head.appendChild(style);
  };
  
  // Initialize optimizations
  const initOptimizations = () => {
    // Preconnect to important domains
    preconnect('https://fonts.googleapis.com');
    preconnect('https://fonts.gstatic.com');
    
    // Optimize fonts
    optimizeFonts();
    
    // Optimize animations
    optimizeAnimations();
    
    // Optimize rendering
    optimizeRendering();
    
    // Prefetch important pages
    window.requestIdleCallback(() => {
      // Prefetch the most common navigation targets
      prefetch('/');
      prefetch('/login');
      prefetch('/dashboard');
    });
  };
  
  // Run optimizations when the page is loaded
  if (document.readyState === 'complete') {
    initOptimizations();
  } else {
    window.addEventListener('load', initOptimizations);
  }
  
  // Expose performance utilities to window
  window.performanceUtils = {
    deferCSS,
    preconnect,
    prefetch,
    preload
  };
})();
