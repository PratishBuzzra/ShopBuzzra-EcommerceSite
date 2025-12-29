import React, { useContext } from 'react'
import { IoCartSharp } from "react-icons/io5";
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({product}) => {
  const {dispatch} = useContext(CartContext)
  const {isLoggedIn} = useContext(AuthContext)
   const navigate = useNavigate()
 const handleAddToCart = ()=>{
  if(!isLoggedIn){
    alert("please login to add item to cart")
    navigate('/login')
    return
  }



 dispatch({type: 'ADD_TO_CART',payload: product})
 }
  
     
  return (
    <div className='bg-white p-5 shadow-lg rounded'>
        <img src={product.image} alt="img" className='w-full h-64 object-cover rounded'/>
        <div className='flex flex-col mt-4'>
            <h5 className='text-xl font-semibold mt-1'>{product.title}</h5>
            <p className='text-lg/5 text-gray-600 mt-1'>{product.description}</p>
            <div className='flex justify-between items-center mt-2'>
                <p className='text-xl font-bold'>Rs. {product.price}</p>
                <button onClick={handleAddToCart } className='bg-blue-600  text-white w-12 h-12 text-2xl flex items-center justify-center rounded-full'><IoCartSharp /></button>

            </div>

        </div>
      
    </div>
  )
}

export default ProductCard
