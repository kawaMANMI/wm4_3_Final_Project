/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("coursework", function (table) {
		table.increments("id");
		table.string("coursework");
		table
			.integer("course_skill")
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
	return knex.schema.dropTableIfExists("coursework");
};
