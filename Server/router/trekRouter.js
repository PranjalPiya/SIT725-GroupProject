const express = require('express');
const { createTrekDestination, getAllTrekDestinations, getTrekDestinationById, searchTrekDestinations, addReview } = require('../controller/trekController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();


// Route to create a trek destination (for admin)
router.post('/create', protect, admin, createTrekDestination);

// Route to get all trek destinations
router.get('/', getAllTrekDestinations);

// Route to get single trek destination by ID
router.get('/:id', protect, getTrekDestinationById);

// Search trek destinations route
router.get('/search', searchTrekDestinations);
// Route to add review
// Route to add a review and rating to a specific trek destination
router.post('/:id/reviews', protect, addReview);



module.exports = router;
