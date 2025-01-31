const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Assuming your User model is stored here

// Middleware for protecting routes
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Extract token
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Get user without password

        next(); // Proceed to next step
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

// Middleware for checking if the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // If admin, proceed
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = { protect, admin };
