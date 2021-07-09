import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import empty from "./empty.png";

const Empty = () => {
  return (
    <Container>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <div>
          <Typography variant="h2" color="secondary">
            No Orders
          </Typography>{" "}
        </div>
        <div>
          <img src={empty} alt="empty" height="400px" />
        </div>
      </Grid>
    </Container>
  );
};

export default Empty;
