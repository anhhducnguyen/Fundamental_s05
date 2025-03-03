/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("product_tags", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned().references("id").inTable("products").onDelete("CASCADE");
        table.integer("tag_id").unsigned().references("id").inTable("tags").onDelete("CASCADE");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("product_tags");
};
