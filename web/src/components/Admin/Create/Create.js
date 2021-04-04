import React, { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import url from "../../../url";

const Create = () => {
  // const url = "http://localhost:5000";
  // const url = "https://food-mania.herokuapp.com";

  let productName = useRef();
  let productAmount = useRef();
  const upload = () => {
    let prodImg = document.getElementById("prodImg");
    console.log("fileInp", prodImg);
    console.log("fileInp", prodImg.files[0]);

    let formData = new FormData();

    formData.append("myFile", prodImg.files[0]);
    formData.append("productName", productName.current.value);
    formData.append("productAmount", productAmount.current.value);

    axios({
      method: "post",
      url: url + "/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(res.data.message);
        console.log("upload success", res.data);
        productName.current.value = "";
        productAmount.current.value = "";
        document.getElementById("prodImg").value = "";
        // setGlobalState((prevState)=>({...prevState,products:}))
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center flex-column  align-items-center ">
      <h1>Add product</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          upload();
        }}
      >
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            ref={productName}
            placeholder="Product Name"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Amount</Form.Label>
          <Form.Control
            type="text"
            ref={productAmount}
            placeholder="Product Amount"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.File id="prodImg" label="Upload Image" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Create;
