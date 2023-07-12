const router = require('express').Router();

router.use('/user', require('./user'));
router.use("/room", require("./room"));
router.use("/video", require("./video"));

module.exports = router;