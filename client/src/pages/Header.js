import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css"; // Import the Header.css file with the additional styles
import logo from "./logo_cyf.png";

function Header() {
	const name = sessionStorage.getItem("name");
	const handleLogout = () => {
		// clear any session-related data or cookies
		history.push("/");
	};
	return (
		<div className="header-container">
			{" "}
			{/* Add a container div for the header */}
			<Navbar className="header-nav" expand="lg">
				{" "}
				{/* Add a class for the navbar */}
				<Navbar.Brand href="/">
					<img src={logo} alt="Your Logo" className="logo-img" />{" "}
					{/* Set the logo image as the source */}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/about">About</Nav.Link>
						<Nav.Link href="/Name">{name}</Nav.Link>
						<Nav.Link href="/contact">Contact</Nav.Link>
						{name !== "" || name !== null ? (
							<Nav.Link href="/" onClick={handleLogout}>
								Logout
							</Nav.Link>
						) : null}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<hr className="header-line" /> {/* Add a thick horizontal line */}
		</div>
	);
}

export default Header;
