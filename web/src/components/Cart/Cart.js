import React, { useRef, useState } from "react";

import { Table, Button, Card } from "react-bootstrap";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";
import e from "cors";

const Cart = () => {

  let address = useRef()
  let phone = useRef()
  let remarks = useRef()
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [enough, setEnough] = useState(false);
  const placeOrder = () => {
    axios({
      method: "post",
      url: `${url}/placeorder`,
      data: {
        order: globalState.cart,
        total:globalState.totalAmount

      },
    })
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data.data);
        console.log(res.data.data.orderDetails);
        console.log(res.data.data.orderTotal);
      })
      .catch((err) => console.log(err));
  };

  const removeItem = (e, i) => {
    globalState.cart.map((v, index, arr) => {
      if (v.name === arr[i].name) {
        let newValue = [...globalState.cart];
        newValue[i].quantity -= 1;
        newValue[i].amount = newValue[i].actualPrice * newValue[i].quantity;
        let totalAmount = newValue.reduce((previousValue, currentValue) => {
          return {
            amount: previousValue.amount + currentValue.amount,
          };
        });
        setGlobalState((prevValue) => ({
          ...prevValue,
          cart: newValue,
          totalAmount: totalAmount.amount,
        }));
        console.log("product price is=>", v);
        console.log("our product name", globalState.cart[i].name);
        console.log("new cart", globalState.cart);
        console.log("total amount", globalState.totalAmount);
        console.log("remove event", e);
      }
      console.log("new value", arr[i].quantity);
      if (arr[i].quantity <= 1) {
        arr[i].lessThanZero = true;
      }
    });
  };
  const addItem = (i) => {
    globalState.cart.map((v, index, arr) => {
      if (v.name === arr[i].name) {
        let newValue = [...globalState.cart];
        newValue[i].quantity += 1;
        newValue[i].amount = newValue[i].actualPrice * newValue[i].quantity;
        let totalAmount = newValue.reduce((previousValue, currentValue) => {
          return {
            amount: previousValue.amount + currentValue.amount,
          };
        });
        setGlobalState((prevValue) => ({
          ...prevValue,
          cart: newValue,
          totalAmount: totalAmount.amount,
        }));
      }
      if (arr[i].quantity >= 1) {
        arr[i].lessThanZero = false;
      }
    });
  };
  const delItem = (e,a) => {
    console.log("running", e);
    let totalAmount = globalState.cart.reduce((previousValue, currentValue) => {
      return {
        amount: previousValue.amount + currentValue.amount,
      };
    });

    let del = globalState.cart.filter((item) => {
      return item.id !== e;
    });
    let delValue = totalAmount.amount -a
    setGlobalState((prevState) => ({
      ...prevState,
      cart: del,
      totalAmount: delValue,
    }));
    console.log(globalState.cart);
  };

  return (
    <div>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {globalState.cart.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.name}</td>
                <td>
                  <Button
                    variant="outline-info"
                    disabled={v.lessThanZero}
                    onClick={() => removeItem(v, i)}
                  >
                    -
                  </Button>{" "}
                  {v.quantity}{" "}
                  <Button variant="outline-info" onClick={() => addItem(i)}>
                    +
                  </Button>
                </td>
                <td>
                  <select id="weight">
                    <option value="KG">KG</option>
                    <option value="Half KG">HALF KG</option>
                  </select>
                </td>
                <td>{v.amount}rs</td>
                <td>
                  <button onClick={() => delItem(v.id,v.amount)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className="text-left">Order Details</Card.Title>

            <Card.Text>
              Total Amount:{" "} {globalState.totalAmount}rs
              <input ref={address} type='text'required placeholder="Your Address"/>
              <input ref={phone} type='text' required placeholder="Your Phone"/>
              <input ref={remarks} type='text' required placeholder="Your Remarks"/>
              <span className="text-right p-4 ">
               
              </span>
              <button onClick={placeOrder}>place order</button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      
    </div>
  );

};

export default Cart;
