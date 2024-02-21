import { createContext, useState, useContext, useEffect } from 'react';
import missionDefaults from '/src/data/mission/mission-defaults.json'
import { openDB } from 'idb';

const MissionContext = createContext(null);

export function useMission() {
  return useContext(MissionContext);
}

export function MissionProvider({ children }) {
  const [missionData, setMissionData] = useState({ isDirty: false, data: missionDefaults });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const db = await openDB('myDatabase', 1, {
        upgrade(db) {
          db.createObjectStore('missions');
        },
      });

      const tx = db.transaction('missions', 'readonly');
      const store = tx.objectStore('missions');
      const localData = await store.get('missionData');
      setMissionData(localData ? localData : { isDirty: false, data: missionDefaults });
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        const db = await openDB('myDatabase', 1, {
          upgrade(db) {
            db.createObjectStore('missions');
          },
        });

        const tx = db.transaction('missions', 'readwrite');
        const store = tx.objectStore('missions');
        await store.put(missionData, 'missionData');
        await tx.done;
      })();
    }
  }, [missionData, isLoading]);

  const updateMissionData = (key, value) => {
    setMissionData(prevData => ({
      ...prevData,
      data: {
        ...prevData.data,
        [key]: value
      },
      isDirty: true
    }));
  };

  const value = {
    missionData,
    setMissionData,
    updateMissionData
  };

  return (
    <MissionContext.Provider value={value}>
      {children}
    </MissionContext.Provider>
  );
}