const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('productModel', productSchema)