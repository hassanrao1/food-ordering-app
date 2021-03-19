import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
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
  const [addedToCard, setAddedToCart] = useState(inCart);
  const [cartText, setCartText] = useState("Add to cart");
  let localCartStorage = [];
  const AddToCart = () => {
    const items = {
      name: name,
      amount: amount,
      quantity: quantity,
      id: id,
      actualPrice: actualPrice,
      halfKg: halfKg,
      inCart: inCart,
    };

    setAddedToCart(true);
    setCartText("Added to your cart");
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [...globalState.cart, items],
      totalAmount: totalAmount,
    }));
  };
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(globalState.cart));
  //   // let localCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   // console.log(localCart);
  // }, [globalState.cart]);

  return (
    <Card style={{ width: "18rem" }} className="foodCard text-center">
      <Card.Img variant="top" src={image} height="150px" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{actualPrice}rs</Card.Text>
        <Card.Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus et
          iste suscipit officiis tempora ad ea, voluptate totam labore
          laudantium ex eum quidem asperiores unde similique numquam eligendi
          maiores dolorum.
        </Card.Text>
        <Button variant="primary" disabled={addedToCard} onClick={AddToCart}>
          {cartText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodItems;
