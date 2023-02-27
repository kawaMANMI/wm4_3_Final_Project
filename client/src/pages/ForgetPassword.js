import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

function ForgetPassword(props) {
	const [email, setEmail] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};
	let responseData;
	const handleSubmit = async (event) => {
		event.preventDefault();
		// Handle form submission here
		// send the user, username, ... to the server
		try {
			await axios
				.post("/api/forgot-password", {
					email,
				})
				.then((response) => {
					responseData = response.data;
					alert(responseData);
				});
			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
	};
	const handleDismiss = () => {
		// Handle form dismissal here
		props.onDismiss();
	};
	return (
		<Modal show={true} onHide={handleDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>Forget Password</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
							required
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Send Email
					</Button>
					<Button variant="primary" onClick={handleDismiss} className="ms-2">
						Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default ForgetPassword;
