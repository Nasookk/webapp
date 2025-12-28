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
    const rows = db.prepare(
        `SELECT foods.*, restaurants.name AS restaurant
     FROM foods
     JOIN restaurants ON foods.restaurant_id = restaurants.id
     WHERE foods.name LIKE ?`
    ).all(q);

    res.json(rows);
});

router.get("/", (req, res) => {
    const rows = db.prepare(`
        SELECT foods.*, restaurants.name AS restaurant
        FROM foods
        JOIN restaurants ON foods.restaurant_id = restaurants.id
    `).all();
    res.json(rows);
});

export default router;
