const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

// Define routes
router.post('/register', authController.signup);
router.post('/login', authController.login);

// Add a route to handle the root `/api/user/`
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User API' });
});

router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
