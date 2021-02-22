import React from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const Cart = () => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  return (
    <div>
      {globalState.cart.map((v, i) => {
        return (
          <table key={i} border="1" cellSpacing="1">
            <thead>
              <th>Items name</th>
              <th>Amount</th>
            </thead>
            <tbody>
              <td>{v.name}</td>
              <td>{v.amount}</td>
            </tbody>
          </table>
        );
      })}
    </div>
  );

  // return <h1>hello</h1>;
};

export default Cart;
