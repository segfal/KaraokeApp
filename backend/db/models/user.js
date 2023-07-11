const { DataTypes } = require("sequelize");
const db = require('../db');

const User = db.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type : DataTypes.STRING,
    allowNull: true
  },
  profilePic: { 
    type: DataTypes.STRING, // will change to Files using a profilePic database
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { User };