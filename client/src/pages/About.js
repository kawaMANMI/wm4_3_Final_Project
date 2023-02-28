import "./Home.css";
const About = ({ colorForIsDarkMode }) => {
	return (
		<main role="main" className={`appClass ${colorForIsDarkMode}`}>
			<div style={colorForIsDarkMode}>
				<h1>About</h1>
				<p>
					Starter kit for full-stack JavaScript projects. For more information,
					see the wiki:
				</p>
				<a href="https://github.com/textbook/starter-kit/wiki">Wiki</a>
			</div>
		</main>
	);
};
export default About;
