const express = require("express");
const router = express.Router();
const { Video } = require("../db/models");

router.get("/", async (req, res, next) => {
    try {
        
    } catch (error) {
         next(error);
    }
})