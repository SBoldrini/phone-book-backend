const { Sequelize } = require('sequelize');

const db = new Sequelize('phone-book', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false,
});


module.exports = db;