const express = require('express');
const { requireSignIn } = require('../middlewares/authMiddleware');
const { createOrder, getOrders, verifyEsewaPayment } = require('../controller/orderController');

const router = express.Router();


router.post('/createorder', requireSignIn, createOrder);



router.post('/payment-success', requireSignIn, verifyEsewaPayment);


router.get('/getorders', requireSignIn, getOrders);

module.exports = router;
