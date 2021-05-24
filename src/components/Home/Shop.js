import { StarIcon } from '@heroicons/react/solid'
import React from 'react'
import { Link } from 'react-router-dom'

function Shop ({ id, name, address, phone_number }) {
  return (
    <Link className=' mt-0 md:mt-5 lg:w-64  container mx-auto p-4 bg-white rounded-xl border hover:border-gray-300  flex flex-row md:flex-col  place-items-center md:transform hover:scale-105 ease-in-out duration-500' to='/shop-view'>
      <img alt='ShopImage' className='w-28 md:w-60 object-contain' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/rsqfmdbnv3w2zf5g7qdn' />
      <div className='w-full flex flex-col ml-4 md:ml-0  place-items-left'>
        <h1 className='md:mt-3 font-medium text-black-500 text-lg'>{name}</h1>
        <p className='text-gray-500 text-md -mt-1'>{address}</p>
        <div className='flex items-center bg-yellow-400 w-10 pl-1 pr-1 mt-3.5'>
          <StarIcon className='h-4 w-4 text-white ' />
          <p className='text-white text-sm'>3.6</p>
        </div>
      </div>
    </Link>
  )
}

export default Shop
