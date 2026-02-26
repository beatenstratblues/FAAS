/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("invocations", (table) => {
        table.bigIncrements("id").primary();
        table.integer("function_version_id")
            .unsigned()
            .references("id")
            .inTable("function_versions")
            .notNullable()
            .onUpdate("CASCADE");
        table.string("status").notNullable();
        table.jsonb("payload");
        table.jsonb("result");
        table.integer("duration_ms").notNullable();
        table.timestamps(true, true);
        table.index(["function_version_id","status","id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("invocations");
};
