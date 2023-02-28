/* eslint-disable no-mixed-spaces-and-tabs */
import "./Home.css";
import Login from "./Login";

export function Home({ colorForIsDarkMode }) {
	return (
		<main role="main" className={`appClass ${colorForIsDarkMode}`}>
			<h1>Login</h1>
			<Login colorForIsDarkMode={colorForIsDarkMode} />
		</main>
	);
}

export default Home;
