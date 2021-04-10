import React, { useEffect, useState } from "react";
// import { Card, Button } from "react-bootstrap";
import "./Dashboard.css";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    margin: 10,
  },
}));

const FoodItems = ({
  name,
  amount,
  image,
  quantity,
  id,
  actualPrice,
  halfKg,
  totalAmount,
  inCart,
}) => {
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();
  const [addedToCard, setAddedToCart] = useState(inCart);
  const [cartText, setCartText] = useState("Add to cart");
  const classes = useStyles();

  let localCartStorage = [];
  const AddToCart = () => {
    const items = {
      name: name,
      amount: amount,
      quantity: quantity,
      id: id,
      actualPrice: actualPrice,
      halfKg: halfKg,
      inCart: inCart,
    };

    setAddedToCart(true);
    setCartText("Added to your cart");
    setGlobalState((prevState) => ({
      ...prevState,
      cart: [...globalState.cart, items],
      totalAmount: totalAmount,
    }));
  };
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(globalState.cart));
  //   // let localCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   // console.log(localCart);
  // }, [globalState.cart]);

  return (
    <Grid container sm={12} md={6} lg={3} alignItems="center" justify="center">
      <Card className={classes.root} className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle">{actualPrice}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Button
              variant="contained"
              disabled={addedToCard}
              color="secondary"
              onClick={AddToCart}
            >
              {cartText}
            </Button>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FoodItems;
