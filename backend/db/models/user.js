const { defineModel, DataTypes } = require("firestore-sequelize");
const User = defineModel("users", {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  profilePic: {
    type: File,
  },
  email: "",
  role: "",
});

module.exports = User;