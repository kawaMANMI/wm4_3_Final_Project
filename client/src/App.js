import { Route, Routes } from "react-router-dom";


import About from "./pages/About";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";

const App = () => (

	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/mentor" element={<Mentor />} />
	</Routes>
);

export default App;
