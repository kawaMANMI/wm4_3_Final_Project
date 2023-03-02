/* eslint-disable no-mixed-spaces-and-tabs */
import "./Home.css";
import HomePage from "./HomePage";

export function Home({ myClassDarkMode }) {
	return (
		<main role="main" className={myClassDarkMode}>
			<HomePage />
		</main>
	);
}

export default Home;
