import React, { useState, useEffect } from 'react';
import { isRunningAsPWA, showInstallPrompt, isIOS } from '../../utils/pwa-utils';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Snackbar, Box, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  position: 'fixed',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 400,
    left: 'auto',
    right: theme.spacing(2),
  },
}));

const InstallButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Only show the install prompt if not already running as PWA
    if (!isRunningAsPWA()) {
      // Listen for the custom event that indicates PWA installation is available
      const handlePWAAvailable = () => {
        setShowPrompt(true);
      };

      window.addEventListener('pwaInstallAvailable', handlePWAAvailable);

      // Check if we're on iOS to show special instructions
      if (isIOS()) {
        // On iOS, we need to show manual instructions
        // Wait a bit before showing to not overwhelm the user immediately
        const timer = setTimeout(() => {
          setShowIOSInstructions(true);
        }, 5000);
        
        return () => {
          clearTimeout(timer);
          window.removeEventListener('pwaInstallAvailable', handlePWAAvailable);
        };
      }

      return () => {
        window.removeEventListener('pwaInstallAvailable', handlePWAAvailable);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    const installed = await showInstallPrompt();
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
  };

  // Don't render anything if running as PWA
  if (isRunningAsPWA()) {
    return null;
  }

  // For iOS devices, show special instructions
  if (showIOSInstructions) {
    return (
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
          <Typography variant="h6" component="div">
            Install Bubble AI
          </Typography>
          <IconButton size="small" onClick={handleClose} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          To install Bubble AI on your iOS device:
        </Typography>
        
        <Box sx={{ width: '100%', mb: 1 }}>
          <Typography variant="body2" component="div">
            1. Tap the share icon <span style={{ fontSize: '1.2em' }}>⎙</span> at the bottom of your screen
          </Typography>
          <Typography variant="body2" component="div">
            2. Scroll down and tap "Add to Home Screen"
          </Typography>
          <Typography variant="body2" component="div">
            3. Tap "Add" in the top right corner
          </Typography>
        </Box>
        
        <Button 
          variant="outlined" 
          onClick={handleClose}
          fullWidth
        >
          Got it
        </Button>
      </StyledPaper>
    );
  }

  // For other browsers that support the install prompt
  if (showPrompt) {
    return (
      <Snackbar
        open={showPrompt}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
            <Typography variant="h6" component="div">
              Install Bubble AI
            </Typography>
            <IconButton size="small" onClick={handleClose} aria-label="close">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" sx={{ mb: 1 }}>
            Install Bubble AI for a better experience with offline access and faster loading times.
          </Typography>
          
          <InstallButton
            variant="contained"
            startIcon={<GetAppIcon />}
            onClick={handleInstallClick}
            fullWidth
          >
            Install App
          </InstallButton>
        </StyledPaper>
      </Snackbar>
    );
  }

  return null;
};

export default PWAInstallPrompt;
