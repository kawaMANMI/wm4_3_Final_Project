import { React, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import "./Header.css"; // Import the Header.css file with the additional styles
import logo from "./logo_cyf.png";
import logo2 from "./logo_cyf2.png";

function Header({
	isDarkMode,
	onDarkModeToggle,
	myClassDarkMode,
	myClassDarkModeForNavbar,
}) {
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
		<div className={myClassDarkMode}>
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
						<NavLink to="/" className={`nav-link ${myClassDarkModeForNavbar}`}>
							Home
						</NavLink>
						<NavLink
							to="/about"
							className={`nav-link ${myClassDarkModeForNavbar}`}
						>
							About
						</NavLink>
						<NavLink
							to="/cyfSyllabus"
							className={`nav-link ${myClassDarkModeForNavbar}`}
						>
							CYF-Syllabus
						</NavLink>
						{loggedIn && name !== "" && name !== null ? (
							<NavLink
								to="/"
								onClick={handleLogout}
								className={`nav-link ${myClassDarkModeForNavbar}`}
							>
								Logout
							</NavLink>
						) : null}
						{loggedIn && name !== "" && name !== null ? (
							<NavLink
								to="/user-profile"
								className={`nav-link ${myClassDarkModeForNavbar}`}
							>
								{name}
							</NavLink>
						) : null}
					</Nav>
				</Navbar.Collapse>
				{isDarkMode ? (
					<FiMoon className="icon" onClick={onDarkModeToggle} size={18} />
				) : (
					<FiSun className="icon" onClick={onDarkModeToggle} size={18} />
				)}
				{/* <button className="mode-toggle-btn" onClick={onDarkModeToggle}>
					DarkMode
				</button> */}
			</Navbar>
			<div className="header_line"></div>
		</div>
	);
}

export default Header;
