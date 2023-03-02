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
import Login from "./pages/Login";
const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const handleDarkModeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};
	const loginColors = isDarkMode
		? {
				backgroundColor: "#333",
				color: "#fff",
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: {
				backgroundColor: "#fff",
				color: "#333",
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  };
	return (
		<div style={loginColors}>
			<Header isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />
			<Routes>
				<Route path="/" element={<Home isDarkMode={isDarkMode} />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/mentor" element={<Mentor />} />
				<Route path="/user-profile" element={<Profile />} />
				<Route path="/student" element={<Student />} />
				<Route path="skills" element={<LearningObjective />} />
				<Route path="/login" element={<Login />} />
			</Routes>
			<Footer isDarkMode={isDarkMode} />
		</div>
	);
};

export default App;
