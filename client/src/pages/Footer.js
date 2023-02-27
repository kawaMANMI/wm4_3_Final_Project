import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer({ isDarkMode }) {
	const footerStyle = isDarkMode
		? {
				backgroundColor: "#333",
				color: "#fff",
				boxShadow: "0 2px 4px rgba(255, 255, 255, 0.4)",
		  }
		: {
				backgroundColor: "rgb(235, 235, 235)",
				color: "#2f2f2f",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
		  };
	const socialIconsStyle = isDarkMode ? { color: "#fff" } : { color: "#333" };
	const subscribeButtonStyle = isDarkMode
		? {
				backgroundColor: "#fff",
				color: "#333",
		  }
		: {
				backgroundColor: "#2f2f2f",
				color: "#fff",
		  };

	return (
		<footer className="footer" style={footerStyle}>
			<Container>
				<div className="d-flex justify-content-center align-items-center">
					<div className="social-icons" style={socialIconsStyle}>
						<a
							style={socialIconsStyle}
							href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB"
						>
							<FaFacebook />
						</a>
						<a
							style={socialIconsStyle}
							href="https://twitter.com/CodeYourFuture"
						>
							<FaTwitter />
						</a>
						<a
							style={socialIconsStyle}
							href="https://twitter.com/CodeYourFuture"
						>
							<FaInstagram />
						</a>
						<a
							style={socialIconsStyle}
							href="https://www.linkedin.com/company/codeyourfuture/"
						>
							<FaLinkedin />
						</a>
					</div>
				</div>
			</Container>
			<div className="footer-subscribe">
				<Container>
					<Form className="d-flex justify-content-center align-items-center">
						<Form.Group controlId="formBasicEmail" className="mb-0">
							<Form.Control
								type="email"
								placeholder="Enter email"
								style={isDarkMode ? { backgroundColor: "#444" } : {}}
							/>
						</Form.Group>
						<Button
							type="submit"
							className="subscribe-button ml-2"
							style={subscribeButtonStyle}
						>
							Subscribe
						</Button>
					</Form>
				</Container>
			</div>
			<Container>
				<p>
					&copy; 2023 &lt;<span className="code">CODE</span>&gt; YOUR FUTURE.
					All Rights Reserved.
				</p>
			</Container>
		</footer>
	);
}

export default Footer;
