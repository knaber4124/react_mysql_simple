const dbConfig = require('../config/db.config');
const Sequalize = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAlias: false,
    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequalize = Sequalize;
db.sequelize = sequelize;
db.items = require('./item.model.js')(sequelize, Sequalize);
module.exports = db;
