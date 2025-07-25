// models/Listings.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    imageUrl: { type: [String], required: true }
},
    {
        collection: 'listings'
    }
);

//properties
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
