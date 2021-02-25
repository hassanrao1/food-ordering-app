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
      amount: 0,
      halfKg: 50,
      quantity: 0,
      image:
        "http://atlas-content-cdn.pixelsquid.com/stock-images/cheese-burger-q1yoznC-600.jpg",
      id: 1,
      actualPrice: 100,
      lessThanZero: false,
    },
    {
      foodName: "Pizza",
      amount: 0,
      halfKg: 250,
      quantity: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxzv1WHUiA6oCQOSW_g0sYmdmZe9IkXCRJg&usqp=CAU",
      id: 2,
      actualPrice: 500,
      lessThanZero: false,
    },
    {
      foodName: "Cake",
      amount: 0,
      halfKg: 150,
      quantity: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44dScBskcm8eU1utfl9tgoKp7edAQSABm2Q&usqp=CAU",
      id: 3,
      actualPrice: 300,
      lessThanZero: false,
    },
    {
      foodName: "Biryani",
      amount: 0,
      halfKg: 60,
      quantity: 0,
      image:
        "https://www.kindpng.com/picc/m/30-302489_chicken-biryani-png-transparent-png.png",
      id: 4,
      actualPrice: 120,
      lessThanZero: false,
    },
  ];
  let totalAmount = foodItems.reduce((previousValue, currentValue) => {
    return {
      amount: previousValue.amount + currentValue.amount,
    };
  });
  console.log(globalState);
  return (
    <div>
      {globalState.user && <h1>Welcome {globalState.user.name} </h1>}

      <div className="foodContainer">
        {foodItems.map((food, i) => {
          return (
            <FoodItems
              actualPrice={food.actualPrice}
              name={food.foodName}
              amount={food.amount}
              quantity={food.quantity}
              image={food.image}
              id={food.id}
              halfKg={food.halfKg}
              key={i}
              totalAmount={totalAmount.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
