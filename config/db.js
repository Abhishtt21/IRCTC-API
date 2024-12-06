const {Sequelize} = require('sequelize');
require('dotenv').config();

DB_NAME = process.env.DB_NAME;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASS;
DB_HOST = process.env.DB_HOST;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS,{
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000

    }
});

module.exports = sequelize;