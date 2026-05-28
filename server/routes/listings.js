const express = require('express');
const router = express.Router();
const { getListings, getListing, createListing, deleteListing } = require('../controllers/listingController');
const auth = require('../middleware/auth');

router.get('/', getListings);
router.get('/:id', getListing);
router.post('/', auth, createListing);
router.delete('/:id', auth, deleteListing);

module.exports = router;