/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("visit", (table) => {
    table.increments("id").primary();
    table
      .bigInteger("coffeeshop_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("coffeeshop");
    table
      .bigInteger("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user");
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
