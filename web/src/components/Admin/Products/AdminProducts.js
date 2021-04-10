import React, { useEffect, useState } from "react";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../../globalState/GlobalState";
import axios from "axios";
import { Avatar, Button, Container, Grid, Typography } from "@material-ui/core";
import url from "../../../url";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(4),
    },

    alignItems: "center",
    boxShadow: "-7px 10px 12px -10px rgba(0,0,0,0.75)",
    borderRadius: "10px",
  },
}));

const AdminProducts = () => {
  const classes = useStyles();
  const [del, setDel] = useState(false);

  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/Products`,
    })
      .then((res) => {
        console.log(res.data.products);
        setGlobalState((prevState) => ({
          ...prevState,
          products: res.data.products,
        }));
      })
      .catch((err) => console.log(err));
  }, [del]);
  const delProduct = (e) => {
    axios({
      method: "post",
      url: `${url}/delProduct`,
      data: {
        productId: e,
      },
    })
      .then((res) => {
        alert(res.data.message);
        setDel(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Typography
        variant="h1"
        align="center"
        style={{ margin: "20px", padding: "20px" }}
      >
        Products
      </Typography>
      <Grid container>
        {globalState.products.map((product) => {
          return (
            <Grid container sm={12} className={classes.root}>
              <Avatar
                style={{ height: "100px", width: "100px" }}
                alt={product.image}
                src={product.image}
              />
              <Typography variant="h4">{product.foodName}</Typography>
              <Typography variant="h4">{product.actualPrice}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => delProduct(product._id)}
              >
                Delete
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AdminProducts;
