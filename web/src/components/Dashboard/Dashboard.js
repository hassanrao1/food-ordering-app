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
      amount: 100,
      quantity: 1,
      image:
        "http://atlas-content-cdn.pixelsquid.com/stock-images/cheese-burger-q1yoznC-600.jpg",
    },
    {
      foodName: "Pizza",
      amount: 500,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxzv1WHUiA6oCQOSW_g0sYmdmZe9IkXCRJg&usqp=CAU",
    },
    {
      foodName: "Cake",
      amount: 300,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44dScBskcm8eU1utfl9tgoKp7edAQSABm2Q&usqp=CAU",
    },
    {
      foodName: "Biryani",
      amount: 120,
      quantity: 1,
      image:
        "https://www.kindpng.com/picc/m/30-302489_chicken-biryani-png-transparent-png.png",
    },
  ];
  console.log(globalState);
  return (
    <div>
      {globalState.user && <h1>Welcome {globalState.user.name} </h1>}

      <div className="foodContainer">
        {foodItems.map((food, i) => {
          return (
            <FoodItems
              name={food.foodName}
              amount={food.amount}
              quantity={food.quantity}
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
