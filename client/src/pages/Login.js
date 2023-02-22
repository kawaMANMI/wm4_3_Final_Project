import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import SignupForm from "./SignupForm";
import ForgetPasswordFrom from "./ForgetPassword";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { BiKey } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./loginSignUp.css";

export function Login() {
	const navigate = useNavigate();
	function handleLogin(userInfo) {
		sessionStorage.setItem("userId", userInfo.id);
		sessionStorage.setItem("name", userInfo.name);
		sessionStorage.setItem("userRole", userInfo.role);
		if (userInfo.role === "Mentor") {
			navigate("/mentor");
		} else {
			navigate("/student");
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

	const toggleForgetPasswordFrom = () => {
		setForgetPasswordFrom(!showForgetPasswordFrom);
	};
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
				});
			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
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
			<Button
				onClick={toggleForgetPasswordFrom}
				className="btn btn-light d-block"
			>
				<BiKey className="Forget-icon" />
				<span className="forget-text">Forget Password</span>
			</Button>
			{showSignupForm ? (
				<SignupForm onDismiss={handleSignupFormDismiss} />
			) : null}

			{showForgetPasswordFrom ? (
				<ForgetPasswordFrom onDismiss={handleForgetPasswordFormDismiss} />
			) : null}
		</form>
	);
}

export default Login;
