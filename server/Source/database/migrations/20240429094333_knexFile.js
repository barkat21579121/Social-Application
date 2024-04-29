/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('newsFeeds', function (table) {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('description', 255).notNullable();
            table.binary('image').notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('newsFeeds');
};
