const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID', shopController.getProduct)

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart)

// router.get('/orders', shopController.getOrders);

// router.post('/cart-delete-item', shopController.postCartDeleteItem)

// router.post('/orders', shopController.postOrders);

module.exports = router;
