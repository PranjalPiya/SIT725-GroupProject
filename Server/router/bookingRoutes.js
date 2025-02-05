const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');

const {
  createBooking,
  getMyBookings,
  getAgencyBookings,
  updateBookingStatus,
  cancelBooking,
} = require('../controller/bookingController');

const router = express.Router();

router.route('/create')
  .post(protect, createBooking);

router.route('/my')
  .get(protect, getMyBookings);

router.route('/agency')
  .get(protect, getAgencyBookings);

// router.route('/:id/status')
//   .put(protect, agency, updateBookingStatus);

router.route('/:id/cancel')
  .put(protect, cancelBooking);

module.exports = router;