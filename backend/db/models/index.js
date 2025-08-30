const { Room } = require("./room");
const { Video } = require("./video");

// Music Queue
Room.hasMany(Video, {
    as: "queue"
})

// Karaoke Video of Given Room
Video.belongsTo(Room, {
    as: "room"
})

module.exports = { Room, Video };