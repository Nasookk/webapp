import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";
import { requireOwner } from "../middleware/roles.js";

const router = express.Router();

router.post("/", authenticate, requireOwner, (req, res) => {
    const result = db.prepare(
        "INSERT INTO restaurants (name, location, owner_id) VALUES (?, ?, ?)"
    ).run(req.body.name, req.body.location, req.user.id);

    res.json({ id: result.lastInsertRowid });
});

router.get("/", (req, res) => {
    const rows = db.prepare(
        "SELECT * FROM restaurants"
    ).all();

    res.json(rows);
});

export default router;