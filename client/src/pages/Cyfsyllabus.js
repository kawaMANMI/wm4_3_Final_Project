import React from "react";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";

const CYFSyllabusPage = ({ myClassDarkMode }) => {
	const modules = [
		{
			title: "Intro To Digital",
			description:
				"This module provides an introduction to digital technology and coding. It covers fundamental concepts like how computers work, what programming languages are",
			link: "https://introtocoding.codeyourfuture.io/",
			learningOutcomes: [
				"Learn the basics of computer hardware and software",
				"Understand the principles of algorithms and programming",
				"Learn how to create basic programs using HTML, CSS, and JavaScript",
			],
		},
		{
			title: "Fundamental",
			description:
				"This module covers foundational concepts in computer science such as algorithms, data structures, and object-oriented programming. Students will learn to build and debug basic programs  and gain an understanding of software development principles like test-driven development and agile methodologies.",
			link: "https://syllabus.codeyourfuture.io/fundamentals",
			learningOutcomes: [
				"Understand programming fundamentals such as data types, variables, and functions",
				"Learn how to use control structures such as loops and conditional statements",
				"Learn how to write and use arrays and objects",
			],
		},
		{
			title: "Induction",
			description:
				"This module provides an introduction to version control using Git and the basics of command-line interface (CLI). Students will learn to use Git to manage code repositories and collaborate with other developers.",
			link: "https://personal-development.codeyourfuture.io/em-modules/induction-git-week",
			learningOutcomes: [
				"Learn how to use Git version control system",
				"Understand the basics of software development workflows and agile methodologies",
				"Learn how to work collaboratively in a team using Git and GitHub",
			],
		},
		{
			title: "Git and Github",
			description:
				"his module provides a comprehensive introduction to version control using Git and GitHub. It covers topics like creating and managing repositories, branching and merging code, resolving conflicts, and collaborating with other developers. Students will also learn about the basics of web development and how to deploy code to a website using GitHub Pages.",
			link: "https://syllabus.codeyourfuture.io/git/overview",
			learningOutcomes: [
				"Understand the Git version control system and its benefits",
				"Learn how to use Git commands such as clone, push, pull, and merge",
				"Understand the basics of GitHub and how to collaborate on open-source projects",
			],
		},
		{
			title: "HTML-CSS",
			description:
				"This module covers the fundamentals of web development using HTML and CSS. Students will learn how to create static web pages, add links, images, and video, and apply styling using CSS. The module also covers responsive design principles and introduces students to web development frameworks like Bootstrap.",
			link: "https://syllabus.codeyourfuture.io/html-css/",
			learningOutcomes: [
				"Learn how to create and style HTML pages using CSS",
				"Understand the principles of responsive design and accessibility",
				"Learn how to use CSS frameworks such as Bootstrap and Materialize",
			],
		},
		{
			title: "Java Script Core 1",
			description:
				"This module covers the basics of JavaScript, including data types, variables, control structures, and functions. Students will learn to write JavaScript programs that manipulate the DOM and respond to user events. The module also covers debugging and testing techniques using Chrome DevTools.",
			link: "https://syllabus.codeyourfuture.io/js-core-1/",
			learningOutcomes: [
				"Understand the basics of JavaScript and how it works",
				"Learn how to use variables, data types, and operators in JavaScript",
				"Learn how to write and use functions in JavaScript",
			],
		},
		{
			title: "Java Script Core 2",
			description:
				"This module covers advanced topics in JavaScript, including object-oriented programming, closures, and asynchronous programming. Students will learn to use JavaScript libraries and frameworks like jQuery and React to build complex web applications. The module also covers techniques for optimizing code performance and improving the user experience.",
			link: "https://syllabus.codeyourfuture.io/js-core-2/",
			learningOutcomes: [
				"Learn advanced JavaScript concepts such as objects, arrays, and prototypes",
				"Understand how to use control structures such as loops and conditional statements in JavaScript",
				"Learn how to use DOM manipulation to create interactive web pages",
			],
		},
		{
			title: "Java Script Core 3",
			description:
				"This module covers advanced concepts in JavaScript, including functional programming, design patterns, and browser APIs. Students will learn to use APIs like the Fetch API and WebSockets to build dynamic web applications.",
			link: "https://syllabus.codeyourfuture.io/js-core-3/",
			learningOutcomes: [
				"Learn advanced JavaScript topics such as closures, higher-order functions, and asynchronous programming",
				"Understand how to use APIs to fetch data from external sources",
				"Learn how to use modern JavaScript tools such as Webpack and Babel",
			],
		},
		{
			title: "React",
			description:
				"Learn the fundamentals of React and build reusable UI components.",
			link: "https://syllabus.codeyourfuture.io/react/",
			learningOutcomes: [
				"Understand the component-based architecture of React",
				"Build reusable UI components using React and manage their state and props",
				"Use React Router to create a multi-page application with client-side routing",
				"Learn how to use React with Redux to manage application state and make asynchronous requests",
			],
		},
		{
			title: "Node",
			description:
				"Learn how to build server-side applications using Node.js and Express.js.",
			link: "https://syllabus.codeyourfuture.io/node/",
			learningOutcomes: [
				"Understand the basics of Node.js and its event-driven, non-blocking I/O model",
				"Build server-side applications using Node.js and Express.js",
				"Create RESTful APIs using Node.js and Express.js",
				"Work with databases using Node.js and the Sequelize ORM",
			],
		},
		{
			title: "SQL",
			description:
				"Learn the basics of SQL and how to manipulate and analyze data.",
			link: "https://syllabus.codeyourfuture.io/db/",
			learningOutcomes: [
				"Understand the basics of SQL, including creating tables and querying data",
				"Use the SELECT statement to filter, sort, and group data",
				"Combine data from multiple tables using SQL joins",
				"Manipulate and analyze data using subqueries, views, and stored procedures",
			],
		},
		{
			title: "Final Project",
			description:
				"Apply your skills to build a full-stack web application and agile methodology",
			link: "https://syllabus.codeyourfuture.io/finalproject/intro",
			learningOutcomes: [
				"Apply the knowledge and skills gained from previous modules to build a full-stack web application",
				"Work collaboratively in a team to plan, design, and implement the project",
				"Use Agile methodologies such as Scrum and Kanban to manage the project and track progress",
				"Deploy the final project to a cloud platform such as Heroku",
			],
		},
	];

	return (
		<div className={`container mt-3 ${myClassDarkMode}`}>
			<div className="mt-5 mb-5">
				<p>
					This is the syllabus and course material for CodeYourFuture (CYF), a
					not-for-profit volunteer-run coding school for refugees, asylum
					seekers and disadvantaged groups.
				</p>
				<p>
					During the course you will learn a technology stack that helps you
					build anything from a simple website to a powerful database-driven web
					application.
				</p>
				The eight-month course contains:
			</div>
			<div className="row">
				{modules.map((module, index) => (
					<div key={index} className="col-md-4">
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<Card className={`mb-4 shadow-sm ${myClassDarkMode}`}>
								<Card.Body>
									<Card.Title tag="h5">
										{index + 1}. {module.title}
									</Card.Title>
									<Card.Text>
										{module.description.length > 70
											? `${module.description.slice(0, 70)}...`
											: module.description}
									</Card.Text>
									<Card.Text>
										<strong>Learning Outcome:</strong>{" "}
										{module.learningOutcomes.toString().length > 100
											? `${module.learningOutcomes.toString().slice(0, 100)}...`
											: module.learningOutcomes}
									</Card.Text>
									<a
										href={module.link}
										className="btn btn-danger"
										target="_blank"
										rel="noopener noreferrer"
									>
										Link Course
									</a>
								</Card.Body>
							</Card>
						</motion.div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CYFSyllabusPage;
