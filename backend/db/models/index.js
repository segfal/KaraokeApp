const { User } = require("./user");
const { Room } = require("./room");
const { Video } = require("./video");

// Room Participants
Room.hasMany(User, {
    as: "participants"
})

// User's Current Room
User.belongsTo(Room, {
    as: "room"
})

// Room Admin
Room.belongsTo(User, {
    as: "admin"
})

// Music Queue
Room.hasMany(Video, {
    as: "queue"
})

// Karaoke Video of Given Room
Video.belongsTo(Room, {
    as: "room"
})

module.exports = { User, Room, Video };