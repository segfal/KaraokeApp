const admin = require('firebase-admin');
const { Sequelize } = require('sequelize');
const serviceAccount = require('./creds.json');
const {dotenv} = require('dotenv').config();


console.log(process.env.INSTANCE)


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