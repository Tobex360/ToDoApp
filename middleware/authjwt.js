const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication failed: No token' });
    }

    // Expected: "Bearer token"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid, please log in again' });
        }

        req.user = decoded; // ✅ FIX
        next();
    });
};

module.exports = authenticateToken;
