import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import Student from "./pages/Student";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/mentor" element={<Mentor />} />
		<Route path="/student" element={<Student />} />
	</Routes>
);

export default App;
