import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import Student from "./pages/Student";
import Profile from "./pages/Profile";
import LearningObjective from "./pages/LearningObjective";

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
			<Route path="/mentor" element={<Mentor />} />
			<Route path="/user-profile" element={<Profile />} />
			<Route path="/student" element={<Student />} />
			<Route path="skills" element={<LearningObjective />} />
		</Routes>
		<Footer />
	</div>
);

export default App;
