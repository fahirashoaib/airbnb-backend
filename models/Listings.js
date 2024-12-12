// models/listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    imageUrl: [{ type: String }]
});

const Listing = mongoose.model('Listing', listingSchema,'Listings');

module.exports = Listing;
