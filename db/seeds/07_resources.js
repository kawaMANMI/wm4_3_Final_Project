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
	]);
};
