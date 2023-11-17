const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const { addCategory, fetchCategory, deleteCategory, editCategory, fetchUsers, editUser, deleteUser, addProduct, fetchProduct, editProduct, deleteProduct, getUserOrders, getAllOrders, changeOrderStatus, fetchSettings, updateSettings } = require('../controllers/AdminController');

const router = express.Router();

// auto image upload
const productImageUpload = multer({
    dest: 'assets/product image/',
});

const settingsImage = multer({
    dest: 'assets/settings image/',
});

router.post('/add-category', verifyToken, addCategory);
router.post('/update-settings', settingsImage.single('image'), verifyToken, updateSettings);
router.get('/fetch-settings', fetchSettings);
router.get('/fetch-category', verifyToken, fetchCategory);
router.post('/delete-category', verifyToken, deleteCategory);
router.post('/edit-category', verifyToken, editCategory);
router.get('/fetch-users', verifyToken, fetchUsers);
router.post('/edit-user', verifyToken, editUser);
router.post('/delete-user', verifyToken, deleteUser);
router.get('/fetch-product', verifyToken, fetchProduct);
router.post('/delete-product', verifyToken, deleteProduct);
router.post('/change-order-status', verifyToken, changeOrderStatus);
router.get('/get-orders', verifyToken, getUserOrders);
router.post('/add-product', productImageUpload.single('productImage'), verifyToken, addProduct);
router.post('/edit-product', productImageUpload.single('productImage'), verifyToken, editProduct);

module.exports = router;

