import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Cyfsyllabus from "./pages/Cyfsyllabus";
import HomePage from "./pages/HomePage";
import Mentor from "./pages/Mentor";
import Student from "./pages/Student";
import Profile from "./pages/Profile";
import LearningObjective from "./pages/LearningObjective";
import "./App.css";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const handleDarkModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};
	const myClassDarkMode = isDarkMode ? "dark" : "light";
	const myClassDarkModeForNavbar = isDarkMode ? "dark-navbar" : "light-navbar";

	return (
		<div id="app" className={myClassDarkMode}>
			<Header
				isDarkMode={isDarkMode}
				onDarkModeToggle={handleDarkModeToggle}
				myClassDarkMode={myClassDarkMode}
				myClassDarkModeForNavbar={myClassDarkModeForNavbar}
			/>
			<Routes>
				<Route
					path="/"
					element={<HomePage myClassDarkMode={myClassDarkMode} />}
				/>
				<Route
					path="/about"
					element={<About myClassDarkMode={myClassDarkMode} />}
				/>
				<Route
					path="/cyfsyllabus"
					element={<Cyfsyllabus myClassDarkMode={myClassDarkMode} />}
				/>
				<Route
					path="/mentor"
					element={<Mentor myClassDarkMode={myClassDarkMode} />}
				/>
				<Route
					path="/user-profile"
					element={<Profile myClassDarkMode={myClassDarkMode} />}
				/>
				<Route path="/user-profile/:id" element={<Profile />} />
				<Route path="/student" element={<Student />} />
				<Route path="skills" element={<LearningObjective />} />
				<Route path="/landing-page" element={<LandingPage />} />
				<Route
					path="/login"
					element={
						<Login
							myClassDarkMode={myClassDarkMode}
							myClassDarkModeForNavbar={myClassDarkModeForNavbar}
						/>
					}
				/>
			</Routes>
			<Footer myClassDarkMode={myClassDarkMode} />
		</div>
	);
};

export default App;
