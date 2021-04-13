import { Table, Button, Card, Accordion, NavItem } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import url from "../../url";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Container, Grid } from "@material-ui/core";
import { useRef } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
  cont: {
    margin: "50px",
  },
}));

const RecentOrders = () => {
  const classes = useStyles();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const search = useRef(null);

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
  }, [filteredOrders]);

  const pendingOrders = globalState.allOrders.filter((getStatus) => {
    return getStatus.status === "accepted";
  });
  const handleSearch = () => {
    if (!search.current.value) return;

    const filterOrders = pendingOrders.filter((order) => {
      return order.email.toLowerCase().includes(search.current.value);
    });
    setFilteredOrders(filterOrders);

    console.log(filteredOrders);
  };

  return (
    <div className={classes.cont}>
      <Container>
        <Grid container className={classes.root} justify="space-between">
          <h1>Recent Orders</h1>
          <TextField
            required
            id="search"
            label="Search order by customer email"
            onChange={handleSearch}
            inputRef={search}
          />
        </Grid>
      </Container>

      <div className="d-flex flex-column-reverse">
        {filteredOrders.map(
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
              <Card>
                <div className="p-4">
                  <h4>Order Details</h4>
                  <div>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Item Name</th>
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
                  </div>
                </div>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
