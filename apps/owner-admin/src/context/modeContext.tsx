import React, { useState } from 'react';

interface ModeContextProps {
  children: React.ReactNode;
}

const ModeContext = React.createContext({});

const ModeProvider: React.FC<ModeContextProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ModeContext.Provider>
  );
};

function useMode() {
  const context = React.useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}

export { ModeProvider, useMode };
