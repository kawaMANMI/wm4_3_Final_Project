/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user_learning_obj").del();
	await knex("user_learning_obj").insert([
		{ user_id: 1, lo_id: 1, score: 3 },
		{ user_id: 2, lo_id: 1, score: 2 },
		{ user_id: 3, lo_id: 1, score: 4 },
		{ user_id: 6, lo_id: 1, score: 4 },
		{ user_id: 7, lo_id: 1, score: 3 },
		{ user_id: 8, lo_id: 1, score: 4 },
		{ user_id: 9, lo_id: 1, score: 5 },
	]);
};
