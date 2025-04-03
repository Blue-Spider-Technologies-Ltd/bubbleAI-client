/**
 * Network Detector
 * Monitors and handles online/offline status changes
 */

(function() {
  // Store the current online status
  let isOnline = navigator.onLine;
  
  // Create a toast notification element
  const createToast = (message, type) => {
    // Remove any existing toast
    const existingToast = document.getElementById('network-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.id = 'network-toast';
    toast.className = `network-toast ${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: type === 'online' ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: '10000',
      transition: 'opacity 0.3s ease-in-out',
      opacity: '0',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'bold'
    });
    
    // Add to document
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };
  
  // Add a class to the body based on network status
  const updateBodyClass = () => {
    if (isOnline) {
      document.body.classList.remove('offline');
      document.body.classList.add('online');
    } else {
      document.body.classList.remove('online');
      document.body.classList.add('offline');
    }
  };
  
  // Handle going online
  const handleOnline = () => {
    if (!isOnline) {
      isOnline = true;
      updateBodyClass();
      createToast('You are back online', 'online');
      
      // Dispatch a custom event
      window.dispatchEvent(new CustomEvent('networkStatusChange', { 
        detail: { online: true } 
      }));
    }
  };
  
  // Handle going offline
  const handleOffline = () => {
    if (isOnline) {
      isOnline = false;
      updateBodyClass();
      createToast('You are offline. Some features may be unavailable.', 'offline');
      
      // Dispatch a custom event
      window.dispatchEvent(new CustomEvent('networkStatusChange', { 
        detail: { online: false } 
      }));
    }
  };
  
  // Add event listeners for online/offline events
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Initial setup
  updateBodyClass();
  
  // Periodically check connection by making a small request
  const checkConnection = async () => {
    try {
      // Try to fetch a tiny resource to check real connectivity
      // Use a timestamp to prevent caching
      const response = await fetch('/favicon.ico?_=' + new Date().getTime(), {
        method: 'HEAD',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok && !isOnline) {
        handleOnline();
      }
    } catch (error) {
      if (isOnline) {
        handleOffline();
      }
    }
  };
  
  // Check connection every 30 seconds
  setInterval(checkConnection, 30000);
  
  // Also check when the page becomes visible again
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkConnection();
    }
  });
  
  // Add CSS for offline indicator
  const style = document.createElement('style');
  style.textContent = `
    .offline-indicator {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #f44336;
      color: white;
      text-align: center;
      padding: 5px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 9999;
    }
    
    body.offline .offline-indicator {
      display: block;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.8; }
      100% { opacity: 1; }
    }
    
    body.offline .offline-only {
      display: block !important;
    }
    
    body.online .online-only {
      display: block !important;
    }
    
    body.offline .online-only {
      display: none !important;
    }
    
    body.online .offline-only {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // Create offline indicator
  const offlineIndicator = document.createElement('div');
  offlineIndicator.className = 'offline-indicator';
  offlineIndicator.textContent = '⚠️ You are currently offline';
  document.body.appendChild(offlineIndicator);
  
  // Expose network status to window
  window.networkStatus = {
    isOnline: () => isOnline,
    checkConnection
  };
})();
