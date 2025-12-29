const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productModel',
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
})

module.exports = mongoose.model('cartModel', cartSchema)