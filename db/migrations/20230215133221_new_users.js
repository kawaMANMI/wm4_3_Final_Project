/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("new_users", function (table) {
		table.increments("id");
		table.string("name", 1000).notNullable();
		table.string("email").notNullable();
		table.string("role").notNullable();
		table.string("password", 1000).notNullable();
		table.integer("region_id").references("id").inTable("region").notNullable();
		table.string("class_code").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("new_users");
};
