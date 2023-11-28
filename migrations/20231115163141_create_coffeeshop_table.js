/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("coffeeshop", (table) => {
    table.increments("id").primary();
    table.string("coffeeshop_name").notNullable();
    table.string("address").notNullable();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
    table.string("description").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("coffeeshop");
};
