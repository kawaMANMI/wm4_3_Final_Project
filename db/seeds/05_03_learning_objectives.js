/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	// await knex("learning_objectives").del();
	await knex("learning_objectives").insert([
		{
			id: 31,
			objective: "Be able to create a button",
			skill_id: 1,
		},
		{
			id: 32,
			objective: "Understand the difference between a tag, class and ID",
			skill_id: 1,
		},
		{
			id: 33,
			objective: "Understand what prefixes are",
			skill_id: 1,
		},
		{
			id: 34,
			objective: "Understand what pseudo classes are",
			skill_id: 1,
		},
		{
			id: 35,
			objective: "Understand the difference between padding and margin",
			skill_id: 1,
		},
		{
			id: 36,
			objective: "Be able to create a comment in HTML and CSS",
			skill_id: 1,
		},
		{
			id: 37,
			objective:
				"Can create a media query that triggers a change / changes on another device / screen size",
			skill_id: 1,
		},
		{
			id: 38,
			objective: "Understand how to implement flexbox and when to use it",
			skill_id: 1,
		},
		{
			id: 39,
			objective: "Understand how to implement Grid and when to use it",
			skill_id: 1,
		},
		{
			id: 40,
			objective: "Understand how to include Bootstrap in a project",
			skill_id: 1,
		},
		{
			id: 41,
			objective: "Be able to use Bootstrap classes",
			skill_id: 1,
		},
		{
			id: 42,
			objective:
				"Know how to fork a repo and understand how this differs from cloning",
			skill_id: 2,
		},
		{
			id: 43,
			objective: "Understand the difference between const and let",
			skill_id: 3,
		},
		{
			id: 44,
			objective: "Be able to write a function",
			skill_id: 3,
		},
		{
			id: 45,
			objective: "Be able to use concatenation",
			skill_id: 3,
		},
		{
			id: 46,
			objective:
				"Be able to use string methods like length, indexOf(), slice(), splice(), toUpperCase(), etc.",
			skill_id: 3,
		},
		{
			id: 47,
			objective: "Understand what a return statement does",
			skill_id: 3,
		},
		{
			id: 48,
			objective: "Be able to use a callback function",
			skill_id: 3,
		},
		{
			id: 49,
			objective: "Understand the difference between expressions and statements",
			skill_id: 3,
		},
		{
			id: 50,
			objective: "Understand what a conditional is",
			skill_id: 3,
		},
		{
			id: 51,
			objective: "Be able to write an if/else statement",
			skill_id: 3,
		},
		{
			id: 52,
			objective: "Be able to use a ternary operator",
			skill_id: 3,
		},
		{
			id: 53,
			objective: "Understand what booleans are",
			skill_id: 3,
		},
		{
			id: 54,
			objective: "Understand how to use comparision operators like < and >",
			skill_id: 3,
		},
		{
			id: 55,
			objective: "Understand how to use logical operators like && and ||",
			skill_id: 3,
		},
		{
			id: 56,
			objective: "Understand the difference between for and while loops",
			skill_id: 3,
		},
		{
			id: 57,
			objective: "Be able to write a regular for loop",
			skill_id: 3,
		},
		{
			id: 58,
			objective: "Be able to write a forEach loop",
			skill_id: 3,
		},
		{
			id: 59,
			objective: "Understand what arrays are",
			skill_id: 3,
		},
		{
			id: 60,
			objective:
				"Be able to use array methods like pop(), push(), shift(), unshift(), splice(), includes(), etc.",
			skill_id: 3,
		},
		{
			id: 61,
			objective: "Understand what an anonymous function is",
			skill_id: 3,
		},
		{
			id: 62,
			objective: "Be able to use the map() method",
			skill_id: 3,
		},
		{
			id: 63,
			objective: "Be able to use filter() method",
			skill_id: 3,
		},
		{
			id: 64,
			objective: "Be able to chain methods",
			skill_id: 3,
		},
		{
			id: 65,
			objective: "Understand what an object is",
			skill_id: 3,
		},
		{
			id: 66,
			objective: "Can access and retrieve data from an object",
			skill_id: 3,
		},
		{
			id: 67,
			objective: "Can edit data in an object",
			skill_id: 3,
		},
		{
			id: 68,
			objective: "Be able to create a method in an object",
			skill_id: 3,
		},
		{
			id: 69,
			objective: "Be able to call a method in an object",
			skill_id: 3,
		},
		{
			id: 70,
			objective:
				"Be able to use methods like map(), filter(), etc with objects",
			skill_id: 3,
		},
		{
			id: 71,
			objective: "Be able to use built-in object methods like .keys()",
			skill_id: 3,
		},
		{
			id: 72,
			objective: "Be able to loop over an object with for...in",
			skill_id: 3,
		},
		{
			id: 73,
			objective: "Be able to convert an object into an array",
			skill_id: 3,
		},
		{
			id: 74,
			objective: "Understand what the DOM is",
			skill_id: 3,
		},
		{
			id: 75,
			objective:
				"Be able to manipulate the DOM with query selectors like getElementById, querySelectorAll, etc.",
			skill_id: 3,
		},
		{
			id: 76,
			objective: "Be able to set up event listeners like click",
			skill_id: 3,
		},
		{
			id: 77,
			objective: "Create HTML elements with Javascript",
			skill_id: 3,
		},
		{
			id: 78,
			objective:
				"Be able to use Javascript to modify HTML elements e.g. their CSS properties",
			skill_id: 3,
		},
		{
			id: 79,
			objective:
				"Understand the difference between synchronous and asynchronous",
			skill_id: 3,
		},
		{
			id: 80,
			objective: "Understand the difference between client and server",
			skill_id: 3,
		},
		{
			id: 81,
			objective: "Understand the difference between GET and POST",
			skill_id: 3,
		},
		{
			id: 82,
			objective: "Be able to make GET requests",
			skill_id: 3,
		},
		{
			id: 83,
			objective: "Be able to make POST requests",
			skill_id: 3,
		},
		{
			id: 84,
			objective: "Be able to debug your code with tools like DevTools",
			skill_id: 3,
		},
		{
			id: 85,
			objective: "Understand how to use logical operators like && and ||",
			skill_id: 3,
		},
		{
			id: 86,
			objective:
				"Understand what common errors mean e.g. Syntax Error, Reference Error",
			skill_id: 3,
		},
		{
			id: 87,
			objective: "Understand what an API is and what they are used for",
			skill_id: 3,
		},
		{
			id: 88,
			objective: "Understand what a Promise is",
			skill_id: 3,
		},
		{
			id: 89,
			objective: "Be able to make a fetch() request",
			skill_id: 3,
		},
		{
			id: 90,
			objective: "Understand what JSON is",
			skill_id: 3,
		},
		{
			id: 91,
			objective: "Be able to handle JSON data from a fetch() request",
			skill_id: 3,
		},
		{
			id: 92,
			objective: "Understand what scope is and how it can affect your code",
			skill_id: 3,
		},
		{
			id: 93,
			objective: "Be able to use array destructuring",
			skill_id: 3,
		},
		{
			id: 94,
			objective: "Be able to handle events in React",
			skill_id: 4,
		},
		{
			id: 95,
			objective: "Be able to use ternary operators in React",
			skill_id: 4,
		},
		{
			id: 96,
			objective: "Be able to use conditional rendering",
			skill_id: 4,
		},
		{
			id: 97,
			objective: "Understand what state is and how to use it",
			skill_id: 4,
		},
		{
			id: 98,
			objective: "Be able to update state",
			skill_id: 4,
		},
		{
			id: 99,
			objective: "Understand what hooks are",
			skill_id: 4,
		},
		{
			id: 100,
			objective: "Be able to use the useState hook",
			skill_id: 4,
		},
		{
			id: 101,
			objective: "Be able to use the useEffect hook",
			skill_id: 4,
		},
		{
			id: 102,
			objective:
				"Understand what dependencies are in relation to useEffect and how this can effect the functionality of this hook",
			skill_id: 4,
		},
		{
			id: 103,
			objective: "Be able to handle forms in React",
			skill_id: 4,
		},
		{
			id: 104,
			objective: "Be able to use fetch in React",
			skill_id: 4,
		},
		{
			id: 105,
			objective: "Be able to implement a GET request",
			skill_id: 5,
		},
		{
			id: 106,
			objective: "Be able to implement a POST request",
			skill_id: 5,
		},
		{
			id: 107,
			objective: "Be able to implement a DELETE request",
			skill_id: 5,
		},
		{
			id: 108,
			objective: "Be able to retrieve data from a table",
			skill_id: 6,
		},
		{
			id: 109,
			objective: "Understand the different types of data",
			skill_id: 6,
		},
		{
			id: 110,
			objective: "Be able to use conditionals in SQL statements",
			skill_id: 6,
		},
		{
			id: 111,
			objective: "Be able to drop/delete tables",
			skill_id: 6,
		},
		{
			id: 112,
			objective: "Be able to update data in a table",
			skill_id: 6,
		},
		{
			id: 113,
			objective: "Be able to delete rows",
			skill_id: 6,
		},
		{
			id: 114,
			objective: "Be able to join tables",
			skill_id: 6,
		},
	]);
};
