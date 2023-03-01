import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

function SignupForm({ onDismiss, colorForIsDarkMode }) {
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
			<Modal.Header style={colorForIsDarkMode} closeButton>
				<Modal.Title style={colorForIsDarkMode}>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body style={colorForIsDarkMode}>
				<Form onSubmit={handleSubmit} style={colorForIsDarkMode}>
					<Form.Group
						style={colorForIsDarkMode}
						className="mb-3"
						controlId="formBasicName"
					>
						<Form.Label style={colorForIsDarkMode}>Username</Form.Label>
						<Form.Control
							style={colorForIsDarkMode}
							type="text"
							placeholder="Enter Name"
							value={username}
							onChange={handleUserNameChange}
							required
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicName"
					>
						<Form.Label style={colorForIsDarkMode}>Name</Form.Label>
						<Form.Control
							style={colorForIsDarkMode}
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={handleNameChange}
							required
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicEmail"
					>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
							style={colorForIsDarkMode}
							required
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicRole"
					>
						<Form.Label style={colorForIsDarkMode}>Role</Form.Label>
						<Form.Select
							style={colorForIsDarkMode}
							value={roleValue}
							onChange={handleRoleChange}
							required
						>
							<option value="">Select role</option>
							<option value="Mentor">Mentor</option>
							<option value="Student">Student</option>
						</Form.Select>
					</Form.Group>

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicRegion"
					>
						<Form.Label style={colorForIsDarkMode}>Region</Form.Label>
						<Form.Select
							style={colorForIsDarkMode}
							value={regionValue}
							onChange={(event) =>
								handleRegionChange({
									value: event.target.value,
									index: event.target.selectedIndex,
								})
							}
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

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicClasses"
					>
						<Form.Label style={colorForIsDarkMode}>Class</Form.Label>
						<Form.Select
							style={colorForIsDarkMode}
							value={classValue}
							onChange={handleClassChange}
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
					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicPassword"
					>
						<Form.Label style={colorForIsDarkMode}>Password</Form.Label>
						<Form.Control
							style={colorForIsDarkMode}
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</Form.Group>

					<Form.Group
						className="mb-3"
						style={colorForIsDarkMode}
						controlId="formBasicPassword"
					>
						<Form.Label style={colorForIsDarkMode}>Confirm Password</Form.Label>
						<Form.Control
							style={colorForIsDarkMode}
							type="password"
							placeholder="Password"
							value={confirmPassword}
							onChange={handleConfirmPassword}
						/>
						{confirmPasswordError && (
							<Form.Text className="text-danger" style={colorForIsDarkMode}>
								{confirmPasswordError}
							</Form.Text>
						)}
					</Form.Group>

					<Button
						style={colorForIsDarkMode}
						type="submit"
						disabled={confirmPassword !== password}
						className="ms-2 btn-light"
					>
						Sign Up
					</Button>
					<Button
						style={colorForIsDarkMode}
						onClick={handleDismiss}
						className="ms-2 btn-light"
					>
						Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default SignupForm;
