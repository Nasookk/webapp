import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    db.prepare(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
    ).run(email, hash, role);

    res.json({ success: true });
});

router.post("/login", async (req, res) => {
    const user = db.prepare(
        "SELECT * FROM users WHERE email = ?"
    ).get(req.body.email);

    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return res.sendStatus(401);

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
    );

    res.json({ token });
});

export default router;