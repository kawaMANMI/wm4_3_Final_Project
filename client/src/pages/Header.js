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
		<div className="header-container">
			<Navbar className="header-nav" expand="lg">
				<Navbar.Brand href="/">
					<img
						src={isDarkMode ? logo2 : logo}
						alt="Your Logo"
						className="logo-img"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						<NavLink to="/about" className="nav-link">
							About
						</NavLink>
						<NavLink to="/contact" className="nav-link">
							Contact
						</NavLink>
						{loggedIn && name !== "" && name !== null ? (
							<NavLink to="/" onClick={handleLogout} className="nav-link">
								Logout
							</NavLink>
						) : null}
						{loggedIn && name !== "" && name !== null ? (
							<NavLink to="/user-profile" className="nav-link">
								{name}
							</NavLink>
						) : null}
					</Nav>
				</Navbar.Collapse>
				<button className="mode-toggle-btn" onClick={onDarkModeToggle}></button>
			</Navbar>
			<div className="header_line"></div>
		</div>
	);
}

export default Header;
