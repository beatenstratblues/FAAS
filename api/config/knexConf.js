require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: '../db/migrations'
        },
        seeds: {
            directory: '../db/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DB_HOST,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: '../db/migrations'
        }
    }
};