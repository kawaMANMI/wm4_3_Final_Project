import React from "react";
import { Container } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<Container>
				<div className="d-flex justify-content-center align-items-center">
					<div className="social-icons">
						<a href="https://www.linkedin.com/in/kawa-manmi-5244ab53/">
							<FaFacebook />
						</a>
						<a href="https://www.linkedin.com/in/kawa-manmi-5244ab53/">
							<FaTwitter />
						</a>
						<a href="https://www.linkedin.com/in/kawa-manmi-5244ab53/">
							<FaInstagram />
						</a>
						<a href="https://www.linkedin.com/in/kawa-manmi-5244ab53/">
							<FaLinkedin />
						</a>
					</div>
				</div>
			</Container>
			<div className="footer-bottom">
				<Container>
					<p>
						&copy; 2023 &lt;<span className="code">CODE</span>&gt; YOUR FUTURE.
						All Rights Reserved.
					</p>
				</Container>
			</div>
		</footer>
	);
}

export default Footer;
