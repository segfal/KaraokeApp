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
        role: "viewer",

    },
    {
        userName: "joesmith222",
        password: null,
        firstName: "Joe",
        lastName: "Smith",
        profilePic: null,
        email: "joesmith@gmail.com",
        role: "viewer",
    }
]

const seedRooms = [
    {
        title: "Cool karaoke room",
    },
    {
        title: "Not cool karaoke room",
    }
]

const seedVideos = [
    {
        link: "https://www.youtube.com/watch?v=OpRqT1PhPdE",
        title: "Uptown Funk ft. Bruno Mars - Mark Ronson Karaoke 【No Guide Melody】 Instrumental"
    },
    {
        link: "https://www.youtube.com/watch?v=q7xdulZjasw",
        title: "FIFTY FIFTY - Cupid (Twin Ver.) (Karaoke Version)"
    },
    {
        link: "https://www.youtube.com/watch?v=1a5SWpp9Wfg",
        title: "Justin Bieber ft. Ludacris - Baby (Karaoke Version)"
    }
]

const seed = async () => {
    await db.sync({force: true});
    await User.bulkCreate(seedUsers);
    await Room.bulkCreate(seedRooms);
    await Video.bulkCreate(seedVideos);
};

seed().then(() => process.exit());