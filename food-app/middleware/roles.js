export function requireOwner(req, res, next) {
    if (req.user.role !== "owner") {
        return res.sendStatus(403);
    }
    next();
}