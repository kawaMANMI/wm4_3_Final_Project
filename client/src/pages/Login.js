/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import SignupForm from "./SignupForm";
import ForgetPasswordFrom from "./ForgetPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./login.css";

export function Login({ myClassDarkMode, myClassDarkModeForNavbar }) {
	const navigate = useNavigate();
	function handleLogin(userInfo) {
		if (userInfo.data) {
			return alert(userInfo.data);
		}
		sessionStorage.setItem("userId", userInfo.id);
		sessionStorage.setItem("name", userInfo.name);
		sessionStorage.setItem("userRole", userInfo.role);
		sessionStorage.setItem("userRegion", userInfo.region_id);
		if (userInfo.role === "Mentor") {
			navigate("/mentor");
		} else {
			// navigate("/student");
			navigate("/user-profile");
		}
	}
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showSignupForm, setShowSignupForm] = useState(false);
	const [showForgetPasswordFrom, setForgetPasswordFrom] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const toggleSignupForm = () => {
		setShowSignupForm(!showSignupForm);
	};

	// const toggleForgetPasswordFrom = () => {
	// 	setForgetPasswordFrom(!showForgetPasswordFrom);
	// };
	const handleSignupFormDismiss = () => {
		setShowSignupForm(false);
	};

	const handleForgetPasswordFormDismiss = () => {
		setForgetPasswordFrom(false);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		let responseData = "";
		// send the username and password to the server
		try {
			// const hashPassword = bcrypt.hashSync(password, 10);
			await axios
				.post("/api/login", {
					username,
					password,
				})
				.then((response) => {
					responseData = response.data;
					handleLogin(responseData);
				})
				.catch((error) => {
					return alert(error.response.data.error);
				});
			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
	};

	const tooltip = (
		<Tooltip id="tooltip">Password reset is not activated yet.</Tooltip>
	);

	return (
		<div className="d-flex justify-content-center align-items-center bodyLoginComponent">
			<Form
				className="p-4"
				onSubmit={handleSubmit}
				style={{
					boxShadow: "3px 5px 8px #888888",
					borderRadius: "10PX",
				}}
			>
				<div style={{ padding: "30px" }}>
					<h2 className="text-center mb-4">Login</h2>
					<Form.Group className={myClassDarkMode}>
						<Form.Label htmlFor="username">Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Username"
							value={username}
							id="username"
							onChange={(event) => setUsername(event.target.value)}
							className={myClassDarkMode}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="password">Password</Form.Label>
						<div className="input-group">
							<Form.Control
								type={isPasswordVisible ? "text" : "password"}
								id="password"
								placeholder="**********"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className={myClassDarkMode}
							/>
							<div
								className="input-group-text password-toggle-icon"
								style={{ backgroundColor: "#ed4343" }}
								onClick={togglePasswordVisibility}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										togglePasswordVisibility();
									}
								}}
								role="button"
								tabIndex={0}
							>
								{isPasswordVisible ? (
									<FaEyeSlash className={myClassDarkModeForNavbar} />
								) : (
									<FaEye className={myClassDarkModeForNavbar} />
								)}
							</div>
						</div>
						<OverlayTrigger placement="top" overlay={tooltip}>
							<Button
								variant="link"
								className={`myLoginLinks ${myClassDarkModeForNavbar}`}
							>
								Forgot password?
							</Button>
						</OverlayTrigger>
					</Form.Group>
					<Button
						style={{ marginTop: "10px" }}
						variant="danger"
						type="submit"
						className="w-100"
					>
						Login
					</Button>

					<div className="d-flex justify-content-center">
						<Button
							variant="link"
							className={`myLoginLinks ${myClassDarkModeForNavbar}`}
							onClick={toggleSignupForm}
						>
							Create an account
						</Button>
					</div>
					{showSignupForm ? (
						<SignupForm
							onDismiss={handleSignupFormDismiss}
							myClassDarkMode={myClassDarkMode}
						/>
					) : null}

					{showForgetPasswordFrom ? (
						<ForgetPasswordFrom onDismiss={handleForgetPasswordFormDismiss} />
					) : null}
				</div>
			</Form>
		</div>
	);
}

export default Login;
