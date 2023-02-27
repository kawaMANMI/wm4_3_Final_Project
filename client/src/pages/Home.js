import "./Home.css";
import Login from "./Login";

export function Home({ isDarkMode, onDarkModeToggle }) {
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
		<main role="main" className={`appClass ${homeStyle}`} >
			<h1>Login</h1>
			<Login isDarkMode={isDarkMode} onDarkModeToggle={onDarkModeToggle} />
		</main >
	);
}

export default Home;
