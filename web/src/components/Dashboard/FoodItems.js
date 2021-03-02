import React, { useState } from "react";
import "./Dashboard.css";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const FoodItems = ({
  name,
  amount,
  image,
  quantity,
  id,
  actualPrice,
  halfKg,
  totalAmount,
  inCart,
}) => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [addedToCard, setAddedToCart] = useState(false);
  const [cartText, setCartText] = useState("Add to cart");
  const AddToCart = () => {
    const items = {
      name: name,
      amount: amount,
      quantity: quantity,
      id: id,
      actualPrice: actualPrice,
      halfKg: halfKg,
      inCart: !inCart,
    };

    setAddedToCart(true);
    setCartText("Added to your cart");
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [...globalState.cart, items],
      totalAmount: totalAmount,
    }));
  };
  console.log(globalState.cart);

  return (
    <div className="foodCard">
      <img src={image} alt="food" height="150px" width="150px" />
      <h2>{name}</h2>
      <p>{actualPrice}rs</p>

      <button disabled={addedToCard} onClick={AddToCart}>
        {cartText}
      </button>
    </div>
  );
};

export default FoodItems;
