import React from 'react'
import bannerImg from '../assets/HeroBanner/B2.jpg';
const Services = () => {
    const services = [
        {
        id: 1,
        serviceTitle: "Frequently Asked  Questions",
        seviceText: "Find answers to common questions about our products and policies.",
        image: bannerImg
        },
        {
        id: 2,
        serviceTitle: "Online Payment Process",
        seviceText: "Secure and easy payment options for a smooth checkout experience.",
        image: bannerImg
        },
        {
        id: 3,
        serviceTitle: "Home Delivery Options",
        seviceText: "Fast and reliable delivery straight to your doorstep.",
        image: bannerImg
        }
]
  return (
    <div className='py-8 px-6'>
        <h2 className='text-center text-3xl font-bold mb-2'>Services To Help You Shop</h2>
        <p className='text-center text-xl text-gray-600 mb-8'>Helpful services designed to make your shopping easy and worry-free.</p>
       
            <div className='grid grid-cols-3 gap-7'>
                {services.map((service)=>{
                  
                   return ( <div key={service.id} className='bg-white rounded-xl shadow-lg'>
                        <div className='flex flex-col px-10 py-10'>
                            <h5 className='text-2xl/8 font-bold mb-8'>{service.serviceTitle.split(' ').slice(0, -1).join(' ')} <br /> {service.serviceTitle.split(' ').slice(-1)}</h5>
                            <p className='text-lg/6 text-gray-600 font-semibold'>{service.seviceText}</p>
                        </div>

                        <img src={bannerImg} alt="" className='w-full h-75 object-cover rounded-b-xl'/>

                    </div>
)})}


            
        </div>
      
    </div>
  )
}

export default Services
