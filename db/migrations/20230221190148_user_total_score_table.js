/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	return knex.schema.createTable("total_score", function (table) {
		table.increments("id");
		table.integer("user_id").references("id").inTable("users").notNullable();
		table.integer("total_score").notNullable();
		table
			.timestamp("submitted_at", 1000)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("total_score");
};
