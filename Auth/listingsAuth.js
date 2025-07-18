// Auth/listingsAuth.js
const Listing = require('../models/Listings');

// Get all listings
exports.getListings = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const listings = await Listing.find().limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await Listing.countDocuments();
        res.json({ listings, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single listing by ID
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findOne({id:req.params.id });
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add a new listing (Admin only)
exports.createListing = async (req, res) => {

    try {
        const { id, title, location, availability, pricePerNight, imageUrl } = req.body;

        // Ensure `imageUrls` is an array
        if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
            return res.status(400).json({ message: 'imageUrls must be a non-empty array' });
        }

        const newListing = new Listing({ id, title, location, availability, pricePerNight, imageUrl });
        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        console.error(err.message); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
    //res.send('Listing created successfully!');
};

// Update a listing by ID (Admin only)
exports.updateListing = async (req, res) => {
    try {
        const {title, location, availability, pricePerNight, imageUrl } = req.body;

        // Ensure `imageUrls` is an array
        if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
            return res.status(400).json({ message: 'imageUrls must be a non-empty array' });
        }

        const listing = await Listing.findByIdAndUpdate(
            req.params.id ,
            { title, location, availability, pricePerNight, imageUrl },
            { new: true, runValidators: true }
        );

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a listing by ID (Admin only)
exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findOneAndDelete({ id: req.params.id });
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
