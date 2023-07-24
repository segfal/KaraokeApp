const crypto = require('crypto');
const { user } = require('pg/lib/defaults');
const { Model, DataTypes } = require("sequelize");
const db = require('../db');

class User extends Model {
  static generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }
  async encryptPassword(pw, salt) {
    console.log("pw", pw)
    console.log("salt", salt)
    return await crypto.createHash('RSA-SHA256').update(pw).update(salt).digest("hex");
  }
  async correctPassword(pwAttempt) {
    console.log("pwAttempt", pwAttempt)
    return await this.encryptPassword(pwAttempt, this.salt) === this.password;
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,  
      // unique: true
    },
    // userName: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   // unique: true
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type : DataTypes.STRING,
      allowNull: true
    },
    profilePic: { 
      type: DataTypes.STRING, // will change to Files using a profilePic database
      allowNull: true,
    },  
    googleId: { // OAuth
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        console.log("BEFORE BEFORE SAVE");
        
        if (user.changed('password')){
          console.log("BEFORE SAVE");
          user.salt = await User.generateSalt();
          user.password = await User.encyrptPassword(user.password, user.salt);
        }
      },
      beforeBulkCreate: async (users) => {
        users.forEach(async (user) => {
          if (user.changed("password")) {
            user.salt = await User.generateSalt();
            user.password = await User.encyrptPassword(user.password, user.salt);
          }
        })
      }
    }
  }
)

// const User = db.define("user", {
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   lastName: {
//     type : DataTypes.STRING,
//     allowNull: true
//   },
//   profilePic: { 
//     type: DataTypes.STRING, // will change to Files using a profilePic database
//     allowNull: true,
//   },  
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,  
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });

module.exports = { User };