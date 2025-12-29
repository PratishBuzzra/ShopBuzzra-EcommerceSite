const orderModel = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');
const productModel = require('../models/Product')

// Create order
const createOrder = async (req, res) => {
  try {
    const { products, deliveryInfo, totalAmount, paymentMethod } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    if (!deliveryInfo?.fullName || !deliveryInfo?.address)
      return res.status(400).json({ success: false, message: 'Delivery info incomplete' });
    if (!totalAmount || totalAmount <= 0)
      return res.status(400).json({ success: false, message: 'Invalid total amount' });

    const transactionId = uuidv4();

    // Fetch product details from DB
    const detailedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error('Product not found');
        return {
          productId: product._id,
          price: product.price,
          qty: item.qty,
        };
      })
    );

    const order = await orderModel.create({
      userId: req.user._id,
      products: detailedProducts,
      deliveryInfo,
      totalAmount,
      paymentMethod,
      transactionId,
      paymentStatus: 'pending',
      status: 'created',
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

// Verify eSewa payment

const verifyEsewaPayment = async (req, res) => {
  try {
    const { transactionId, totalAmount } = req.body;

    if (!transactionId || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Transaction data missing' });
    }

    const order = await orderModel.findOne({ transactionId });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.paymentStatus === 'paid') {
      return res.json({ success: true, message: 'Already paid', order });
    }

    const url = `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${totalAmount}&transaction_uuid=${transactionId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'COMPLETE') {
      order.paymentStatus = 'paid';
      order.status = 'paid and processing';
      await order.save();
      return res.json({ success: true, message: 'Payment verified', order });
    } else {
      return res.status(400).json({ success: false, message: `Payment not verified: ${data.status}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};


// Get user orders
const getOrders = async (req, res) => {
  try {
    // populate productId to get product details
    const orders = await orderModel
      .find({ userId: req.user._id })
      .populate('products.productId', 'title price'); // select only name and price

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

module.exports = { createOrder, verifyEsewaPayment, getOrders };
