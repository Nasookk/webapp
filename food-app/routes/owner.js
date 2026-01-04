import express from "express";
import db from "../db.js";
import { authenticate, requireOwner } from "../middleware/auth.js";

const router = express.Router();

router.get("/restaurant", authenticate, requireOwner, (req, res) => {
  const restaurant = db
    .prepare("SELECT * FROM restaurants WHERE owner_id = ?")
    .get(req.user.id);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  res.json(restaurant);
});

router.get("/foods", authenticate, requireOwner, (req, res) => {
  const foods = db.prepare(`
    SELECT * FROM foods
    WHERE restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = ?
    )
  `).all(req.user.id) || [];
  res.json(foods);
});


router.post("/foods", authenticate, requireOwner, (req, res) => {
  console.log("USER:", req.user);
  console.log("BODY:", req.body);
  const { name, price, image, ingredients, calories } = req.body;
  const ownerId = req.user.id;
  const restaurant = db
    .prepare("SELECT id FROM restaurants WHERE owner_id = ?")
    .get(ownerId);
  console.log("RESTAURANT:", restaurant);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  const img = image && image.trim() !== "" ? image : "./img/img_foods/default.webp";
  const info = db.prepare(`
    INSERT INTO foods (name, price, img, ingredients, calories, restaurant_id, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(name, price, img, ingredients, calories, restaurant.id, "5.0/5");
  res.json({ message: "Амжилттай хадгалагдлаа", id: info.lastInsertRowid });
});

router.post("/restaurant", authenticate, requireOwner, (req, res) => {
  const { name, address, image } = req.body;
  const exists = db
    .prepare("SELECT id FROM restaurants WHERE owner_id = ?")
    .get(req.user.id);
  if (exists) {
    return res.status(400).json({ error: "Restaurant already exists" });
  }
  const img = image && image.trim() !== "" ? image : "./img/img_restaurants/default.webp";
  const info = db.prepare(`
    INSERT INTO restaurants (name, location, owner_id, img)
    VALUES (?, ?, ?, ?)
  `).run(name, address, req.user.id, img);
  res.json({
    message: "Restaurant амжилттай үүсгэгдлээ",
    id: info.lastInsertRowid,
    restaurant: { id: info.lastInsertRowid, name, location: address, image: img }
  });
});

router.delete("/foods/:id", authenticate, requireOwner, (req, res) => {
  db.prepare(`
    DELETE FROM foods 
    WHERE id = ?
    AND restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = ?
    )
  `).run(req.params.id, req.user.id);
  res.json({ message: "Амжилттай устгагдлаа" });
});

router.delete("/restaurant", authenticate, requireOwner, (req, res) => {
  const restaurant = db
    .prepare("SELECT id FROM restaurants WHERE owner_id = ?")
    .get(req.user.id);

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  db.prepare(`
    DELETE FROM foods
    WHERE restaurant_id = ?
  `).run(restaurant.id);

  db.prepare(`
    DELETE FROM restaurants
    WHERE id = ?
  `).run(restaurant.id);

  res.json({ message: "Restaurant амжилттай устгагдлаа" });
});

export default router;