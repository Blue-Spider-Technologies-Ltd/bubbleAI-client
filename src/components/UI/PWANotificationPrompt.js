import React, { useState, useEffect } from 'react';
import { isRunningAsPWA, supportsNotifications, requestNotificationPermission } from '../../utils/pwa-utils';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Box, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

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

const NotificationButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const PWANotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Only show notification prompt if running as PWA and notifications are supported
    if (isRunningAsPWA() && supportsNotifications()) {
      // Check if we already have permission
      if (Notification.permission === 'default') {
        // Wait a bit before showing to not overwhelm the user immediately
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 10000); // Show after 10 seconds of using the app
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleRequestPermission = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted' || permission === 'denied') {
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  // Don't render anything if not running as PWA or if notifications aren't supported
  if (!isRunningAsPWA() || !supportsNotifications() || !showPrompt) {
    return null;
  }

  return (
    <StyledPaper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
        <Typography variant="h6" component="div">
          Enable Notifications
        </Typography>
        <IconButton size="small" onClick={handleClose} aria-label="close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 1 }}>
        Get notified about important updates, new features, and personalized content from Bubble AI.
      </Typography>
      
      <NotificationButton
        variant="contained"
        startIcon={<NotificationsIcon />}
        onClick={handleRequestPermission}
        fullWidth
      >
        Enable Notifications
      </NotificationButton>
    </StyledPaper>
  );
};

export default PWANotificationPrompt;
