/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("subscription").del();
	await knex("subscription").insert([
		{ id: 1, email_add: "kivh@fmail.com" },
		{ id: 2, email_add: "vikh@fmail.com" },
		{ id: 3, email_add: "hivk@fmail.com" },
		{ id: 4, email_add: "ikhv@fmail.com" },
	]);
};
