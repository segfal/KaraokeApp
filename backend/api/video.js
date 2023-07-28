const express = require("express");
const youtubesearchapi = require("youtube-search-api");
const router = express.Router();
const { Video } = require("../db/models");
const axios = require("axios");
const dotenv = require("dotenv").config();

router.post("/addmusic/:keyword", async (req, res, next) => {
    const keyword = await req.params.keyword + " karaoke";
    const apiKey = process.env.API_KEY;
    //get search result from youtube api
    let searchArray = await axios.get(
        'https://www.googleapis.com/youtube/v3/search', 
        {
            params: {
                part: 'snippet',
                maxResults: 25,
                q: keyword,
                key: apiKey
            }
        }
    )
    let searchResults = searchArray.data.items;
    let isEmbeddable = false;
    try {

        // Get all info of each individual search result then check if it is embeddable. if embeddable, post to database
        for (let i = 0; i < searchResults.length; i++) {
            // g
            let response = await axios.get('https://www.googleapis.com/youtube/v3/videos',
            {
                params: {
                    part: 'status',
                    id: searchResults[i].id.videoId,
                    key: apiKey
                }
            })
            
            isEmbeddable = response.data.items[0].status.embeddable;
            if (isEmbeddable) {
                const videoId = response.data.items[0].id;
                console.log("VIDEO ID---- ", videoId);
                const videoLink = `https://www.youtube.com/embed/${videoId}`;

                // console.log("EMBED RES---- ", searchResults[i]);
                const videoTitle = searchResults[i].snippet.title;
                const videoThumbnail = searchResults[i].snippet.thumbnails.default.url;
                console.log("RESPONSE SNIPPET------ ", searchResults[i].snippet.thumbnails.default.url);
                // console.log(videoTitle);
                const newVideo = await Video.create({"link": videoLink, "title": videoTitle, "thumbnail": videoThumbnail});
                res.send(newVideo);
                return;
            }
        }

    } catch (error) {
        next(error);
    }
})

router.get("/", async (req, res, next) => {
    try {
        const allVideos = await Video.findAll();
        allVideos
            ? res.status(200).json(allVideos)
            : res.status(404).send("No videos found");
    } catch (error) {
        next(error);
    }
})

module.exports = router;