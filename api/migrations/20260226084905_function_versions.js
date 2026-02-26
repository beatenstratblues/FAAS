/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("function_versions", (table) => {
        table.increments("id").primary();
        table.integer("function_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("functions")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.integer("version_number").notNullable().index();
        table.string("runtime").notNullable();
        table.integer("memory_mb").notNullable();
        table.integer("timeout_sec").notNullable();
        table.string("docker_image").notNullable();
        table.text("source_code").notNullable();
        table.timestamp("deleted_at").nullable().index();
        table.timestamps(true,true);
        table.index(["function_id", "version_number"]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("function_versions");
};
