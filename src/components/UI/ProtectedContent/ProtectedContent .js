import React, { useEffect } from 'react';

const ProtectedContent = ({ children }) => {
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleScreenshot = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('screenshot', handleScreenshot);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('screenshot', handleScreenshot);
    };
  }, []);

  return <div>{children}</div>;
};

export default ProtectedContent;
