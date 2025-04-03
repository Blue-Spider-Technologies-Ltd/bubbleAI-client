// PWA Utility functions

/**
 * Registers the service worker for PWA functionality
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
          
          // Handle service worker updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the updated precached content has been fetched,
                  // but the previous service worker will still serve the older
                  // content until all client tabs are closed.
                  console.log('New content is available and will be used when all tabs for this page are closed.');
                  
                  // Dispatch an event to notify the app about the update
                  window.dispatchEvent(new CustomEvent('serviceWorkerUpdateAvailable'));
                } else {
                  // At this point, everything has been precached.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
};

/**
 * Checks if the app is running in standalone mode (installed as PWA)
 * @returns {boolean} True if the app is running in standalone mode
 */
export const isRunningAsPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone || 
         document.referrer.includes('android-app://');
};

/**
 * Checks if the app is running on iOS
 * @returns {boolean} True if the app is running on iOS
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Checks if the app is running on Android
 * @returns {boolean} True if the app is running on Android
 */
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

/**
 * Checks if the browser supports notifications
 * @returns {boolean} True if the browser supports notifications
 */
export const supportsNotifications = () => {
  return 'Notification' in window;
};

/**
 * Requests notification permission
 * @returns {Promise<string>} A promise that resolves to the permission state
 */
export const requestNotificationPermission = async () => {
  // Only request permission if the app is running as a PWA
  if (!isRunningAsPWA()) {
    console.log('Not requesting notification permission in browser mode');
    return 'denied';
  }
  
  if (!supportsNotifications()) {
    console.log('Notifications not supported');
    return 'denied';
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
};

/**
 * Checks if the app can be installed
 * @returns {Promise<boolean>} A promise that resolves to true if the app can be installed
 */
export const canInstallPWA = async () => {
  // Don't show install prompt if already running as PWA
  if (isRunningAsPWA()) {
    return false;
  }
  
  // Check if the browser supports PWA installation
  return 'BeforeInstallPromptEvent' in window;
};

// Store the deferred prompt for later use
let deferredPrompt = null;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e;
  
  // Dispatch an event to notify the app that installation is available
  window.dispatchEvent(new CustomEvent('pwaInstallAvailable'));
});

/**
 * Shows the PWA install prompt
 * @returns {Promise<boolean>} A promise that resolves to true if the user accepted the installation
 */
export const showInstallPrompt = async () => {
  if (!deferredPrompt) {
    console.log('No installation prompt available');
    return false;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  
  // Clear the deferred prompt
  deferredPrompt = null;
  
  // Return true if the user accepted the installation
  return choiceResult.outcome === 'accepted';
};

// Listen for the appinstalled event
window.addEventListener('appinstalled', () => {
  // Clear the deferredPrompt variable
  deferredPrompt = null;
  
  // Log the installation
  console.log('PWA was installed');
  
  // Dispatch an event to notify the app that installation is complete
  window.dispatchEvent(new CustomEvent('pwaInstalled'));
});
