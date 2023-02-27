import "./Home.css";
import Login from "./Login";

export function Home({ isDarkMode}) {
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
			<Login isDarkMode={isDarkMode} />
		</main >
	);
}

export default Home;
