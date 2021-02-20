import React, { useEffect } from "react";
import { useGlobalState } from "../globalState/GlobalState";
import axios from "axios";

const Dashboard = () => {
  const globalState = useGlobalState();
  //   const url = "http://localhost:5000";
  //   const url = "https://food-mania.herokuapp.com";

  //   axios({
  //     method: "get",
  //     url: `${url}/dashboard`,
  //   })
  //     .then((res) => {
  //       console.log(res.userData);
  //     })
  //     .catch((err) => console.log(err));

  console.log(globalState);
  return (
    <div>
      <h1>Welcome {globalState.user.name}</h1>
    </div>
  );
};

export default Dashboard;
