import React from 'react'
import ConstantHero from '../components/ConstantHero'
import bannerImg from '../assets/HeroBanner/B2.jpg';
const Contact = () => {
  return (
    <div className='pb-12 bg-blue-50'>
       <ConstantHero 
      cName= "relative w-full h-[50vh] overflow-hidden"
      imgSrc={bannerImg}
      imgcName = "w-full h-screen object-cover "
      heroDesc= "absolute inset-0 bg-black/40 flex flex-col justify-center text-center items-center mt-16"
      heroTitle= "Get in Touch"
      heroText= {
        <>
       We’re here to help. <br /> Reach out with any questions or feedback.
        </>
      }
     heroBtncName="hidden"
    />
    <div className='flex flex-col text-center items-center justify-center mt-12 mb-12 px-4'>
      <h2 className='text-3xl font-bold text-center mb-2'>Contact Us</h2>
      <p className='text-center text-xl text-gray-600 mb-7'>Have a question or need support?</p>
      <div>
        <p className='text-lg pb-2'><span className='text-xl font-bold'>Address: </span>ShopBuzzra, Nayabazar, Kathmandu</p>
        <p className='text-lg pb-2'><span className='text-xl font-bold'>Email: </span>info@shopBuzzra.com</p>
        <p className='text-lg pb-2'><span className='text-xl font-bold'>Phone: </span>+977 97654545486</p>
      </div>

    </div>
    <div className='bg-white p-8 max-w-2xl mx-auto rounded shadow-md'>
        <h3 className='text-xl mb-6 font-semibold'>Send Us a Message</h3>
      <form action="" className='space-y-5'>
         <input type="text" name='name' placeholder='Your name' className='w-full p-3 border border-gray-300 rounded-md'/>
      <input type="email" name='email' placeholder='Your email' className='w-full p-3 border border-gray-300 rounded-md'/>
      <textarea name="message" placeholder='Your message' row="5" className='w-full p-3 border border-gray-300 rounded-md'></textarea>
      <button type='submit' className='bg-blue-600 w-full py-3 rounded-md text-white'>Send Message</button>


      </form>
     
    </div>
    </div>
  )
}

export default Contact
