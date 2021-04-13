import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import url from "../../url";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FacebookIcon from "@material-ui/icons/Facebook";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Snackbar,
  TextField,
  Link,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import GoogleLogin from "react-google-login";

axios.defaults.withCredentials = true;

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
    flexDirection: "column",
  },
  inputs: {
    marginTop: "13px",
  },
  socialLogin: {
    backgroundColor: "#E62E55",
    width: 400,
    borderRadius: "5px",
    textDecoration: "none",
    color: "white",
    marginTop: "10px",
    padding: "6px",
    textAlign: "center",
  },
});

const Login = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const history = useHistory();
  const globalState = useGlobalState();
  const setGlobalState = useSetGlobalState();

  // console.log(globalState);

  let email = useRef();
  console.log(email);
  let password = useRef();
  //   let validation = useRef();
  //   console.log(validation.current);

  let [validateEmail, setValidateEmail] = useState("");
  const login = () => {
    // console.log(name, email, password);

    axios({
      method: "post",
      url: url + "/auth/login",
      data: {
        email: email.current.value,
        password: password.current.value,
      },
    }).then(
      (response) => {
        console.log("response", response);
        // console.log("role", response.data.user.role);
        setMessage(response.data.message);

        if (response.data.status === 200) {
          setTimeout(() => {
            history.push("/dashboard");
            setGlobalState((prevState) => ({
              ...prevState,
              // user: response.data.user,
              isLoggedIn: !prevState.isLoggedIn,
              role: response.data.user.role,
            }));
          }, 3000);
        }
      },
      (error) => {
        alert("error", error);
        console.log("error data", JSON.stringify(error.message));
      }
    );
  };
  useEffect(() => {
    console.log(validateEmail);

    axios({
      method: "post",
      url: `${url}/auth/validateEmail`,
      data: {
        email: validateEmail,
      },
    })
      .then((res) => {
        console.log("validation", res.data.isFound);
        console.log("validation", res.data.data);
        if (res.data.data === null) {
          setValidateMessage("email not found");
        } else if (res.data.data) {
          setValidateMessage("");
        }
      })
      .catch((err) => err);
  }, [validateEmail]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/profile`,
    })
      .then((res) => {
        console.log("=====================pro response", res.data.userData);
        if (res.data.status === 200) {
          setGlobalState((prevState) => ({
            ...prevState,
            user: res.data.userData,
            isLoggedIn: true,
            role: res.data.userData.role,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          // setData((prevState) => ({ ...prevState, isLoggedIn: false }));
        }
      });
    console.log("111", globalState);
  }, []);

  // const loginWithGoogle = () => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:5000/auth/google/callback",
  //   }).then(res=>{
  //     console.log();
  //   });
  // };
  // const responseSuccessGoogle = (response) => {
  //   console.log(response);
  //   axios({
  //     method: "post",
  //     url: `${url}/auth/googleLogin`,
  //     data: {
  //       tokenId: response.tokenId,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       alert(res.data.message);
  //       window.location.reload();
  //       if (response.data.status === 200) {
  //         history.push("/");
  //         setGlobalState((prevState) => ({
  //           ...prevState,
  //           // user: response.data.user,
  //           isLoggedIn: !prevState.isLoggedIn,
  //           role: response.data.user.role,
  //         }));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const responseErrorGoogle = (response) => {
  //   console.log(response);
  // };

  console.log(globalState);
  return (
    <div>
      <Card className={classes.root}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <Typography variant="h4" align="center">
            <VpnKeyIcon color="secondary" fontSize="large" />
          </Typography>
          <Typography variant="h4" align="center">
            {"Login"}
          </Typography>

          <br />
          <TextField
            id="standard-basic"
            type="email"
            label="Enter email"
            inputRef={email}
            required
            className={classes.inputs}
            color="secondary"
            onChange={(e) => setValidateEmail(e.target.value)}
            style={{ width: 400 }}
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
            className={classes.inputs}
            style={{ width: 400 }}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleClick}
            fullWidth
            className={classes.inputs}
            style={{ marginTop: "30px" }}
          >
            LOGIN{" "}
          </Button>
        </form>
        <Link
          className={classes.socialLogin}
          href="https://food-mania.herokuapp.com/auth/google"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Typography variant="button" align="right">
            <LockOpenIcon style={{ marginRight: 15 }} />
            Login With Google
          </Typography>
        </Link>
        <Link
          className={classes.socialLogin}
          href="https://food-mania.herokuapp.com/auth/facebook"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Typography variant="button" align="right">
            <FacebookIcon style={{ marginRight: 15 }} />
            Login With Facebook
          </Typography>
        </Link>
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

export default Login;

{
  /* <GoogleLogin
  clientId="99799831451-ol8cnqaglnvpopgg5k3m2p3vne53ig7k.apps.googleusercontent.com"
  buttonText="Login With Google"
  onSuccess={responseSuccessGoogle}
  onFailure={responseErrorGoogle}
  cookiePolicy={"single_host_origin"} */
}
{
  /* /> */
}
{
  /* 
<br />
<a href="http://localhost:5000/auth/facebook">
  Login With facebook
</a>
<button onClick={loginWithGoogle}>Login with google</button> */
}
