//routes/booking.js
const express = require('express');
const router = express.Router();
const { adminAuth } = require("../middleware/auth");
const { getBookings, getBookingById,getBookingByUserId,getBookingByListingId, createBooking, updateBooking, deleteBooking } = require("../Auth/bookingsAuth");

router.route("/bookings").get( getBookings);
router.route("/bookings/:id").get(adminAuth, getBookingById);
router.route("/bookings/user/:userId").get(adminAuth, getBookingByUserId);
router.route("/bookings/listing/:listingId").get(getBookingByListingId);
router.route("/bookings").post(createBooking);
router.route("/bookings/:id").put(adminAuth, updateBooking);
router.route("/bookings/:id").delete(adminAuth, deleteBooking);

module.exports = router;