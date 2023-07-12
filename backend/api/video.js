const express = require("express");
// const {gapi} = require("googleapis");
const youtubesearchapi = require("youtube-search-api");
const router = express.Router();
const { Video } = require("../db/models");

router.post("/addmusic/:keyword", async (req, res, next) => {
    try {
        const keyword = await req.params.keyword;
        const searchResult = await youtubesearchapi.GetListByKeyword(keyword);
        const videoId = searchResult.items[1].id;
        const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
        const newVideo = await Video.create({"link": videoLink});
        res.send(newVideo);
    } catch (error) {
        next(error);
    }
})

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