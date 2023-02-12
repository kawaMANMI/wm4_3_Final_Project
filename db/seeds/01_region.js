/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("region").del();
  await knex("region").insert([
		{ id: 1, name: "West Midlands" },
		{ id: 2, name: "North West" },
		{ id: 3, name: "London" },
    { id: 4, name: "Cape Town" },
	]);
};
