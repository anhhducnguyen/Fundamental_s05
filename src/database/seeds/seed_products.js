/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("products").del();
  await knex("listings").del();
  await knex("comments").del();
  await knex("tags").del();
  await knex("product_tags").del();

  const products = [
    { id: 1, productName: "Xbox 2023", status: true },
    { id: 2, productName: "Playstation v5.0", status: true },
    { id: 3, productName: "Nintendo switch", status: true },
  ];

  const listings = [
    { product_id: 1, description: "Very expensive shit !!!", price: 299, rate: 4 },
    { product_id: 2, description: "Very expensive and sophisticated electronic device !!!", price: 499, rate: 3 },
    { product_id: 3, description: "Very affordable and sophisticated electronic game for youngsters !!!", price: 399, rate: 5 },
  ];

  const comments = [
    { product_id: 1, content: "Product not good enough" },
    { product_id: 1, content: "Product is very good though" },
    { product_id: 2, content: "Product not very good but still fun to play" },
  ];

  const tags = [
    { id: 1, tagName: "games" },
    { id: 2, tagName: "electronic" },
  ];

  const product_tags = [
    { product_id: 1, tag_id: 1 },
    { product_id: 2, tag_id: 1 },
    { product_id: 3, tag_id: 2 },
  ];

  await knex("products").insert(products);
  await knex("listings").insert(listings);
  await knex("comments").insert(comments);
  await knex("tags").insert(tags);
  await knex("product_tags").insert(product_tags);
};
