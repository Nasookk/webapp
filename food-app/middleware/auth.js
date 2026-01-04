import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
}
export function requireOwner(req, res, next) {
    if (req.user && req.user.role === 'owner') {
        next();
    } else {
        res.status(403).json({ message: "Зөвхөн рестораны эзэн хандах эрхтэй" });
    }
}