/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.dropTableIfExists("users");
    await knex.schema.renameTable("new_users", "users");
	await knex.schema.alterTable("users", (table) => {
		table.string("username", 25);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
	await knex.schema.alterTable("users", (table) => {
		table.dropColumn("username");
	});
	await knex.schema.renameTable("users", "new_users");
	await knex.schema.createTable("users", function (table) {
		table.increments("id");
		table.string("name", 1000).notNullable();
		table.string("email").notNullable();
		table.string("role").notNullable();
		table.integer("region_id").references("id").inTable("region").notNullable();
	});
};
