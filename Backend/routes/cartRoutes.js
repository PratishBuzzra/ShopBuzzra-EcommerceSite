const express = require('express')
const {getCart, updateCart, clearCart} = require('../controller/cartController')
const {requireSignIn} = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/getcart',requireSignIn ,getCart)
router.post('/updatecart',requireSignIn ,updateCart)
router.delete('/clearcart',requireSignIn, clearCart)


module.exports = router