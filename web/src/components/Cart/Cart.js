import React, { useState } from "react";

import { Table, Button } from "react-bootstrap";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";
import e from "cors";

const Cart = () => {
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [enough, setEnough] = useState(false);
  const placeOrder = () => {
    axios({
      method: "post",
      url: `${url}/placeorder`,
      data: {
        order: globalState.cart,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data.yourOrder);
      })
      .catch((err) => console.log(err));
  };

  const removeItem = (e) => {
    // e.quantity - 1;
    // if (quantity <= 2) {
    //   setEnough(true);
    // }
    console.log(e);
  };
  const addItem = (e) => {
    setItemQuantity(++e.quantity);
    // if (quantity >= 2) {
    //   setEnough(false);
    // }
    // e.amount++;

    console.log(++e.quantity);
  };
  // let calcAmount = (e) => {
  //   console.log(e);
  // };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        {globalState.cart.map((v, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>{v.name}</td>
                <td>
                  <Button
                    variant="outline-info"
                    disabled={enough}
                    onClick={() => removeItem(v)}
                  >
                    -
                  </Button>{" "}
                  {itemQuantity}{" "}
                  <Button variant="outline-info" onClick={() => addItem(v)}>
                    +
                  </Button>
                </td>
                <td>{v.amount}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <button onClick={placeOrder}>place order</button>
    </div>
  );

  // return <h1>hello</h1>;
};

export default Cart;
