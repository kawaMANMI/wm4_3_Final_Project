/* eslint-disable no-mixed-spaces-and-tabs */
import { React, useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer({ myClassDarkMode }) {
	const [subEmail, setSubEmail] = useState("");
	const handleSubEmailChange = (event) => {
		setSubEmail(event.target.value);
	};
	let msg;
	const handleSubscribe = async (event) => {
		event.preventDefault();
		try {
			// const res = await axios.post("/api/subscribe", { subEmail });
			// if(res.status === 200){
			// 	alert(res.data);
			// 	console.log(subEmail);
			// }
			await axios.post("/api/subscribe", { subEmail }).then((response) => {
				msg = response.data;
				setSubEmail(" ");
				alert(msg);
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<footer className={`footer ${myClassDarkMode}`}>
			<div className="header_line"></div>
			<Container>
				<div className="d-flex justify-content-center align-items-center">
					<div className={`social-icons ${myClassDarkMode}`}>
						<a href="https://www.facebook.com/codeyourfuture.io/?locale=en_GB">
							<FaFacebook className={myClassDarkMode} />
						</a>
						<a href="https://twitter.com/CodeYourFuture">
							<FaTwitter className={myClassDarkMode} />
						</a>
						<a href="https://www.instagram.com/codeyourfuture_/">
							<FaInstagram className={myClassDarkMode} />
						</a>
						<a href="https://www.linkedin.com/company/codeyourfuture/">
							<FaLinkedin className={myClassDarkMode} />
						</a>
					</div>
				</div>
			</Container>
			<div className="footer-subscribe">
				<Container>
					<Form
						onSubmit={handleSubscribe}
						className="d-flex justify-content-center align-items-center mb-3"
					>
						<Form.Group
							controlId="formBasicEmail"
							style={{
								width: "300px",
								marginRight: "10px",
							}}
						>
							<Form.Control
								type="text"
								placeholder="Enter email"
								value={subEmail}
								onChange={handleSubEmailChange}
							/>
						</Form.Group>
						<Button
							type="submit"
							variant="danger"
							className={`${myClassDarkMode}`}
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
