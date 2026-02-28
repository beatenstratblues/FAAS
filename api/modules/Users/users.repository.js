const db = require("../../infrastructure/db/db");

const UserRepository = {
    createUser: async (email, password_hash, api_key) => {
        const row = await db("users")
                        .insert({
                            email,
                            password_hash,
                            api_key
                        })
                        .returning("*");
        return row[0];
    },
    findByEmail: async (email) => {
        return db("knex")
            .where({
                email,
                deleted_at: null
            })
            .first();
    }
};

module.exports = UserRepository;