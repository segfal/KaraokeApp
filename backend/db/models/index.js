const User = require("./user");
const Room = require("./room");
const Video = require("./video");

Room.hasMany(Video);
Room.hasMany(User);
Video.belongsTo(Room);

module.exports = { User, Room, Video };