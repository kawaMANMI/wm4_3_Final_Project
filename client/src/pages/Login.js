import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import SignupForm from "./SignupForm";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Home.css";

export function Login({ handleLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showSignupForm, setShowSignupForm] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const toggleSignupForm = () => {
		setShowSignupForm(!showSignupForm);
	};

	const handleSignupFormDismiss = () => {
		setShowSignupForm(false);
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
				});
			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
		handleLogin(responseData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div className="form-group">
				<div className="input-group">
					<label htmlFor="password">Password:</label>
					<input
						type={isPasswordVisible ? "text" : "password"}
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<div className="input-group-append">
						<div
							className="input-group-text password-toggle-icon"
							onClick={togglePasswordVisibility}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									togglePasswordVisibility();
								}
							}}
							role="button"
							tabIndex={0}
						>
							{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
						</div>
					</div>
				</div>
			</div>
			<Button className="btn btn-light" type="submit">
				<FaUser className="login-icon" />
				<span className="login-text">Login</span>
			</Button>
			<Button onClick={toggleSignupForm} className="btn btn-light">
				<FaUserPlus className="signup-icon" />
				<span className="signup-text">Sign Up</span>
			</Button>
			{/* <a href="#" className="link-primary">Forgot password?</a> */}
			{showSignupForm ? (
				<SignupForm onDismiss={handleSignupFormDismiss} />
			) : null}
		</form>
	);
}

export default Login;
