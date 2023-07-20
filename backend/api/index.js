const router = require('express').Router();

router.use('/user', require('./user')); // /api/user
router.use("/room", require("./room"));
router.use("/video", require("./video"));

module.exports = router;