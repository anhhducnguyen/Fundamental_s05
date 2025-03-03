/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("listings", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned().references("id").inTable("products").onDelete("CASCADE");
        table.text("description").notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.decimal("rate", 2, 1).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("listings");
};
