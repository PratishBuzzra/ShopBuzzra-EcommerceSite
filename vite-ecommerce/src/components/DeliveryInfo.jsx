import React from 'react'

const DeliveryInfo = ({ deliveryData, setDeliveryData }) => {
  const handleChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex flex-col gap-4 w-full max-w-[480px]'>
      <div className='text-2xl my-3'>
        <h2>Delivery Information</h2>
      </div>
      <form className='space-y-4'>
        <input
          name="fullName"
          type="text"
          value={deliveryData.fullName || ''}
          className='border w-full rounded py-2 px-4'
          placeholder='Full Name'
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          value={deliveryData.email || ''}
          className='border w-full rounded py-2 px-4'
          placeholder='Email address'
          onChange={handleChange}
        />
        <div className='flex gap-3'>
          <input
            name="district"
            type="text"
            value={deliveryData.district || ''}
            className='border w-full rounded py-2 px-4'
            placeholder='District'
            onChange={handleChange}
          />
          <input
            name="province"
            type="text"
            value={deliveryData.province || ''}
            className='border w-full rounded py-2 px-4'
            placeholder='Province'
            onChange={handleChange}
          />
        </div>
        <input
          name="address"
          type="text"
          value={deliveryData.address || ''}
          className='border w-full rounded py-2 px-4'
          placeholder='Address'
          onChange={handleChange}
        />
        <input
          name="phone"
          type="text"
          value={deliveryData.phone || ''}
          className='border w-full py-2 px-4'
          placeholder='Phone'
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default DeliveryInfo
