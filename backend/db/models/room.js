const { DataTypes } = require("sequelize");
const db = require('../db');

const Room = db.define("room", {
    // admin : {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { Room };