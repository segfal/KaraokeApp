const express = require("express");
const router = express.Router();
const { Video } = require("../db/models");

router.get("/", async (req, res, next) => {
    try {
        const allVideos = await Video.findAll();
        allVideos
            ? res.status(200).json(allVideos)
            : res.status(404).send("No campuses found");
    } catch (error) {
        next(error);
    }
})

module.exports = router;