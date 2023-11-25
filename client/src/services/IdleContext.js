import React, { createContext, useContext, useEffect, useState } from 'react';
import useIdleTimeout from '../services/useIdleTimeout';

const IdleContext = createContext();

// Define handleIdleTimeout outside of IdleProvider
export const handleIdleTimeout = () => {
  window.location.href = '/Login';
};

export const IdleProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const { isIdle, setIdle, idleTimer } = useIdleTimeout({
    onIdle: () => {
      console.log('user has gone idle');
    },
    idleTime: 9000, // Set the idle time in minutes
  });

  // Optional: You might want to clear the idle state when the component unmounts
  useEffect(() => {
    return () => {
      setIdle(false);
    };
  }, []);

  // Start or reset the idle timer when the component renders
  useEffect(() => {
    if (isActive) {
      idleTimer.reset();
    }
  }, [isActive, idleTimer]);

  const value = { isIdle, setIdle, idleTimer, startIdle: () => setIsActive(true) };

  return <IdleContext.Provider value={value}>{children}</IdleContext.Provider>;
};

export const useIdle = () => {
  const context = useContext(IdleContext);
  if (!context) {
    throw new Error('useIdle must be used within an IdleProvider');
  }
  return context;
};
