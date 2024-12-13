// routes/booking.js
const express = require('express');
const Booking = require('../models/Booking');
const Listing = require('../models/Listings');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const adminCheck = require('../middleware/adminCheck');

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
    const { userId, listingId, startDate, endDate } = req.body;
    try {
        // Ensure the authenticated user matches userId
        if (req.user.userId !== userId) return res.status(403).send('Forbidden');

        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).send('Listing not found');

        const totalAmount = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) * listing.pricePerNight;

        const booking = new Booking({
            userId,
            listingId,
            startDate,
            endDate,
            totalAmount,
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get bookings by user
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('listingId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all bookings for a listing
router.get('/listing/:listingId', async (req, res) => {
    try {
        const bookings = await Booking.find({ listingId: req.params.listingId }).populate('userId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update booking status (Amin only)
router.patch('/:id', authenticateToken, adminCheck, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).send('Booking not found');
        // booking.status = req.body.status || booking.status;
        // await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
