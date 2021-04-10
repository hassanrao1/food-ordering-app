import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import { Button, Card, Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import url from "../../url";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "80vh",
    maxWidth: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    marginTop: "10px",
  },
  inputs: {
    marginTop: "13px",
  },
});

const Signup = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  // const url = "http://localhost:5000";
  // const url = "https://food-mania.herokuapp.com";

  const history = useHistory();
  let name = useRef();
  let email = useRef();
  let password = useRef();
  console.log(email, name, password);
  //   let validation = useRef();
  //   console.log(validation.current);

  let [validateEmail, setValidateEmail] = useState("");
  const signup = () => {
    // console.log(name, email, password);

    axios({
      method: "post",
      url: url + "/auth/signup",
      data: {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      },
    }).then(
      (response) => {
        console.log("response", response);
        console.log("response doc", response.data.doc);
        setMessage(response.data.message);
        // alert(response.data.message);
        if (response.data.status === 200) {
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      },
      (error) => {
        alert("error", error);
        // setMessage(error);
        console.log("error data", error.response);
      }
    );
    return false;
  };
  useEffect(() => {
    console.log(validateEmail);

    axios({
      method: "post",
      url: `${url}/auth/validateEmail`,
      data: {
        email: validateEmail,
      },
    }).then((res) => {
      console.log("validation", res.data.isFound);
      console.log("validation", res.data.data);
      if (res.data.data === null) {
        setValidateMessage("");
      } else if (res.data.data) {
        setValidateMessage("email already registered");
      }
    });
  }, [validateEmail]);

  return (
    <div>
      <Card className={classes.root}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <Typography variant="h4" align="center">
            <AccountCircleIcon color="secondary" fontSize="large" />
          </Typography>
          <Typography variant="h4" align="center">
            {"Sign Up"}
          </Typography>
          <TextField
            id="standard-basic"
            label="Username"
            inputRef={name}
            className={classes.inputs}
            required
            margin="normal"
            style={{ width: 400 }}
            color="secondary"
          />{" "}
          <br />
          <TextField
            id="full-width-text-field"
            type="email"
            label="Enter email"
            inputRef={email}
            required
            className={classes.inputs}
            style={{ width: 400 }}
            color="secondary"
            onChange={(e) => setValidateEmail(e.target.value)}
          />
          <br />
          <Typography className="text-muted" className="float-right">
            {validateMessage}
          </Typography>
          <br />
          <TextField
            id="filled-password-input"
            type="password"
            label="password"
            inputRef={password}
            required
            color="secondary"
            style={{ width: 400 }}
            fullWidth
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleClick}
            fullWidth
            className={classes.inputs}
          >
            Register{" "}
          </Button>
        </form>
      </Card>
      {message && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
        >
          <Alert severity="success" variant="filled">
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Signup;
