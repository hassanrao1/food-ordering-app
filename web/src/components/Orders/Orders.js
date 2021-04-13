import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  HashRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import url from "../../url";

const Orders = () => {
  const [isOrder, setOrder] = useState(false);

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

  return (
    <div className="p-4">
      <h1 className="text-center">Your orders</h1>
      <div className="d-flex flex-column-reverse">
        {globalState &&
        globalState.userOrders &&
        globalState.userOrders.length ? (
          globalState.userOrders.map(
            (
              { orderDetails, orderTotal, remarks, address, phone, orderCode },
              index
            ) => {
              console.log(remarks, orderTotal, orderCode);
              return (
                <div key={index}>
                  <div>
                    <h3>OrderCode:{orderCode}</h3>
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
                      </tbody>
                      <br />
                      <tfoot>
                        <tr>
                          <th>Total Amount</th>
                          <td colSpan="2">{orderTotal}</td>
                        </tr>
                        <tr>
                          <th>Remarks</th>
                          <td colSpan="2">{remarks}</td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <Grid
            container
            sm={12}
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Typography>You haven't orders yet</Typography>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="secondary"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Order Now
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Orders;
