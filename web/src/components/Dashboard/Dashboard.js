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
  const url = "http://localhost:5000";
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

  // const foodItems = [
  //   {
  //     foodName: "Burger",
  //     amount: 0,
  //     halfKg: 50,
  //     quantity: 0,
  //     image:
  //       "http://atlas-content-cdn.pixelsquid.com/stock-images/cheese-burger-q1yoznC-600.jpg",
  //     id: 1,
  //     actualPrice: 100,
  //     lessThanZero: false,
  //     inCart: false,
  //   },
  //   {
  //     foodName: "Pizza",
  //     amount: 0,
  //     halfKg: 250,
  //     quantity: 0,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDxzv1WHUiA6oCQOSW_g0sYmdmZe9IkXCRJg&usqp=CAU",
  //     id: 2,
  //     actualPrice: 500,
  //     lessThanZero: false,
  //     inCart: false,
  //   },
  //   {
  //     foodName: "Cake",
  //     amount: 0,
  //     halfKg: 150,
  //     quantity: 0,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44dScBskcm8eU1utfl9tgoKp7edAQSABm2Q&usqp=CAU",
  //     id: 3,
  //     actualPrice: 300,
  //     lessThanZero: false,
  //     inCart: false,
  //   },
  //   {
  //     foodName: "Biryani",
  //     amount: 0,
  //     halfKg: 60,
  //     quantity: 0,
  //     image:
  //       "https://www.kindpng.com/picc/m/30-302489_chicken-biryani-png-transparent-png.png",
  //     id: 4,
  //     actualPrice: 120,
  //     lessThanZero: false,
  //     inCart: false,
  //   },
  // ];
  let totalAmount = globalState.products.reduce(
    (previousValue, currentValue) => {
      return {
        amount: previousValue.amount + currentValue.amount,
      };
    },
    0
  );
  console.log(globalState.products);

  console.log(globalState);
  return (
    <div>
      {globalState.user && <h1>Welcome {globalState.user.name} </h1>}

      <div className="foodContainer">
        {globalState.products.map((food, i) => {
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
