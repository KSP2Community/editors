import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [appData, setAppData] = useState({});

  const updateAppData = (key, value) => {
    setAppData(prevData => ({ ...prevData, [key]: value }));
  };

  const value = {
    appData,
    updateAppData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}