import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();
router.post("/foods", authenticate, (req, res) => {
    const userId = req.user.id;
    const foodId = req.body.id;

    try {
        db.prepare(
            `INSERT OR IGNORE INTO favorite_foods (user_id, food_id) VALUES (?, ?)`
        ).run(userId, foodId);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add favorite food" });
    }
});
router.delete("/foods/:id", authenticate, (req, res) => {
    const userId = req.user.id;
    const foodId = req.params.id;

    try {
        db.prepare(
            `DELETE FROM favorite_foods WHERE user_id = ? AND food_id = ?`
        ).run(userId, foodId);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not remove favorite food" });
    }
});
router.post("/restaurants", authenticate, (req, res) => {
    const userId = req.user.id;
    const restaurantId = req.body.id;

    try {
        db.prepare(
            `INSERT OR IGNORE INTO favorite_restaurants (user_id, restaurant_id) VALUES (?, ?)`
        ).run(userId, restaurantId);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add favorite restaurant" });
    }
});
router.delete("/restaurants/:id", authenticate, (req, res) => {
    const userId = req.user.id;
    const restaurantId = req.params.id;

    try {
        db.prepare(
            `DELETE FROM favorite_restaurants WHERE user_id = ? AND restaurant_id = ?`
        ).run(userId, restaurantId);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not remove favorite restaurant" });
    }
});

export default router;
