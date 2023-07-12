const express = require("express");
// const {gapi} = require("googleapis");
const youtubesearchapi = require("youtube-search-api");
const router = express.Router();
const { Video } = require("../db/models");

router.post("/addmusic/:keyword", async (req, res, next) => {
    try {
        const keyword = await req.params.keyword;
        const searchResult = await youtubesearchapi.GetListByKeyword(keyword + " karaoke");
        console.log(searchResult)
        const videoId = searchResult.items[1].id;
        const videoTitle = searchResult.items[1].title;
        const videoLink = `https://www.youtube.com/watch?v=${videoId}?autoplay=1`;
        const newVideo = await Video.create({"link": videoLink, "title": videoTitle});
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