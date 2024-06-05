const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/token", async (req, res) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    try {
        const response = await axios.post(authOptions.url, 'grant_type=client_credentials', {
            headers: authOptions.headers,
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
