const express = require('express');
const router = express.Router();
const { Room } = require('../db/models');

// Get all Rooms
router.get('/', async (req, res, next) => {
  try {
    const allRooms = await Room.findAll({ include: ['participants', 'queue'] });
    allRooms
      ? res.status(200).json(allRooms)
      : res.status(404).json('No rooms');
  } catch (error) {
    next(error);
  }
});
//post a new room
router.post('/', async (req, res, next) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
});
//delete a room
router.delete('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.roomId);
    if (room) {
      await room.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
//update a room
router.put('/:roomId', async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.roomId);
    if (room) {
      await room.update(req.body);
      res.json(room);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
//get a room by id

module.exports = router;
