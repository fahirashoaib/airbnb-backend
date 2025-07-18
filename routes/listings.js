// routes/listings.js

const express = require('express');
const router = express.Router();
const { adminAuth } = require("../middleware/auth")
const { getListings, getListingById, createListing, updateListing, deleteListing } = require("../Auth/listingsAuth")

router.route("/listings").get(getListings)
router.route("/listings/:id").get(getListingById)
router.route("/listings").post(adminAuth, createListing)
router.route("/listings/:id").put( adminAuth, updateListing)
router.route("/listings/:id").delete(adminAuth, deleteListing)

module.exports = router;