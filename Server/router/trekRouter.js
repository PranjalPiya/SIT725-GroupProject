const express = require('express');
const { createTrekDestination, getAllTrekDestinations, getTrekDestinationById } = require('../controller/trekController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();


// Route to create a trek destination (for admin)
router.post('/create', protect, admin, createTrekDestination);

// Route to get all trek destinations
router.get('/', protect, getAllTrekDestinations);

// Route to get single trek destination by ID
router.get('/:id', protect, getTrekDestinationById);

// Route to add review
// router.post('/:id/review', addReview);


module.exports = router;