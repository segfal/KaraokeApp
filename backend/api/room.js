const express = require("express");
const router = express.Router();
const { Room } = require("../db/models");

// Get all Rooms
router.get("/", async (req, res, next) => {
  try {
    const allRooms = await Room.findAll({include: ["participants", "queue"]});
    allRooms
      ? res.status(200).json(allRooms)
      : res.status(404).json("No rooms"); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;