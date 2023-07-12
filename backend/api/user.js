const express = require('express');
const router = express.Router();
const { User } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    users ? res.json(users) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
