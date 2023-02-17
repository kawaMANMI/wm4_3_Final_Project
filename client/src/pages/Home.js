import { useEffect, useState } from "react";
import {
	Routes,
	Route,
} from "react-router-dom";
import "./Home.css";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Student from "./Student";
import Mentor from "./Mentor";

export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [loginResponse, setLoginResponse] = useState("");

	const handleLogin = (response) => {
		setLoginResponse(response);
	};

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main role="main">
			<Header />
			<h1>{loginResponse}</h1>
			<Routes>
			{(loginResponse !== "Trainee" && loginResponse !== "Mentor")?		<Route path="/" element={<Login handleLogin={handleLogin} />} />:null};
			{loginResponse === "Trainee"	?		<Route path="/" element={<Student /> } />: null};
			{loginResponse === "Mentor"	?		<Route path="/" element={<Mentor /> } />: null};
			</Routes>
			<Footer />
		</main>
	);
}

export default Home;
