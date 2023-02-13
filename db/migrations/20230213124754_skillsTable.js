/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("skills", function (table) {
			table.increments("id");
			table.string("skill_name", 255).notNullable();
		})
		.createTable("learning_objectives", function (table) {
			table.increments("id");
			table.string("objective", 1000).notNullable();
			table
				.integer("skill_id")
				.references("id")
				.inTable("skills")
				.notNullable();
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("learning_objectives")
		.dropTableIfExists("skills");
};
