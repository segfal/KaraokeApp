const { User } = require("./user");
const { Room } = require("./room");
const { Video } = require("./video");

Room.hasMany(Video);
Room.hasMany(User); // participants
Room.belongsTo(User); // admin
Video.belongsTo(Room);
User.belongsTo(Room);

module.exports = { User, Room, Video };