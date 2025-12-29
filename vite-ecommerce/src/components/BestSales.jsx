import React from 'react'
import bannerImg from '../assets/HeroBanner/B2.jpg';
import { IoCartSharp } from "react-icons/io5";
const BestSales = () => {
  const products = [
  {
    id: 1,
    image: bannerImg,
    title: "Jeans Shirt",
    price: 78,
    description: "Stylish denim shirt perfect for casual outings.",
  },
  {
    id: 2,
    image: bannerImg,
    title: "Pants",
    price: 78,
    description: "Comfortable and trendy pants for everyday wear.",
  },
  {
    id: 3,
    image: bannerImg,

    title: "Plain shirts",
    price: 78,
    description: "Simple plain shirt suitable for any occasion.",
  },
  {
    id: 4,
    image: bannerImg,
    title: "Flower Shirts",
    price: 78,
    description: "Floral print shirt for a vibrant summer look.",
  },
  {
    id: 5,
    image: bannerImg,

    title: "Jeans Shirt",
    price: 78,
    description: "Stylish denim shirt perfect for casual outings.",
  },
  {
    id: 6,
    image: bannerImg,
 
    title: "Pants",
    price: 78,
    description: "Comfortable and trendy pants for everyday wear.",
  },
  {
    id: 7,
    image: bannerImg,
 
    title: "Plain shirts",
    price: 78,
    description: "Simple plain shirt suitable for any occasion.",
  },
  {
    id: 8,
    image: bannerImg,
   
    title: "Flower Shirts",
    price: 78,
    description: "Floral print shirt for a vibrant summer look.",
  },
];
  return (
 <div className='py-10 px-6'>
    <h2 className='text-center text-3xl font-bold mb-2'>Top Selling Products</h2>
    <p className='text-center text-xl text-gray-600 mb-7'>Top Selling Products For You</p>
    <div className='grid grid-cols-4 gap-7'>
      {products.map((product)=>(
        <div key={product.id} className='bg-white p-5 rounded shadow-lg'>
          <img src={product.image} alt="img" className='w-full h-64 object-cover rounded'/>
          <div className='flex flex-col mt-4'>
            <h5 className='text-xl font-semibold mt-1'>{product.title}</h5>
            <p className='text-lg/5 text-gray-600 mt-1'>{product.description}</p>
            <div className='flex justify-between items-center mt-2'>
              <p className='text-xl font-bold'>{product.price}</p>
          
            </div>
          </div>

        </div>
      ))}

    </div>
 </div>
  )
}

export default BestSales
