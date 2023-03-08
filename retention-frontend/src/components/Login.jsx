import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Container } from "react-bootstrap";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
function Login() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <Row>
          <Col>
            <LeftSide />
          </Col>
          <Col>
            <RightSide />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
