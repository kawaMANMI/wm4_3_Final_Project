/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user_learning_obj").del();
	await knex("new_users").del();
	const password = "123";
	const hashedPassword = await bcrypt.hash(password, 10);
	await knex("new_users").insert([
		{
			id: 1,
			name: "Doe",
			email: "johndoe@fakemail.com",
			role: "Trainee",
			password: hashedPassword,
			region_id: 3,
			class_code: "LDN5",
			//paswword 123
		},
		{
			id: 2,
			name: "Ali",
			email: "markdoe@fakemail.com",
			role: "Mentor",
			password: hashedPassword,
			region_id: 2,
			class_code: "NW5",
		},
		{
			id: 3,
			name: "Bob",
			email: "bob@fakemail.com",
			role: "Trainee",
			password: "ashah",
			region_id: 3,
			class_code: "WM5",
		},
		{
			id: 4,
			name: "Mark",
			email: "mark@fakemail.com",
			role: "Mentor",
			password: "ashah",
			region_id: 3,
			class_code: "WM5",
		},
		{
			id: 5,
			name: "Jon",
			email: "Jon@fakemail.com",
			role: "Mentor",
			password: "ashah",
			region_id: 4,
			class_code: "ND3",
		},
		{
			id: 6,
			name: "Justin",
			email: "Justin@fakemail.com",
			role: "Trainee",
			password: "alaba",
			region_id: 4,
			class_code: "ND3",
		},
		{
			id: 7,
			name: "Elizabeth",
			email: "Elizabeth@fakemail.com",
			role: "Trainee",
			password: "milk",
			region_id: 4,
			class_code: "ND3",
		},
		{
			id: 8,
			name: "Mariam",
			email: "Mariam@fakemail.com",
			role: "Trainee",
			password: "wolf",
			region_id: 4,
			class_code: "ND3",
		},
		{
			id: 9,
			name: "Chris",
			email: "Chris@fakemail.com",
			role: "Trainee",
			password: "cat",
			region_id: 4,
			class_code: "ND3",
		},
		{
			id: 10,
			name: "Joana",
			email: "Joana@fakemail.com",
			role: "Trainee",
			password: "kitty",
			region_id: 4,
			class_code: "ND3",
		},
	]);
};
