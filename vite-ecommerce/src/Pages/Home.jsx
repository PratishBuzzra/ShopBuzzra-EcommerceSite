import React from 'react'
import ConstantHero from '../components/ConstantHero'
import bannerImg from '../assets/HeroBanner/B2.jpg';
import BestSales from '../components/BestSales';
import Offer from '../components/Offer';
import Services from '../components/Services';

const Home = () => {
  return (
    <div className='bg-blue-50'>
    <ConstantHero 
      cName= "relative w-full h-[90vh] overflow-hidden"
      imgSrc={bannerImg}
      imgcName = "w-full h-screen object-cover"
      heroDesc = "absolute inset-0 bg-black/40 flex flex-col justify-center text-center items-center px-4"
      heroTitle= "Style That Speaks"
      heroText= {
        <>
        Discover fashion that fits your vibe. <br/>
        Trendy, timeless, and totally you — shop the latest looks now.
        </>
      }
        
      heroBtnText= "Shop Now"
      heroBtncName= "text-white bg-blue-600 px-3 py-2 rounded text-2xl font-semibold"
    />
    <BestSales/>
    <Offer />
    <Services />
    </div>
  )
}

export default Home
