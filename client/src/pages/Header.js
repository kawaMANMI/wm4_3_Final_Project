import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css"; // Import the Header.css file with the additional styles
import logo from "./logo_cyf.png";
function Header() {
  return (
    <div className="header-container"> {/* Add a container div for the header */}
      <Navbar className="header-nav" expand="lg"> {/* Add a class for the navbar */}
      <Navbar.Brand href="/">
          <img src={logo} alt="Your Logo" className="logo-img" /> {/* Set the logo image as the source */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr className="header-line" /> {/* Add a thick horizontal line */}
    </div>
  );
}

export default Header;
