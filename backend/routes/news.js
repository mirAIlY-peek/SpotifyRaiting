const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/music-news", async (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'new music release OR new album release OR music album launch -artificial -intelligence -iOS -Apple -UEFA',
                language: 'en',
                pageSize: 21,
                apiKey: apiKey
            }
        });
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
