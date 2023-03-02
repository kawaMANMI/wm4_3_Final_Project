import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import Student from "./pages/Student";
import Profile from "./pages/Profile";
import LearningObjective from "./pages/LearningObjective";
import "./App.css";
const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const handleDarkModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};
	const className = isDarkMode ? "dark" : null;

	const colorForIsDarkMode = {
		backgroundColor: "var(--dd-bg)",
		color: "var(--dd-text)",
	};
	return (
		<div id="app" className={className}>
			<Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/mentor" element={<Mentor />} />
				<Route
					path="/user-profile"
					element={
						<Profile
							isDarkMode={isDarkMode}
							colorForIsDarkMode={colorForIsDarkMode}
						/>
					}
				/>
				<Route path="/student" element={<Student />} />
				<Route path="skills" element={<LearningObjective />} />
			</Routes>
			<Footer isDarkMode={isDarkMode} />
		</div>
	);
};

export default App;
