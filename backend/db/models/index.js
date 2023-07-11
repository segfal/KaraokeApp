const { User } = require("./user");
const { Room } = require("./room");
const { Video } = require("./video");



Room.belongsTo(User, {
    as: "adminRoom",
    foreignKey: "adminId"
}); //participants
Room.hasMany(User, {
    as: "user",
    foreignKey: "userId"
})
Room.belongsToMany(User, {through: "participants"})
User.belongsToMany(Room, {through: "participants"})
User.belongsTo(Room, {
    as: "room",
    foreignKey: "roomId"
})
// Room.belongsTo(User, {
//     as: "participantsRoom",
//     foreignKey: "participantId"
// }); // room belongs admin

// User.hasOne(Room, {
//     as: "admin",
//     foreignKey: "adminId"
// });

// User.hasMany(Room, {
//     as: "participants",
//     foreignKey: "participantId"
// })



// // Room.hasMany(Video);
// User.hasMany(Room, {
//     // as: "participants",
//     // foreignKey: "participantsId",
//     through: "participants"
// }) // participants
// Room.hasMany(Video, {
//     as: "music"
// })
// User.belongsTo(Room, {
//     as:"room"
// }); 




// User.hasOne(Room)
// Video.belongsTo(Room);
// User.belongsTo(Room , {
//     foreignKey: "room"
// });

module.exports = {
    User, Room, Video
    
  };