/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("resources").del();
	await knex("resources").insert([
		{
			id: 1,
			title: "35+ HTML&CSS Resources for Beginners",
			url: "https://medium.com/level-up-web/30-html-css-resources-for-beginners-4e4d0af4b44b",
			reading_time: 7,
			skill_id: 1,
		},
		{
			id: 2,
			title: "Git and GitHub Tutorial - Version Control for Beginners",
			url: "https://www.freecodecamp.org/news/git-and-github-for-beginners/",
			reading_time: 15,
			skill_id: 2,
		},
		{
			id: 3,
			title: "JavaScript Basics",
			url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics",
			reading_time: 16,
			skill_id: 3,
		},
		{
			id: 4,
			title: "The React Handbook - Learn React for Beginners",
			url: "https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/",
			reading_time: 156,
			skill_id: 4,
		},

		{
			id: 5,
			title: "Code Your Future REACT material Week 1",
			url: "https://syllabus.codeyourfuture.io/react/week-1/lesson",
			reading_time: 13,
			skill_id: 4,
		},
		{
			id: 6,
			title: "How to Build NodeJS REST API with Express and PostgreSQL",
			url: "https://medium.com/bb-tutorials-and-thoughts/how-to-build-nodejs-rest-api-with-express-and-postgresql-674d96d5cb8f",
			reading_time: 11,
			skill_id: 6,
		},
		{
			id: 7,
			title: "JavaScript Crash Course for Beginners",
			url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
			reading_time: 100,
			skill_id: 3,
		},
		{
			id: 8,
			title: "Node.js Crash Course",
			url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
			reading_time: 90,
			skill_id: 5,
		},
		{
			id: 9,
			title: "An Intro to Git and GitHub for Beginners (Tutorial)",
			url: "https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners",
			reading_time: 16,
			skill_id: 2,
		},
		{
			id: 10,
			title: "JavaScript basics",
			url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics",
			reading_time: 16,
			skill_id: 3,
		},
		{
			id: 11,
			title: "Reading files with Node.js",
			url: "https://nodejs.dev/en/learn/reading-files-with-nodejs/",
			reading_time: 1,
			skill_id: 5,
		},
		{
			id: 12,
			title: "PostgreSQL Tutorial",
			url: "https://www.postgresqltutorial.com/",
			reading_time: 8,
			skill_id: 6,
		},
		{
			id: 13,
			title: "How to read a file with Node.js Tutorial",
			url: "https://www.youtube.com/watch?v=uvRwF1JFqt0",
			reading_time: 4,
			skill_id: 5,
		},
		{
			id: 14,
			title: "A Complete Guide for Reading Files in Node.js",
			url: "https://javascript.plainenglish.io/complete-guide-for-reading-file-in-nodejs-3cf6b3d0b2f4",
			reading_time: 3,
			skill_id: 5,
		},
		{
			id: 15,
			title: "What Exactly is Node.js? Explained for Beginners",
			url: "https://www.freecodecamp.org/news/what-is-node-js/",
			reading_time: 7,
			skill_id: 5,
		},
		{
			id: 16,
			title: "HTML, CSS, JavaScript Explained [in 4 minutes for beginners]",
			url: "https://www.youtube.com/watch?v=gT0Lh1eYk78",
			reading_time: 4,
			skill_id: 1,
		},
		{
			id: 17,
			title: "Tutorial: Intro to React",
			url: "https://reactjs.org/tutorial/tutorial.html",
			reading_time: 40,
			skill_id: 4,
		},
		{
			id: 18,
			title: "The Beginner's Guide to React",
			url: "https://egghead.io/courses/the-beginner-s-guide-to-react",
			reading_time: 155,
			skill_id: 4,
		},
		{
			id: 19,
			title: "Git Tutorial for Beginners: Command-Line Fundamentals",
			url: "https://www.youtube.com/watch?v=HVsySz-h9r4",
			reading_time: 30,
			skill_id: 2,
		},
		{
			id: 20,
			title: "About version control and Git",
			url: "https://docs.github.com/en/get-started/using-git/about-git",
			reading_time: 10,
			skill_id: 2,
		},
	]);
};
