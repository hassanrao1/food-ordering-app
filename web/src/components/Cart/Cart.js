import React, { useRef, useState } from "react";

import { Table, Button, Card, Form } from "react-bootstrap";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import axios from "axios";

const Cart = () => {
  let address = useRef();
  let phone = useRef();
  let remarks = useRef();
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
        total: globalState.totalAmount,
        address: address.current.value,
        phone: phone.current.value,
        remarks: remarks.current.value,
      },
    })
      .then((res) => {
        alert(res.data.message);
        console.log(res.data.message);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));

    console.log(address.current.value);
    console.log(phone.current.value);
    console.log(remarks.current.value);
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
  const delItem = (e, a) => {
    console.log("running", e);
    let totalAmount = globalState.cart.reduce((previousValue, currentValue) => {
      return {
        amount: previousValue.amount + currentValue.amount,
      };
    });

    let del = globalState.cart.filter((item) => {
      return item.id !== e;
    });
    let delValue = totalAmount.amount - a;
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
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {globalState.cart.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.actualPrice}</td>
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

                <td>{v.amount}rs</td>
                <td>
                  <button onClick={() => delItem(v.id, v.amount)}>
                    Delete
                  </button>
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

            <Card.Text as="h6">
              Total Amount: {globalState.totalAmount}rs
              <Form
                className="pt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  placeOrder();
                }}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    ref={address}
                    placeholder="Your Address"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    ref={phone}
                    placeholder="Your Phone Number"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    ref={remarks}
                    rows={3}
                    placeholder="Remarks Or any additional Note"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Place Order
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
