const admin = require('firebase-admin');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.OTHER, {
  dialectModule: require('pg'),
  dialect: 'postgres',
  //ssl true
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  },
  logging: false
});

module.exports = db;