require('dotenv').config();

const knex = require('knex');
const config = require('../../config/knexConf');

const db = knex(config[process.env.NODE_ENV || "development"]);

module.exports = db;