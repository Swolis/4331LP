// ModeContext.js
import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(0); // Default mode is 0 (disabled)

  const toggleMode = (newMode) => {
    if (newMode >= 0) {
      setMode(newMode);
    } else {
      setMode((prevMode) => (prevMode === 1 ? 3 : prevMode === 3 ? 2 : prevMode === 2 ? 0 : 1));
    }
  };

  return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>;
};
