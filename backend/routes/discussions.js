const express = require("express");
const Discussion = require("../models/Discussion");
const router = express.Router();

// Получение всех дискуссий для статьи
router.get("/:articleId", async (req, res) => {
    try {
        const discussions = await Discussion.find({ articleId: req.params.articleId });
        res.json(discussions);
    } catch (error) {
        console.error("Error fetching discussions:", error);
        res.status(500).json({ error: error.message });
    }
});

// Добавление новой дискуссии
router.post("/", async (req, res) => {
    const { articleId, title } = req.body;
    const newDiscussion = new Discussion({ articleId, title });

    try {
        const savedDiscussion = await newDiscussion.save();
        res.json(savedDiscussion);
    } catch (error) {
        console.error("Error saving discussion:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
