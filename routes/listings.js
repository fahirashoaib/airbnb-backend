// routes/listings.js
const express = require('express');
const Listing = require('../models/Listings');
const authenticateToken = require('../middleware/authenticateToken');
const adminCheck = require('../middleware/adminCheck');
const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const listings = await Listing.find().limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await Listing.countDocuments();
        res.json({ listings, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific listing by ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).send('Listing not found');
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new listing (Admin only)
router.post('/', authenticateToken, adminCheck, async (req, res) => {

    try {
        const { title, location, availability, pricePerNight, imageUrl } = req.body;

        // Ensure `imageUrls` is an array
        if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
            return res.status(400).json({ message: 'imageUrls must be a non-empty array' });
        }


        const newListing = new Listing({ title, location, availability, pricePerNight, imageUrl });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a listing by ID
router.patch('/:id', authenticateToken, adminCheck, async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedListing) return res.status(404).send('Listing not found');
        res.json(updatedListing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a listing by ID
router.delete('/:id', authenticateToken, adminCheck, async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) return res.status(404).send('Listing not found');
        res.send('Listing deleted successfully');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
