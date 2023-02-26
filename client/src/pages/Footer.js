import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">

			<Container>
				<div className="d-flex justify-content-center align-items-center">
					<div className="social-icons">
						<a href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB">
							<FaFacebook />
						</a>
						<a href="https://twitter.com/CodeYourFuture">
							<FaTwitter />
						</a>
						<a href="https://twitter.com/CodeYourFuture">
							<FaInstagram />
						</a>
						<a href="https://www.linkedin.com/company/codeyourfuture/">
							<FaLinkedin />
						</a>
					</div>
				</div>
			</Container>
			<div className="footer-subscribe">
				<Container>
					<Form className="d-flex justify-content-center align-items-center">
						<Form.Group controlId="formBasicEmail" className="mb-0">
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Button type="submit" className="subscribe-button ml-2">
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
