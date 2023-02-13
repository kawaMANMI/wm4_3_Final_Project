/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("skills").del();
	await knex("skills").insert([
		{ id: 1, skill_name: "HTML/CSS" },
		{ id: 2, skill_name: "Git" },
		{ id: 3, skill_name: "JavaScript" },
		{ id: 4, skill_name: "React" },
		{ id: 5, skill_name: "Node" },
		{ id: 6, skill_name: "Database-Postgres" },
	]);
};
