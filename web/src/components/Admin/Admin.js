import { Table, Button, Card, Accordion, NavItem } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import url from "../../url";

const Admin = () => {
  const [checkStatus, setCheckStatus] = useState(false);
  // const url = "https://food-mania.herokuapp.com";
  // const url = "http://localhost:5000";
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
  }, [checkStatus]);
  const acceptOrder = (id) => {
    console.log(id);
    axios({
      method: "patch",
      url: `${url}/acceptOrder`,
      data: {
        id: id,
      },
    }).then((res) => {
      console.log(res);
      setCheckStatus(true);
    });
  };
  const declineOrder = (id) => {
    console.log(id);
    axios({
      method: "patch",
      url: `${url}/declineOrder`,
      data: {
        id: id,
      },
    }).then((res) => {
      console.log(res);
      alert(res.data.message);
      setCheckStatus(true);
    });
  };

  // console.log(mapOrders);
  console.log(globalState.allOrders);
  const pendingOrders = globalState.allOrders.filter((getStatus) => {
    return getStatus.status === "pending";
  });

  console.log(pendingOrders);
  return (
    <div>
      <h1>welcome to Dashboard</h1>
      {pendingOrders.length > 0 ? (
        <div className="d-flex flex-column-reverse">
          {pendingOrders.map(
            (
              {
                orderDetails,
                orderTotal,
                address,
                email,
                phone,
                remarks,
                name,
                _id,
                status,
              },
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
                          <Table striped bordered hover size="sm">
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
                            <h4>User Details</h4>
                            <tfoot>
                              <tr>
                                <th>Total Amount</th>
                                <td colSpan="3">{orderTotal}</td>
                              </tr>
                              <tr>
                                <th>Status</th>
                                <td colSpan="3">{status}</td>
                              </tr>
                              <tr>
                                <th>Name</th>
                                <td colSpan="3">{name}</td>
                              </tr>
                              <tr>
                                <th>Email</th>
                                <td colSpan="3">{email}</td>
                              </tr>
                              <tr>
                                <th>Address</th>
                                <td colSpan="3">{address}</td>
                              </tr>
                              <tr>
                                <th>Phone Number</th>
                                <td colSpan="3">{phone}</td>
                              </tr>
                              <tr>
                                <th>Remarks</th>
                                <td colSpan="3">{remarks}</td>
                              </tr>
                            </tfoot>
                          </Table>

                          <Button
                            className="float-right"
                            onClick={() => acceptOrder(_id)}
                            variant="danger"
                          >
                            Decline
                          </Button>
                          <Button
                            className="float-right"
                            onClick={() => declineOrder(_id)}
                            variant="success"
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              );
            }
          )}
        </div>
      ) : (
        "No Orders"
      )}
    </div>
  );
};

export default Admin;
