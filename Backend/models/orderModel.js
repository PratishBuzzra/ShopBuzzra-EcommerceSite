const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'productModel' },
      qty: Number,
      price: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'esewa' },
  transactionId: { type: String, required: true, unique: true },
  paymentStatus: { type: String, enum: ['pending','paid'], default: 'pending' },
  status: { type: String, enum: ['created','paid and processing','shipping','delivered'], default: 'created' },
  deliveryInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    district: String,
    province: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('orderModel', orderSchema);
