const { User } = require("./db/models/user");
const { Room } = require("./db/models/room");
const { Video } = require("./db/models/video");
const db = require("./db/index");

const seedUsers = [
    {
        userName: "johndoe",
        password: null,
        firstName: "John",
        lastName: "Doe",
        profilePic: null,
        email: "johndoe@gmail.com",
        role: "admin"
    },
    {
        userName: "janesmith",
        password: null,
        firstName: "Jane",
        lastName: "Smith",
        profilePic: null,
        email: "janesmith@gmail.com",
        role: "viewer"
    }
]

const seedRooms = [
    {
        admin: User.findByPk(1),
    }
]

const seedVideos = [
    {
        link: "https://www.youtube.com/watch?v=OpRqT1PhPdE",
    },
    {
        link: "https://www.youtube.com/watch?v=q7xdulZjasw",
    }
]

const seed = async () => {
    await db.sync({force: true});
    await User.bulkCreate(seedUsers);
    await Room.bulkCreate(seedRooms);
    await Video.bulkCreate(seedVideos);
};

seed().then(() => process.exit());