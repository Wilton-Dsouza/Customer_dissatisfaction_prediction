import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container,Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { If, Then} from 'react-if-elseif-else-render';

function ChurnNavbar() {

  const [logout, setlogout] = useState(false);

  const deflogout = () => {
    setlogout(true);
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" style={{backgroundColor:"#BCA7E8"}}>
      <Container>
      <Image
          src="./assets/img/logo.png"
          thumbnail
          style={{ border: "none", height: "50px", margin: "20px" }}
        />
        <Image
          src="./assets/img/logotext.png"
          thumbnail
          style={{ border: "none", height: "30px" }}
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav.Link>
            <Nav onClick={deflogout}><b>Logout</b></Nav>
          </Nav.Link>
          <If condition={logout === true}>
            <Then>
              <Navigate to="/" replace={true} />
            </Then>
          </If>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ChurnNavbar;
