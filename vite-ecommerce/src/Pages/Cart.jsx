import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../Context/authContext'

const Cart = () => {
  const {cart, dispatch, totalItems, totalPrice} = useContext(CartContext)
  const { isLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen py-10 px-4 bg-blue-50 mt-18'>
      <div className='max-w-5xl mx-auto bg-white shadow-md rounded-md p-6'>
        <h2 className='text-2xl text-center font-bold mb-6'>Shopping cart</h2>
        {cart.length === 0 ? (
          <p className='text-lg text-gray-500 text-center'>You cart is emptyy</p>
        ): (
         <>
          <div className='grid grid-cols-3 gap-6 '>
            <div className='col-span-2 space-y-4'>
              {cart.map((product)=>(
                <div key={product._id} className='flex gap-4 p-4 bg-gray-50 item-center shadow-sm rounded-md'>
                  <img src={product.image} alt="img" className='w-30 h-30 object-cover rounded'/>
                  <div className='flex-1'>
                     <h3 className='font-semibold text-lg'>{product.title}</h3>
                     <p className='text-gray-500 text-sm'>{product.description}</p>
                     <p className='mt-1 font-bold'>Rs. {product.price}</p>
                    <div className='flex items-center mt-2 space-x-2'>
                      <button className='px-2 py-1 bg-gray-200 rounded' onClick={()=> {dispatch({type: 'Decrement', _id: product._id})}}>-</button>
                      <span className='px-4 py-1 bg-white border rounded'>{product.qty}</span>
                      <button className='px-2 py-1 bg-gray-200 rounded' onClick={()=> {dispatch({type: 'Increment', _id: product._id})}}>+</button>
                    </div>

                    <button className='bg-blue-600 mt-3 px-2 py-2 text-white rounded' onClick={()=> {dispatch({type: "Remove", _id: product._id})}}>Remove From Cart</button>


                    </div>  
                </div>

              ))}
            </div>
            <div className='bg-gray-50 shadow-md rounded-md p-4'>
              <h3 className='text-xl font-semibold mb-4'>Cart Summary</h3>
              <p className='mb-2'>Total Items: {totalItems}</p>
              <p className='mb-3'>Total Price: {totalPrice}</p>
              <button onClick={()=>navigate('/checkout')} className='bg-blue-600 text-white px-2 py-2 rounded w-full'>Checkout</button>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  )

}

export default Cart
