import express from "express";
import db from "../db.js";
import { authenticate, requireOwner } from "../middleware/auth.js";

const router = express.Router();

// Рестораны мэдээлэл авах
router.get("/restaurant", authenticate, requireOwner, (req, res) => {
  const restaurant = db.prepare("SELECT * FROM restaurants WHERE owner_id = ?").get(req.user.id);
  res.json(restaurant);
});

// Хоолнуудын жагсаалт авах
router.get("/foods", authenticate, requireOwner, (req, res) => {
  const foods = db.prepare(`
    SELECT * FROM foods 
    WHERE restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = ?)
  `).all(req.user.id);
  res.json(foods);
});

// Шинэ хоол нэмэх
router.post("/foods", authenticate, requireOwner, (req, res) => {
  const { name, price, img, ingredients, calories } = req.body;
  const ownerId = req.user.id;

  try {
    const restaurant = db.prepare("SELECT id FROM restaurants WHERE owner_id = ?").get(ownerId);
    const info = db.prepare(`
      INSERT INTO foods (name, price, image, ingredients, calories, restaurant_id, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, price, img, ingredients, calories, restaurant.id, "5.0/5");

    res.json({ message: "Амжилттай хадгалагдлаа", id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Хоол устгах
router.delete("/foods/:id", authenticate, requireOwner, (req, res) => {
  db.prepare("DELETE FROM foods WHERE id = ?").run(req.params.id);
  res.json({ message: "Амжилттай устгагдлаа" });
});

export default router;