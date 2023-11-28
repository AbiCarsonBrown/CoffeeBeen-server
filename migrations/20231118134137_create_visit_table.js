/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("visit", (table) => {
    table.increments("id").primary();
    table
      .integer("coffeeshop_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("coffeeshop")
      .onDelete("cascade");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("cascade");
    table.boolean("visited");
    table.boolean("on_wishlist");
    table.smallint("rating").unsigned();
    table.string("review");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("visit");
};
