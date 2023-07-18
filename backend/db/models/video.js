const { DataTypes } = require('sequelize');
const db = require('../db');

const Video = db.define('video', {
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = { Video };
