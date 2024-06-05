const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/Review");
const router = express.Router();

// Маршрут для получения отзывов по articleId
router.get("/:articleId", async (req, res) => {
    try {
        const reviews = await Review.find({ articleId: req.params.articleId });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error); // Добавлено логирование ошибки
        res.status(500).json({ error: error.message });
    }
});

// Маршрут для добавления нового отзыва
router.post("/", async (req, res) => {
    const { articleId, name, comment, rating } = req.body;

    const newReview = new Review({
        articleId,
        name,
        comment,
        rating
    });

    try {
        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (error) {
        console.error("Error saving review:", error); // Добавлено логирование ошибки
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
