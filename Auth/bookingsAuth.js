// Auth/bookingsAuth.js

const Booking = require('../models/Booking');
const Listing = require('../models/Listings');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { userId, listingId, startDate, endDate, totalAmount } = req.body;
    try {
        // Ensure the authenticated user matches userId
        if (req.user.userId !== userId) return res.status(403).send('Forbidden: You cannot book for another user');

        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).send('Listing not found');

        const calculatedAmount = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) * listing.pricePerNight;

        const booking = new Booking({
            userId,
            listingId,
            startDate,
            endDate,
            totalAmount: calculatedAmount
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// View all bookings (Admin only)
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId listingId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get bookings by user
exports.getBookingByUserId = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('listingId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all bookings for a listing
exports.getBookingByListingId = async (req, res) => {
    try {
        const bookings = await Booking.find({ listingId: req.params.listingId }).populate('userId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId listingId');
        if (!booking) return res.status(404).send('Booking not found');
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update booking status (Admin only)
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).send('Booking not found');
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Delete a booking (Admin only)
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).send('Booking not found');
        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};