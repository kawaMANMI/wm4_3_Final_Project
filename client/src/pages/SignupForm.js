import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./signup.css";
function SignupForm({ onDismiss, myClassDarkMode }) {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [roleValue, setRoleValue] = useState("");
	const [regionValue, setRegionValue] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [regions, setRegions] = useState([]);
	const [classes, setClasses] = useState([]);
	const [allClasses, setAllClasses] = useState([]);
	const [classValue, setClassValue] = useState("");
	const [regionId, setRegionId] = useState(0);

	useEffect(() => {
		async function fetchRegionsAndClasses() {
			try {
				const response = await axios.get("/api/regions-and-classes");
				setRegions(response.data.regions);
				setAllClasses(response.data.classes);
			} catch (error) {
				console.error("Error fetching regions and classes:", error);
			}
		}

		fetchRegionsAndClasses();
	}, []);

	const handleUserNameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleRoleChange = (event) => {
		setRoleValue(event.target.value);
	};

	const handleRegionChange = ({ value, index }) => {
		setRegionValue(value);
		setClasses(allClasses[index - 1][index]);
		setRegionId(index);
	};

	const handleClassChange = (event) => {
		setClassValue(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPassword = (event) => {
		const value = event.target.value;
		setConfirmPassword(value);

		if (value !== password) {
			setConfirmPasswordError("Passwords do not match");
		} else {
			setConfirmPasswordError("");
		}
	};

	let responseData;
	const handleSubmit = async (event) => {
		event.preventDefault();
		// Handle form submission here
		// send the user, username, ... to the server
		try {
			await axios
				.post("/api/signup", {
					name,
					email,
					roleValue,
					password,
					regionId,
					classValue,
					username,
				})
				.then((response) => {
					responseData = response.data;
					alert(responseData);
					if (responseData.includes("successfully")) {
						onDismiss();
					}
					// handleDismiss()
				});
			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
	};
	const handleDismiss = () => {
		// Handle form dismissal here
		onDismiss();
	};
	return (
		<Modal show={true} onHide={handleDismiss}>
			<Modal.Header closeButton className={myClassDarkMode}>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body className={myClassDarkMode}>
				<Form onSubmit={handleSubmit} variant="danger">
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Name"
							value={username.toLowerCase()}
							onChange={handleUserNameChange}
							className={myClassDarkMode}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={handleNameChange}
							className={myClassDarkMode}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
							className={myClassDarkMode}
							required
						/>
					</Form.Group>

					<Form.Group
						className={`mb-3 ${myClassDarkMode}`}
						controlId="formBasicRole"
					>
						<Form.Label>Role</Form.Label>
						<Form.Select
							value={roleValue}
							onChange={handleRoleChange}
							className={myClassDarkMode}
							required
						>
							<option className={myClassDarkMode} value="">
								Select role
							</option>
							<option value="Mentor">Mentor</option>
							<option value="Student">Student</option>
						</Form.Select>
					</Form.Group>

					<Form.Group
						className={`mb-3 ${myClassDarkMode}`}
						controlId="formBasicRegion"
					>
						<Form.Label>Region</Form.Label>
						<Form.Select
							value={regionValue}
							onChange={(event) =>
								handleRegionChange({
									value: event.target.value,
									index: event.target.selectedIndex,
								})
							}
							className={myClassDarkMode}
							required
						>
							<option value="">Select region</option>
							{regions.map((region, index) => (
								<option value={region} key={index}>
									{region}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicClasses">
						<Form.Label>Class</Form.Label>
						<Form.Select
							value={classValue}
							onChange={handleClassChange}
							className={myClassDarkMode}
							required
						>
							<option value="">Select Cohort</option>
							{classes.map((cohort, index) => (
								<option value={cohort} key={index}>
									{cohort}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							className={myClassDarkMode}
							onChange={handlePasswordChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={confirmPassword}
							className={myClassDarkMode}
							onChange={handleConfirmPassword}
						/>
						{confirmPasswordError && (
							<Form.Text className="text-danger">
								{confirmPasswordError}
							</Form.Text>
						)}
					</Form.Group>

					<Button
						type="submit"
						disabled={confirmPassword !== password}
						variant="danger"
						className="ms-2"
					>
						Sign Up
					</Button>
					<Button onClick={handleDismiss} variant="danger" className="ms-2">
						Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default SignupForm;
