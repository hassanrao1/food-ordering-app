import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalState = createContext();
const GlobalStateUpdate = createContext();

export const useGlobalState = () => useContext(GlobalState);
export const useSetGlobalState = () => useContext(GlobalStateUpdate);

export const GlobalStateProvider = ({ children }) => {
  const url = "http://localhost:5000";

  const [data, setData] = useState({
    user: null,
    darkTheme: true,
    isLoggedIn: false,
    cart: [],
    inCart: false,
    totalAmount: 0,
    role: null,
    allOrders: [],
  });
  console.log("data", data);

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/profile`,
    })
      .then((res) => {
        console.log("context response", res.data.userData);
        if (res.data.status === 200) {
          setData((prevState) => ({
            ...prevState,
            user: res.data.userData,
            isLoggedIn: true,
            role: res.data.userData.role,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setData((prevState) => ({ ...prevState, isLoggedIn: false }));
        }
      });
    return () => {
      console.log("cleanup");
    };
  }, []);
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
