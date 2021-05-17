import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React from 'react'

function ShopItem () {
  return (
    <div className='justify-between mt-0 md:mt-2  border-b-2 container mx-auto p-3 pb-9 bg-white flex flex-row  place-items-center md:transform ease-in-out duration-500'>
      <div className='flex flex-col ml-1 md:ml-0  place-items-left'>
        <h1 className='md:mt-3 font-medium text-black-500 text-lg'>Item Name</h1>
        <p className='text-gray-500 text-md -mt-1'>Description</p>
        <p className='text-gray-600 text-md'>₹100</p>
      </div>
      <div className='flex flex-col relative'>
        <img alt='ItemImage' className='w-36 md:w-52 object-contain rounded-lg' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ddmtz9afhxwblftsjj3k' />
        <div className='absolute left-6 -bottom-6 md:left-14 bg-white w-24 h-10 items-center flex flex-row justify-between border border-gray-300 rounded-md'>
          <MinusIcon className='h-5 w-5  ml-2 text-gray-600' />
          <p className='text-gray-600 text-sm font-medium'>Add</p>
          <PlusIcon className='h-6 w-6 mr-2 text-gray-600' />
        </div>
      </div>
    </div>
  )
}

export default ShopItem
