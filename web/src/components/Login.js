import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

const Login = () => {
  const url = "http://localhost:5000";

  const history = useHistory();

  let email = useRef();
  console.log(email);
  let password = useRef();
  //   let validation = useRef();
  //   console.log(validation.current);

  let [validateEmail, setValidateEmail] = useState("");
  const signup = () => {
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
        console.log("response doc", response.data.doc);
        alert(response.data.message);
        history.push("/");
      },
      (error) => {
        alert("error", error);
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
        document.getElementById("validate").innerText = "email not found";
        email.current.style.border = "1px solid red";
      } else if (res.data.data) {
        email.current.style.border = "1px solid green";
        document.getElementById("validate").innerText = "";
      }
    });
  }, [validateEmail]);

  return (
    <div>
      <h1>Login</h1>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          signup();
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
