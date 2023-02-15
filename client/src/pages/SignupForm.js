import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

function SignupForm(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [classValue, setClassValue] = useState("");
	const [password, setPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleClassChange = (event) => {
		setClassValue(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission here
		console.log({ name, email, classValue, password });
	};

	const handleDismiss = () => {
		// Handle form dismissal here
		props.onDismiss();
	};

	return (
		<Modal show={true} onHide={handleDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={handleNameChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicClass">
						<Form.Label>Class</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter class"
							value={classValue}
							onChange={handleClassChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Sign Up
					</Button>
					<Button variant="primary" onClick={handleDismiss} className="ms-2">
						Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default SignupForm;
