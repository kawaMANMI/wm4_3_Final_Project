/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("user_learning_obj", function (table) {
		table
			.integer("user_id")
			.references("id")
			.inTable("new_users")
			.notNullable();
		table
			.integer("lo_id")
			.references("id")
			.inTable("learning_objectives")
			.notNullable();
		table.integer("score");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("user_learning_obj");
};
