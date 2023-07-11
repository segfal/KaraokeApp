const { DataTypes } = require('sequelize');
const db = require('../index');

const Video = db.define('video', {
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = { Video };
