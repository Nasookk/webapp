import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { requireOwner } from "../middleware/roles.js";

const router = express.Router();

router.post("/:restaurantId",
    authenticate,
    requireOwner,
    (req, res) => {

        const check = db.prepare(
            "SELECT * FROM restaurants WHERE id = ? AND owner_id = ?"
        ).get(req.params.restaurantId, req.user.id);

        if (!check) return res.sendStatus(403);

        db.prepare(
            "INSERT INTO foods (name, price, restaurant_id) VALUES (?, ?, ?)"
        ).run(req.body.name, req.body.price, req.params.restaurantId);

        res.json({ success: true });
    });

router.get("/search", (req, res) => {
    const q = `%${req.query.q || ""}%`;
    const rows = db.prepare(`
    SELECT 
      foods.id,
      foods.name,
      foods.price,
      foods.rating,
      restaurants.name AS restaurant_name,
      restaurants.location AS restaurant_location
    FROM foods
    JOIN restaurants ON foods.restaurant_id = restaurants.id
    WHERE foods.name LIKE ?
  `).all(q);
    res.json(rows);
});

router.get("/", authenticate, (req, res) => {
    try {
        const rows = db.prepare(`
      SELECT 
        foods.id,
        foods.name,
        foods.price,
        foods.rating,
        foods.ingredients,
        foods.calories,
        foods.img,
        foods.restaurant_id,
        restaurants.name AS restaurant_name,
        restaurants.location AS restaurant_location,
        CASE WHEN ff.id IS NOT NULL THEN 1 ELSE 0 END AS is_favorite
      FROM foods
      JOIN restaurants ON foods.restaurant_id = restaurants.id
      LEFT JOIN favorite_foods ff
        ON ff.food_id = foods.id AND ff.user_id = ?
    `).all(req.user.id);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch foods" });
    }
});

export default router;
