import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/foods", authenticate, (req, res) => {
    const userId = req.user.id;
    const { foodId, rating, review } = req.body;

    try {
        db.prepare(`
      INSERT INTO food_ratings (user_id, food_id, rating, review)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id, food_id) DO UPDATE SET rating = excluded.rating, review = excluded.review
    `).run(userId, foodId, rating, review || "");

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not rate food" });
    }
});

router.post("/restaurants", authenticate, (req, res) => {
    const userId = req.user.id;
    const { restaurantId, rating, review } = req.body;

    try {
        db.prepare(`
      INSERT INTO restaurant_ratings (user_id, restaurant_id, rating, review)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id, restaurant_id) DO UPDATE SET rating = excluded.rating, review = excluded.review
    `).run(userId, restaurantId, rating, review || "");

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not rate restaurant" });
    }
});

export default router;
