const express = require('express');
const { signup, login, logout, forgotPassword } = require('../controller/authController');

const router = express.Router();

// Define routes
router.post('/register', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);

// Add a route to handle the root `/api/user/`
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User API' });
});

module.exports = router;
