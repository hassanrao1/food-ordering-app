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
  const foodItems = [
    {
      foodName: "Burger",
      amount: "100rs",
      image:
        "http://atlas-content-cdn.pixelsquid.com/stock-images/cheese-burger-q1yoznC-600.jpg",
    },
    {
      foodName: "Pizza",
      amount: "500rs",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxzv1WHUiA6oCQOSW_g0sYmdmZe9IkXCRJg&usqp=CAU",
    },
    {
      foodName: "Cake",
      amount: "300rs",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44dScBskcm8eU1utfl9tgoKp7edAQSABm2Q&usqp=CAU",
    },
    {
      foodName: "Biryani",
      amount: "120rs",
      image:
        "https://www.kindpng.com/picc/m/30-302489_chicken-biryani-png-transparent-png.png",
    },
  ];
  console.log(globalState);
  return (
    <div>
      <h1>Welcome {globalState.user.name}</h1>
      {globalState.cart.map((v, i) => {
        return (
          <table key={i} border="1" cellSpacing="1">
            <thead>
              <th>Items name</th>
              <th>Amount</th>
            </thead>
            <tbody>
              <td>{v.name}</td>
              <td>{v.amount}</td>
            </tbody>
          </table>
        );
      })}
      <div className="foodContainer">
        {foodItems.map((food, i) => {
          return (
            <FoodItems
              name={food.foodName}
              amount={food.amount}
              image={food.image}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
