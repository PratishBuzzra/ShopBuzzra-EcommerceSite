const express = require('express')
const {getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controller/productController')
const upload = require('../middlewares/uploadMiddleware')
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')
const multer = require('multer')
const router = express.Router()



router.get('/getproduct', getAllProducts)

router.post('/addproduct',requireSignIn,isAdmin, upload.single('image') ,addProduct)
router.put('/updateproduct/:id',requireSignIn, isAdmin, upload.single('image') ,updateProduct)
router.delete('/deleteproduct/:id',requireSignIn, isAdmin, deleteProduct)








module.exports = router