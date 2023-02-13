import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import bcrypt from "bcryptjs-react";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();


		// send the username and password to the server
		try {
       const hashPassword=(bcrypt.hashSync(password,10));
       alert(hashPassword);
			const response = await axios.post("/api/login", { username, hashPassword });
      //  alert(response);

			// handle the response from the server
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<Button type="submit">Login</Button>
		</form>
	);
}

export default Login;
