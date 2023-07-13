const express = require("express");
const youtubesearchapi = require("youtube-search-api");
const router = express.Router();
const { Video } = require("../db/models");
const axios = require("axios");

const youtubeSearch = async (page, count) => {
    console.log("youtube search function");
    if (count > 10) return;
    console.log("count");
    if (youtubesearchapi.NextPage(page) === undefined || page.data === undefined){
        return;
    } else {
        let isEmbeddable = false;
        for (let j = 0; j < page.items.length && !isEmbeddable; j++) {
            let response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'status',
                    id: page.items[j].id,
                    key: 'AIzaSyDV6uSSUBO9-ppfYycMcmFys1zvYRGgINw' // API key
                }
            })
            isEmbeddable = response.data.items[j].status.embeddable;
            console.log("DATA ITEMS----- ", data.items)
        }
        if (!isEmbeddable) {
            nextPage = await youtubesearchapi.NextPage(page);
            count++;
            youtubeSearch(nextPage, count);
        } else {
            const videoId = page.items[i].id;
            const videoTitle = page.items[i].title;
            const videoLink = `https://www.youtube.com/watch?v=${videoId}?autoplay=1`;
            const newVideo = await Video.create({"link": videoLink, "title": videoTitle});
            res.send(newVideo);
        } 
    }
}

router.post("/addmusic/:keyword", async (req, res, next) => {
    try {
        const keyword = await req.params.keyword;
        firstPage = await youtubesearchapi.GetListByKeyword(keyword + " karaoke");
        let count = 0;
        youtubeSearch(firstPage,0)
        // let isEmbeddable = false;
        // for (let i = 0; i < searchResult.items.length && !isEmbeddable; i++) {
        //     axios.get('https://www.googleapis.com/youtube/v3/videos', {
        //         params: {
        //             part: 'status',
        //             id: searchResult.items[i].id,
        //             key: 'AIzaSyDV6uSSUBO9-ppfYycMcmFys1zvYRGgINw' // API key
        //         }
        //     })
        //     .then(response => {
        //         console.log("----RESPONSE----" + response);
        //         console.log("----ITEMS-----" + response.data);

        //         // isEmbeddable = response.data.items[i].status.embeddable;
        //         isEmbeddable = response.data.items[i];
        //         console.log(isEmbeddable); // This will print 'true' if the video is embeddable, 'false' otherwise.
        //     })
        //     .catch(error => {
        //         console.log('Error: ' + error);
        //     });
        // }
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