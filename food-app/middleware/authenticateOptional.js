import jwt from "jsonwebtoken";

export function authenticateOptional(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return next();
    const token = auth.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        req.user = null;
    }
    next();
}
