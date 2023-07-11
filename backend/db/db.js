const admin = require('firebase-admin');
const { Sequelize } = require('sequelize');
const {dotenv} = require('dotenv').config();

const db = new Sequelize(`${process.env.DB_NAME}`, `${'postgres'}`, `${process.env.DB_PASSWORD}`, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: `${process.env.INSTANCE}`,
    timestamps: false,
    dialectOptions: {
      socketPath: `${process.env.INSTANCE}`
    },
});

module.exports = db;