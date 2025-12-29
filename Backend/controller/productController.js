const productModel = require('../models/Product')
const uploadToCloudinary = require('../helpers/cloudinaryhelpers')
const fs = require('fs')

const getAllProducts = async (req, res)=>{
    try {
        const allProducts = await productModel.find({})

        if(allProducts){
            res.status(200).json({
                success: true,
                message: 'All productt fetched successfully',
                products: allProducts
            })
        }else{
            res.status(404).json({
                success: false,
                message: "product not found in collection"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured please try again'
        })
        
    }

}



const addProduct = async (req, res)=>{
    try {
        const { title, description, price, category} = req.body

         if (!title || !description || !price || !category || !req.file) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    //upload img file from disk
    const result = await uploadToCloudinary(req.file.path)


        const newProduct = new productModel({title, description, price, category: category.trim().toLowerCase(), image: result.url})
        await newProduct.save()

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            newProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured please try again'
        })
        
        
    }

}

const updateProduct = async (req, res)=>{
    try {
        const { title, description, price, category} = req.body;

       const getCurrentProductId = req.params.id
       const numericPrice = Number(price);
       
       const updateData = {
        title,
        description,
        price: numericPrice,
        category: category
       }

       if(req.file){
        const result = await uploadToCloudinary(req.file.path)
        updateData.image = result.url
       }

       const updatedProduct = await productModel.findByIdAndUpdate(
        getCurrentProductId,
        updateData,
        {new: true}
       )
       if(!updatedProduct){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
       }
       res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct
       })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
        
    }

}

const deleteProduct = async (req, res)=>{
    try {
        const getCurrentProductID = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(getCurrentProductID)

        if(!deletedProduct){
            return res.status(404).json({
                success: false,
                message: 'Product with current id is not found try with different id'
            })

        }else{
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
                data: deletedProduct
            })
        }
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some eroor occured please try again'
        })
        
        
    }
    
}


module.exports = {getAllProducts, addProduct, updateProduct, deleteProduct}