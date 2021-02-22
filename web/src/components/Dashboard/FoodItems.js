import React from "react";
import "./Dashboard.css";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const FoodItems = ({ name, amount, image }) => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const AddToCart = () => {
    const items = { name: name, amount: amount };
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [...globalState.cart, items],
    }));
  };
  console.log(globalState.cart.length);
  // const AddToCart = (e) => {
  //   setGlobalState((prevState) => ({ ...prevState }));
  //   console.log(e);
  // };
  return (
    <div className="foodCard">
      <img src={image} alt="food" height="150px" width="150px" />
      <h2>{name}</h2>
      <p>{amount}</p>
      <button onClick={AddToCart}>Add to cart</button>
    </div>
  );
};

export default FoodItems;
