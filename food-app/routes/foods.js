import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { requireOwner } from "../middleware/roles.js";
import { authenticateOptional } from "../middleware/authenticateOptional.js";

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

router.get("/",authenticateOptional, (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const rows = db.prepare(`
      SELECT 
        foods.id,
        foods.name,
        foods.price,
        foods.rating,
        foods.ingredients,
        foods.calories,
        foods.img,
        restaurants.name AS restaurant_name,
        restaurants.location AS restaurant_location,
        CASE 
          WHEN favorite_foods.id IS NOT NULL THEN 1
          ELSE 0
        END AS is_favorite
      FROM foods
      JOIN restaurants ON foods.restaurant_id = restaurants.id
      LEFT JOIN favorite_foods 
        ON favorite_foods.food_id = foods.id
        AND favorite_foods.user_id = ?
    `).all(userId);
    res.json(rows);
  } catch (err) {
    console.error("FOODS QUERY ERROR:", err);
    res.status(500).json({ error: "Could not fetch foods" });
  }
});


export default router;
