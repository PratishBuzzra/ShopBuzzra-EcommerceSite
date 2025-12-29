import React, { useContext } from 'react'
import {Link, NavLink} from "react-router-dom"

import { IoCartSharp } from "react-icons/io5";
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/authContext';



const Navbar = () => {
  const {cart} = useContext(CartContext)
  const {isLoggedIn, username, logout} = useContext(AuthContext)
  return (
    <div className='fixed top-0 left-0 w-full bg-white shadow-lg px-4 py-4 z-50'>
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <div className='flex items-center'>
               <Link to={"/"}><h1 className='text-3xl font-bold'>ShopBuzzra</h1></Link> 
            </div>
            <nav className='flex items-center gap-7'>
              <ul className='flex gap-6 text-xl font-semibold'>
                <NavLink to={"/"}>
                  <li>Home</li>
                </NavLink>
                 <NavLink to={"/about"}>
                  <li>About</li>
                </NavLink>
                 <NavLink to={"/shop"}>
                  <li>Shop</li>
                </NavLink>
                 <NavLink to={"/contact"}>
                  <li>Contact</li>
                </NavLink>
              </ul>

              <div className='flex items-center gap-7'>
               <Link to={"/cart"} className='relative inline-block'><IoCartSharp className='w-7 h-7'/>
             
                <span className='absolute bottom-3 left-5 text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center bg-blue-600'>{cart.length}</span>
               
               </Link> 

               {isLoggedIn ? (
                <div className='flex items-center gap-4'>
                  <span>LoggedIn as <span className='font-semibold'>{username}</span></span>
                  <button onClick={logout} className='bg-blue-600 px-3 py-1 text-white rounded cursor-pointer'>Logout</button>
                </div>
               ):(
                  <Link to={"/signup"}>
                <button className='bg-blue-600 px-3 py-1 text-white rounded cursor-pointer'>SignUp</button>
                </Link>
               )}
                
              </div>

            </nav>
        </div>
      
    </div>
  )
}

export default Navbar


