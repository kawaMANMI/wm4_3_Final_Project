/* eslint-disable no-mixed-spaces-and-tabs */
import "./Home.css";

import Login from "./Login";

export function Home({ myClassDarkMode }) {
	return (
		<main role="main" className="background-image">
			<h1>Login</h1>
			<Login myClassDarkMode={myClassDarkMode} />
		</main>
	);
}

export default Home;
