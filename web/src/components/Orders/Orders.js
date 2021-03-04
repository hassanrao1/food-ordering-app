import axios from "axios";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const Orders = () => {
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/myorders`,
    })
      .then((res) => {
        console.log(res.data.userOrders);
        setGlobalState((prevState) => ({
          ...prevState,
          userOrders: res.data.userOrders,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(globalState);
  // this.setState({ :  });
  return (
    <div>
      <h1>Your orders</h1>
      <div className="d-flex flex-column-reverse">
        {globalState.userOrders.map(
          ({ orderDetails, orderTotal, remarks, address, phone }, index) => {
            console.log(remarks, orderTotal);
            return (
              <div key={index}>
                <div>
                  <h3>Order#{index}</h3>
                </div>
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.name}</td>
                            <td>{v.quantity}</td>
                            <td>{v.amount}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan="2"></td>
                      </tr>
                    </tbody>

                    <tfoot>
                      <tr>
                        <th colSpan="2">Total Amount</th>
                        <td>{orderTotal}</td>
                      </tr>
                      <tr>
                        <th colSpan="2">Remarks</th>
                        <td>{remarks}</td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Orders;
