import React from 'react'
import ConstantHero from '../components/ConstantHero'
import bannerImg from '../assets/HeroBanner/B2.jpg';
import Services from '../components/Services';
const About = () => {
  return (
    <div className='bg-blue-50'>
   <ConstantHero 
      cName= "relative w-full h-[50vh] overflow-hidden"
      imgSrc={bannerImg}
      imgcName = "w-full h-screen object-cover "
      heroDesc= "absolute inset-0 bg-black/40 flex flex-col justify-center text-center items-center mt-16"
      heroTitle= "ABOUT US"
      heroText= {
        <>
       Discover the story behind ShopBuzzra and <br/> what makes us different
        </>
      }
     heroBtncName="hidden"
    />
    <div className='max-w-6xl mx-auto grid grid-cols-2 items-center gap-10 mt-12 mb-12 px-4'>
      <img src={bannerImg} alt="img" className='w-full max-w-[500px] rounded-lg shadow-2xl object-cover'/>
      <div>
        <h2 className='text-2xl font-semibold mb-4'> Welcome to our website</h2>
        <p className='mb-6 text-justify'>
           ShopBuzzra was born out of a passion for innovation and a mission to
            transform the online shopping experience. Our journey began with a
            simple yet powerful idea: to create a platform where customers can
            effortlessly discover, explore, and purchase a diverse range of
            products — all from the comfort of their own homes. Since day one,
            we’ve been committed to carefully curating a broad selection of
            high-quality items that meet the tastes and needs of every customer.
            Whether it’s fashion and accessories, electronics, home goods, or
            beauty products, ShopBuzzra offers an extensive collection sourced
            from trusted brands and suppliers, ensuring both quality and variety
            with every purchase.
        </p>
        <a href="#" className='bg-blue-600 px-3 py-3 rounded text-white font-semibold'>Read More</a>

      </div>

    </div>
    <Services />
    </div>
  )
}

export default About
