/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("coursework").del();
  await knex("coursework").insert([
		{
			id: 1,
			coursework: "https://github.com/CodeYourFuture/HTML-CSS-Coursework-Week1",
			course_skill: 1,
		},
		{
			id: 2,
			coursework: "https://github.com/CodeYourFuture/HTML-CSS-Module-Project",
			course_skill: 1,
		},
		{
			id: 3,
			coursework: "https://scrimba.com/learn/cssgrid",
			course_skill: 1,
		},
		{
			id: 4,
			coursework:
				"https://github.com/CodeYourFuture/HTML-CSS-Challenges/tree/main/Form-Controls",
			course_skill: 1,
		},
		{
			id: 5,
			coursework: "https://github.com/CodeYourFuture/bikes-for-refugees",
			course_skill: 1,
		},
		{
			id: 6,
			coursework:
				"https://github.com/CodeYourFuture/HTML-CSS-Module-Project/tree/master/level-2",
			course_skill: 1,
		},
		{
			id: 7,
			coursework: "https://github.com/CodeYourFuture/HTML-CSS-Coursework-Week3",
			course_skill: 1,
		},
		{
			id: 8,
			coursework: "https://github.com/CodeYourFuture/HTML-CSS-Module-Project",
			course_skill: 1,
		},
		{
			id: 9,
			coursework: "https://github.com/CodeYourFuture/HTML-CSS-Coursework-Week4",
			course_skill: 1,
		},
		{
			id: 10,
			coursework: "https://record-a-goose.onrender.com/",
			course_skill: 1,
		},
		{
			id: 11,
			coursework: "https://github.com/CodeYourFuture/GitHomeworkTest",
			course_skill: 2,
		},
		{
			id: 11,
			coursework: "https://github.com/CodeYourFuture/My-CodePen-Website",
			course_skill: 2,
		},
		{
			id: 11,
			coursework: "https://github.com/CodeYourFuture/GitHomeworkFixErrors",
			course_skill: 2,
		},
		{
			id: 11,
			coursework: "https://www.youtube.com/watch?v=oK8EvVeVltE",
			course_skill: 2,
		},
		{
			id: 11,
			coursework:
				"https://openclassrooms.com/en/courses/4614926-learn-the-command-line-in-terminal?status=published",
			course_skill: 2,
		},
		{
			id: 11,
			coursework:
				"https://www.youtube.com/watch?v=BCQHnlnPusY&list=PLRqwX-V7Uu6ZF9C0YMKuns9sLDzK6zoiV",
			course_skill: 2,
		},
		{
			id: 11,
			coursework: "https://github.com/CodeYourFuture/Git-CLI-Coursework",
			course_skill: 2,
		},
		{
			id: 11,
			coursework: "https://git-school.github.io/visualizing-git/",
			course_skill: 2,
		},
		{
			id: 11,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week1",
			course_skill: 3,
		},
		{
			id: 12,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week1",
			course_skill: 3,
		},
		{
			id: 13,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Challenges",
			course_skill: 3,
		},
		{
			id: 14,
			coursework: "https://www.freecodecamp.org/learn",
			course_skill: 3,
		},
		{
			id: 15,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week2",
			course_skill: 3,
		},
		{
			id: 16,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week2",
			course_skill: 3,
		},
		{
			id: 17,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week3",
			course_skill: 3,
		},
		{
			id: 18,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week4",
			course_skill: 3,
		},
		{
			id: 19,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-1-Coursework-Week4",
			course_skill: 3,
		},
		{
			id: 20,
			coursework: "https://eloquentjavascript.net/04_data.html",
			course_skill: 3,
		},
		{
			id: 21,
			coursework:
				"https://northcoders.com/company/blog/what-is-test-driven-development",
			course_skill: 3,
		},
		{
			id: 22,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-2-Coursework-Week1",
			course_skill: 3,
		},
		{
			id: 23,
			coursework: "https://syllabus.codeyourfuture.io/git/cli/homework",
			course_skill: 3,
		},
		{
			id: 24,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-2-Coursework-Week2",
			course_skill: 3,
		},
		{
			id: 25,
			coursework:
				"https://www.khanacademy.org/computing/computer-programming/html-css-js",
			course_skill: 3,
		},
		{
			id: 26,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-2-Coursework-Week3",
			course_skill: 3,
		},
		{
			id: 27,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-2-Coursework-Week3",
			course_skill: 3,
		},
		{
			id: 28,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-2-Coursework-Week4",
			course_skill: 3,
		},
		{
			id: 29,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-3-Coursework-Week1",
			course_skill: 3,
		},
		{
			id: 30,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-3-Coursework-Week2",
			course_skill: 3,
		},
		{
			id: 31,
			coursework:
				"https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/readme",
			course_skill: 3,
		},
		{
			id: 32,
			coursework:
				"https://www.freecodecamp.org/news/array-destructuring-in-es6-30e398f21d10/",
			course_skill: 3,
		},
		{
			id: 33,
			coursework:
				"https://github.com/CodeYourFuture/JavaScript-Core-3-Coursework-Week3",
			course_skill: 3,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/cyf-hotel-react",
			course_skill: 4,
		},
		{
			id: 35,
			coursework:
				"https://www.freecodecamp.org/learn/front-end-libraries/react/",
			course_skill: 4,
		},
		{
			id: 36,
			coursework:
				"https://github.com/CodeYourFuture/cyf-react-challenges/tree/master/challenge-baby-name-picker",
			course_skill: 4,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/cyf-hotel-react#lesson-2",
			course_skill: 4,
		},
		{
			id: 35,
			coursework:
				"https://github.com/CodeYourFuture/cyf-react-challenges/tree/master/challenge-countries",
			course_skill: 4,
		},
		{
			id: 36,
			coursework: "https://shiffman.net/a2z/server-node/",
			course_skill: 4,
		},
		{
			id: 34,
			coursework: "https://www.youtube.com/watch?v=L72fhGm1tfE",
			course_skill: 5,
		},
		{
			id: 35,
			coursework:
				"https://github.com/CodeYourFuture/node-challenge-quote-server",
			course_skill: 5,
		},
		{
			id: 36,
			coursework: "https://github.com/CodeYourFuture/cyf-node-challenges",
			course_skill: 5,
		},
		{
			id: 34,
			coursework:
				"https://github.com/CodeYourFuture/node-challenge-chat-server",
			course_skill: 5,
		},
		{
			id: 35,
			coursework: "https://github.com/CodeYourFuture/cyf-node-challenges",
			course_skill: 5,
		},
		{
			id: 36,
			coursework:
				"https://learn.freecodecamp.org/apis-and-microservices/basic-node-and-express/",
			course_skill: 5,
		},
		{
			id: 34,
			coursework:
				"https://github.com/CodeYourFuture/node-challenge-hotel-server",
			course_skill: 5,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/cyf-node-challenges",
			course_skill: 5,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/cyf-node-challenges/",
			course_skill: 5,
		},
		{
			id: 34,
			coursework: "https://pgexercises.com/questions/basic/",
			course_skill: 6,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/SQL-Coursework-Week1",
			course_skill: 6,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/SQL-Coursework-Week2",
			course_skill: 6,
		},
		{
			id: 34,
			coursework: "https://github.com/CodeYourFuture/SQL-Coursework-Week3",
			course_skill: 6,
		},
	]);
};
