/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
		.createTable("region", function (table) {
			table.increments("id");
			table.string("name", 255).notNullable();
		})
		.createTable("users", function (table) {
			table.increments("id");
			table.string("name", 1000).notNullable();
            table.string("email").notNullable();
            table.string("role").notNullable();
            table
                .integer("region_id")
                .references("id")
                .inTable("region").notNullable();
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("region");
};
