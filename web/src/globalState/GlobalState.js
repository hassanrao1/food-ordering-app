import React, { createContext, useContext, useState } from "react";

const GlobalState = createContext();
const GlobalStateUpdate = createContext();

export const useGlobalState = () => useContext(GlobalState);
export const useSetGlobalState = () => useContext(GlobalStateUpdate);

export const GlobalStateProvider = ({ children }) => {
  const [data, setData] = useState({
    user: null,
    darkTheme: true,
    isLoggedIn: false,
  });
  return (
    <div>
      <GlobalState.Provider value={data}>
        <GlobalStateUpdate.Provider value={setData}>
          {children}
        </GlobalStateUpdate.Provider>
      </GlobalState.Provider>
    </div>
  );
};
