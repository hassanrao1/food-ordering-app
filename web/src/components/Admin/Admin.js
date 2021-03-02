import { Table, Button, Card, Accordion } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";

const Admin = () => {
  const url = "http://localhost:5000";
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/orders`,
    })
      .then((res) => {
        console.log("order details", res);
        setGlobalState((prevState) => ({
          ...prevState,
          allOrders: res.data.orders,
          // totalAmount:res.data.orderTotal
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(mapOrders);
  console.log(globalState.allOrders);
  return (
    <div>
      <h1>welcome to admin panel</h1>

      {globalState.allOrders.map(
        (
          { orderDetails, orderTotal, address, email, phone, remarks, name },
          index
        ) => {
          return (
            <Accordion key={index}>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{ color: "red", cursor: "pointer" }}
                >
                  New Order
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="p-4">
                    <h4>Order Details</h4>
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Actual Price</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails.map((value, index) => {
                            return (
                              <tr key={index}>
                                <td>{value.name}</td>
                                <td>{value.quantity}</td>
                                <td>{value.actualPrice}</td>
                                <td>{value.amount}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan="3">Total Amount</th>
                            <td>{orderTotal}</td>
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                    <h4>User Details</h4>
                    <div className="p-3">
                      <strong>Name : </strong>
                      <span>{name}</span>
                      <br />
                      <strong>Email : </strong>
                      <span>{email}</span>
                      <br />
                      <strong>Address : </strong>
                      <span>{address}</span>
                      <br />
                      <strong>Phone Number : </strong>
                      <span>{phone}</span>
                      <br />
                      <strong>Remarks : </strong>
                      <span>{remarks}</span>
                      <br />
                    </div>
                  </div>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          );
        }
      )}
    </div>
  );
};

export default Admin;
