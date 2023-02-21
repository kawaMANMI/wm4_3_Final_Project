import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Mentor from "./pages/Mentor";
import Student from "./pages/Student";
import UserProfile from "./pages/UserProfile";

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
			<Route path="/mentor" element={<Mentor />} />
<<<<<<< HEAD
			<Route path="/student" element={<Student />} />
			<Route path="/user-profile" element={<UserProfile />} />
=======
			<Route
				path="/student"
				element={<Student userId={sessionStorage.getItem("userId")} />}
			/>
>>>>>>> dev
		</Routes>
		<Footer />
	</div>
);

export default App;
