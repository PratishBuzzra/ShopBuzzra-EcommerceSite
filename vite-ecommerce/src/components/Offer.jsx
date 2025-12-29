import React from 'react'
import bannerImg from '../assets/HeroBanner/B2.jpg';

const Offer = () => {
  return (
    <div className=' items-center mx-auto mt-12 mb-12 px-5 grid grid-cols-2 gap-10 '>
      <div className='px-16'>
        <h2 className='text-5xl font-semibold'>SUMMER COLLECTION <br /> 20% OFF SALE</h2>
        <p className='text-2xl mt-3'>Exclusive, one-time offer</p>
        <button className='bg-blue-600 px-2 py-3 rounded text-white text-lg font-semibold mt-3'>SHOP NOW</button>
      </div>
      
        <img src={bannerImg} alt="img" className='w-full max-w-[800px] mx-auto rounded-lg shadow-lg object-cover'/>
      
    </div>
  )
}

export default Offer
