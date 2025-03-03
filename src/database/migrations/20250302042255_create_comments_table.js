/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("comments", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned().references("id").inTable("products").onDelete("CASCADE");
        table.text("content").notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
