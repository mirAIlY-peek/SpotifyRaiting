const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/spotify", async (req, res) => {
    const query = req.query.q;
    const token = req.query.token;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
