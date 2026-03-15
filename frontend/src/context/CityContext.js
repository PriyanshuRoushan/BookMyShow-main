import { createContext, useContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        showCityModal,
        setShowCityModal
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

// ✅ ADD THIS
export const useCity = () => {
  return useContext(CityContext);
};
