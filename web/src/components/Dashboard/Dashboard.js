import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";
import "./Dashboard.css";
import FoodItems from "./FoodItems";

const Dashboard = () => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  // const url = "http://localhost:5000";
  const url = "https://food-mania.herokuapp.com";

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/Products`,
    })
      .then((res) => {
        console.log(res.data.products);
        setGlobalState((prevState) => ({
          ...prevState,
          products: res.data.products,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // localStorage.setItem("products", JSON.stringify(globalState.products));
  // let localProducts = JSON.parse(localStorage.getItem("products")) || [];
  // console.log(localProducts);

  let totalAmount = globalState.products.reduce(
    (previousValue, currentValue) => {
      return {
        amount: previousValue.amount + currentValue.amount,
      };
    },
    0
  );
  // console.log(globalState.products);

  console.log(globalState);
  return (
    <div>
      {globalState.user && (
        <h1 className="text-center">Welcome {globalState.user.name} </h1>
      )}

      <div className="foodContainer">
        {globalState.products.map((food, i) => {
          // {localProducts.map((food, i) => {
          return (
            <FoodItems
              actualPrice={food.actualPrice}
              name={food.foodName}
              amount={food.amount}
              quantity={food.quantity}
              image={food.image}
              id={food._id}
              halfKg={food.halfKg}
              key={i}
              inCart={food.inCart}
              totalAmount={totalAmount.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
