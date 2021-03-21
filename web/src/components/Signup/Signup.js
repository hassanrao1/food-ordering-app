import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

const Signup = () => {
  // const url = "http://localhost:5000";
  const url = "https://food-mania.herokuapp.com";

  const history = useHistory();
  let name = useRef();
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
        alert(response.data.message);
        if (response.data.status === 200) {
          history.push("/login");
        }
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
        document.getElementById("validate").innerText = "";
        email.current.style.border = "1px solid green";
      } else if (res.data.data) {
        email.current.style.border = "1px solid red";
        document.getElementById("validate").innerText =
          "email already registered";
      }
    });
  }, [validateEmail]);

  return (
    <div className="text-center">
      <Card style={{ width: "20rem", margin: "0 auto" }} className="p-4 mt-4">
        <h1>Sign Up</h1>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signup();
            }}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Normal text"
                ref={name}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
                required
                onChange={(e) => setValidateEmail(e.target.value)}
              />
              <Form.Text
                className="text-muted"
                id="validate"
                className="float-right"
              ></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={password}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
