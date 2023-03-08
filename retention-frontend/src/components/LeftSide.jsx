import React, { useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
const LeftSide = () => {
  // const [users, setUsers] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState("");

  const login = () => {
    fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
        // console.log(data);
        // return response.text();
        // return response.text();
      })
      .then((data) => {
        if (data.length > 0) {
          setloginStatus("Success");
        } else {
          setloginStatus("Failure");
        }
      });
    // .then(data => {
    //   setUsers(data);
    // });
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);
  // function getUsers() {
  //   fetch('http://localhost:3005')
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       setUsers(data);
  //     });
  // }
  return (
    <Container>
      <div>
        <Image
          src="./assets/img/logo.png"
          thumbnail
          style={{ border: "none", height: "150px", margin: "20px" }}
        />
        <Image
          src="./assets/img/logotext.png"
          thumbnail
          style={{ border: "none", height: "50px" }}
        />
      </div>
      <br></br>
      {/* <Form> */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <br></br>
      <Button
        className="w-100"
        color="primary"
        size="lg"
        type="submit"
        block="true"
        onClick={login}
      >
        Submit
      </Button>
      <If condition={loginStatus === "Success"}>
        <Then>
        <Navigate to="/model" replace={true} />
        </Then>
        <ElseIf condition={loginStatus === "Failure"}>
        <br></br>
        <br></br>
        <Alert key="danger" variant="danger">
          Username or Password is incorrect!
        </Alert>
        </ElseIf>
        <Else>
        {loginStatus === ""}
        </Else>
      </If>
    </Container>
  );
};

export default LeftSide;
