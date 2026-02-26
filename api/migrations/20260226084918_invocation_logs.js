/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("invocation_logs", (table)=>{
    table.bigIncrements("id").primary();
    table.bigInteger("invocation_id")
            .unsigned()
            .references("id")
            .inTable("invocations")
            .notNullable()
            .onUpdate("CASCADE");
    table.integer("sequence_number").notNullable();
    table.string("stream").notNullable();
    table.text("message");
    table.timestamp("logged_at").index();
    table.index(["invocation_id", "sequence_number"]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("invocation_logs")
};
