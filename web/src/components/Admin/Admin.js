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
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  let mapOrders = globalState.allOrders.map((v, i) => {
    // v.orderDetails.map((e, a) => {
    //   // console.log(e);
    //   return e

    // });
    return v.orderDetails
  });

  console.log(mapOrders);
  console.log(globalState.allOrders);
  return (
    <div>
      <h1>welcome to admin panel</h1>
      {mapOrders.map((q,v)=>{
        return(
<Accordion>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            style={{ color: "red", cursor: "pointer" }}
          >
            New Order
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log(mapOrders)} */}
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Card>
      </Accordion>
        )
      })}
      
    </div>
  );
};

export default Admin;
