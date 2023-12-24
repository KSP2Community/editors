import React, { createContext, useState, useContext } from 'react';
import {missionDefaults} from './data/defaults.js'

const MissionContext = createContext(null);

export function useMission() {
  return useContext(MissionContext);
}

export function MissionProvider({ children }) {
  const [missionData, setMissionData] = useState(missionDefaults);

  const updateMissionData = (key, value) => {
    setMissionData(prevData => ({ ...prevData, [key]: value }));
  };

  const value = {
    missionData,
    updateMissionData
  };

  return (
    <MissionContext.Provider value={value}>
      {children}
    </MissionContext.Provider>
  );
}