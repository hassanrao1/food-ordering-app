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
  const addItem = (e,i) => {
    // setItemQuantity(itemQuantity + 1);
    globalState.cart.map((v,index,arr)=>{
    if(v.name===arr[i].name)
    {
      var newValue = [...globalState.cart];
      newValue[i].quantity+=1;
      newValue[i].amount=newValue[i].actualPrice*newValue[i].quantity;
      console.log("product price is=>",v);
      console.log("our product name",globalState.cart[i].name)
      // setGlobalState((prevValue)=>({...prevValue,cart:[...globalState.cart[i].quantity,globalState.cart[i].quantity+1]}));
      setGlobalState((prevValue)=>({...prevValue , newValue})) 
      console.log("new cart",globalState.cart);
    }
    })

    
    
    // console.log(e);
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
                  {v.quantity}{" "}
                  <Button variant="outline-info" onClick={() => addItem(v.id,i)}>
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
