/* eslint-disable no-mixed-spaces-and-tabs */
import "./Home.css";
import HomePage from "./HomePage";

export function Home({ isDarkMode }) {
	const homeStyle = isDarkMode
		? {
				backgroundColor: "#333",
				color: "#fff",
		  }
		: {
				backgroundColor: "#fff",
				color: "#333",
		  };
	return (
		<main role="main" className={`appClass ${homeStyle}`}>
			<HomePage />
		</main>
	);
}

export default Home;
