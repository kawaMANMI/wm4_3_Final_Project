import { React, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css"; // Import the Header.css file with the additional styles
import logo from "./logo_cyf.png";
import logo2 from "./logo_cyf2.png";

function Header({ isDarkMode, onDarkModeToggle }) {
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/");
    setLoggedIn(true);
  };



  return (
    <div
      className="header-container"
      style={{
        backgroundColor: isDarkMode ? "#333" : "#EBEBEB",
        color: isDarkMode ? "#FFF" : "#000",
      }}
    >
      <Navbar className="header-nav" expand="lg">
        <Navbar.Brand href="/">
          <img src={isDarkMode ? logo2 : logo} alt="Your Logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              to="/"
              className="nav-link"
              style={{ color: isDarkMode ? "#FFF" : "#000" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link"
              style={{ color: isDarkMode ? "#FFF" : "#000" }}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link"
              style={{ color: isDarkMode ? "#FFF" : "#000" }}
            >
              Contact
            </NavLink>
            {loggedIn && name !== "" && name !== null ? (
              <NavLink
                to="/"
                onClick={handleLogout}
                className="nav-link"
                style={{ color: isDarkMode ? "#FFF" : "#000" }}
              >
                Logout
              </NavLink>
            ) : null}
            {loggedIn && name !== "" && name !== null ? (
              <NavLink
                to="/user-profile"
                className="nav-link"
                style={{ color: isDarkMode ? "#FFF" : "#000" }}
              >
                {name}
              </NavLink>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        <button
          className="mode-toggle-btn"
          onClick={onDarkModeToggle}
          style={{
            backgroundColor: isDarkMode ? "#FFF" : "#ED4343",
            color: isDarkMode ? "#000" : "#FFF",
          }}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </Navbar>
      <div
        className="header_line"
      // style={{
      //   backgroundColor: isDarkMode ? "#FFF" : "#ED4343",
      //   boxShadow: isDarkMode ? "none" : "0 2px 4px rgba(0, 0, 0, 0.4)",
      // }}
      >

      </div>

    </div>
  );
}

export default Header;