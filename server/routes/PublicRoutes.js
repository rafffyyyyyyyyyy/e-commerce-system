const express = require('express');
const { getCategory, getProduct } = require('../controllers/PublicController');
const router = express.Router();

router.get('/get-category', getCategory);
router.get('/fetch-products', getProduct);

module.exports = router;