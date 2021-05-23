import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React from 'react'

function ShopItem ({ inCart }) {
  return (
    <div className={`justify-between mt-0 pt-2 pb-1 md:p-3 ${!inCart && 'border-b-2 pb-9 md:pb-9 md:mt-2  p-3'} container mx-auto  bg-white flex flex-row  place-items-center md:transform ease-in-out duration-500`}>
      <div className='flex flex-col ml-1 md:ml-0  place-items-left'>
        <h1 className={`md:mt-3 font-medium text-black-500 text-md md:text-lg ${!inCart && 'text-lg'}`}>Item Name</h1>
        <p className='text-gray-500 text-sm -mt-1'>Description</p>
        <p className={`text-gray-600 text-md ${inCart && 'hidden'}`}>₹100</p>
      </div>
      <div className={`${!inCart && 'flex flex-col relative'} ${inCart && 'flex flex-row'}`}>
        <img alt='ItemImage' className={`w-36 md:w-52 object-contain rounded-lg ${inCart && 'hidden'}`} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ddmtz9afhxwblftsjj3k' />
        <div className={`${!inCart && 'absolute left-7 -bottom-4'} md:left-12 md:-bottom-6 bg-white w-22 h-8 md:w-28 md:h-12 items-center flex flex-row justify-between border border-gray-300 rounded-md `}>
          <MinusIcon className='h-5 w-5  ml-2 text-gray-600' />
          <p className='text-gray-600 text-sm font-medium'>Add</p>
          <PlusIcon className='h-6 w-6 mr-2 text-gray-600' />
        </div>
        <p className={`text-gray-600 text-md ml-10 mr-1 mt-auto mb-auto ${!inCart && 'hidden'}`}>₹100</p>
      </div>

    </div>
  )
}

export default ShopItem
