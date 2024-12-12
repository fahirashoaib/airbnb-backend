// routes/listings.js
const express = require('express');
const Listing = require('../models/Listings');

const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
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

module.exports = router;
