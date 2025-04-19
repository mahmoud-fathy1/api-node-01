const jwt = require("jsonwebtoken");
const { promisify } = require("util");

async function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Please log in first" });
    }

    try {
        const decoded = await promisify(jwt.verify)(req.headers.authorization, process.env.SECRET);

        req.userId = decoded.id;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(400).json({ message: "Token verification error" });
        }
    }
}

module.exports = auth;
