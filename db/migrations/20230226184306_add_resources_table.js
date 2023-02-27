/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("resources", function (table) {
		table.increments("id");
		table.string("title");
		table.string("url");
		table.integer("reading_time");
		table.integer("skill_id").references("id").inTable("skills").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("resources");
};
