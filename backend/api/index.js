const router = require("express").Router();

router.use("/room", require("./room"));
router.use("/video", require("./video"));

module.exports = router;