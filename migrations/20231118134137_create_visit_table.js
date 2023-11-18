/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("visit", (table) => {
    table.increments("id").primary();
    table.bigInteger("coffeeshop_id").notNullable().unsigned();
    table.bigInteger("user_id").notNullable().unsigned();
    table.boolean("visited");
    table.boolean("on_wishlist");
    table.smallint("rating").unsigned();
    table.string("review");
    table.foreign("coffeeshop_id").references("coffeeshop.id");
    table.foreign("user_id").references("user.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("visit");
};
