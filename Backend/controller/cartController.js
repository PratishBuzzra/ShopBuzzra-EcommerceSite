const cartModel = require('../models/CartModel')


const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.user._id })
      .populate('items.productId'); 

    res.status(200).json({
      success: true,
      cart: cart || { userId: req.user._id, items: [] }
    });
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({
      success: false,
      message: 'error fetching cart'
    });
  }
};
const updateCart = async (req, res) => {
    const { items } = req.body;
    try {
        let cart = await cartModel.findOne({ userId: req.user._id }); 

        if (!cart) {
            cart = new cartModel({ userId: req.user._id, items });
        } else {
            cart.items = items;
        }
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cart'
        });
    }
};


const clearCart = async (req, res)=>{
    try {
        await cartModel.deleteOne({userId: req.user._id})
        res.status(200).json({
            success: true,
            message: 'cart cleared'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error clearing cart'
        })
    }

}

module.exports = {getCart, updateCart, clearCart}