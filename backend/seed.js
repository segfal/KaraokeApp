const { User } = require("./db/models/user");
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
    }
    ,{
        userName: "janesmith",
        password: null,
        firstName: "Jane",
        lastName: "Smith",
        profilePic: null,
        email: "janesmith@gmail.com",
        role: "viewer"
    }
]

const seed = async () => {
    await db.sync({force: true});
    await User.bulkCreate(seedUsers);
};

seed().then(() => process.exit());