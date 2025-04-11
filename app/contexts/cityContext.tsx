import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHistory } from '../../store/db'; // додай імпорт

interface CityContextType {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    const loadLastCity = async () => {
      const history = await getHistory();
      if (history.length > 0) {
        setCity(history[0].city);
      } else {
        setCity('Kyiv');
      }
    };

    loadLastCity();
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {city ? children : null}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
