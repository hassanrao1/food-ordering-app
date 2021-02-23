import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useGlobalState,
  useSetGlobalState,
} from "../../globalState/GlobalState";
axios.defaults.withCredentials = true;

const Login = () => {
  const url = "http://localhost:5000";
  // const url = "https://food-mania.herokuapp.com";

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
        alert(response.data.message);
        if (response.data.status === 200) {
          history.push("/dashboard");
          setGlobalState((prevState) => ({
            ...prevState,
            // user: response.data.user,
            isLoggedIn: !prevState.isLoggedIn,
          }));
        }
      },
      (error) => {
        alert("error", error);
        console.log("error data", error.response);
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
          document.getElementById("validate").innerText = "email not found";
          email.current.style.border = "1px solid red";
        } else if (res.data.data) {
          email.current.style.border = "1px solid green";
          document.getElementById("validate").innerText = "";
        }
      })
      .catch((err) => err);
  }, [validateEmail]);

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        Email
        <input
          type="email"
          ref={email}
          required
          onChange={(e) => setValidateEmail(e.target.value)}
        />
        <small id="validate"></small>
        <br />
        Password :
        <input type="password" ref={password} required />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
