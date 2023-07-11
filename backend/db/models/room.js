const { DataTypes } = require("sequelize");
const db = require('../index');

const Room = db.define("room", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { Room };