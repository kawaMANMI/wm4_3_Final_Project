/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("users").del();
	await knex("users").insert([
		{
			id: 1,
			name: "Doe",
			email: "johndoe@fakemail.com",
			role: "Trainee",
			region_id: 3,
			classCode: "LDN5",
			password: "dsds"
		},
		{
			id: 2,
			name: "Mark",
			email: "markdoe@fakemail.com",
			role: "Trainee",
			region_id: 2,
			classCode: "NW5",
		},
		{
			id: 3,
			name: "Bob",
			email: "bob@fakemail.com",
			role: "Trainee",
			region_id: 3,
			classCode: "WM5",
		},
	]);
};
