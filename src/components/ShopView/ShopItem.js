import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React from 'react'

function ShopItem ({ cost, inCart, loading, name }) {
  return (
    <div className={`justify-between mt-0 pt-2 pb-1 md:p-3 ${!inCart && 'border-b-2 pb-9 md:pb-9 md:mt-2  p-3'} container mx-auto  bg-white flex flex-row  place-items-center md:transform ease-in-out duration-500`}>
      <div className='flex flex-col ml-1 md:ml-0  place-items-left'>
        <h1 className={`${!loading && 'md:mt-3 font-semibold text-black-500 text-md md:text-lg'} ${loading && 'md:mt-3 h-6 w-36 md:w-64 bg-gray-200 animate-pulse rounded-sm'} ${!inCart && 'text-lg'} `}>{loading ? null : name}</h1>
        <p className={`${!loading && 'text-gray-500 text-sm -mt-1'} ${loading && 'mt-1 h-4 w-24 md:w-40 bg-gray-200 animate-pulse rounded-sm'}`}>{loading ? null : 'Description'}</p>
        <p className={`${!loading && 'text-gray-600 text-md'} ${loading && 'mt-2 h-6 w-16 md:w-20 bg-gray-200 animate-pulse rounded-sm'} ${inCart && 'hidden'}`}>{loading ? null : '₹' + cost}</p>
      </div>
      <div className={`${!inCart && 'flex flex-col relative'} ${inCart && 'flex flex-row'}`}>
        <div className={`w-36 md:w-52 h-24  md:h-32 rounded-lg bg-gray-200 animate-pulse rounded-sm ${!loading && 'hidden'}`} />
        <img alt='ItemImage' className={`w-36 md:w-52 object-contain rounded-lg ${inCart && 'hidden'} ${loading && 'hidden'}`} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ddmtz9afhxwblftsjj3k' />
        <div className={`${!inCart && 'absolute left-7 -bottom-4'} ${!loading && 'md:left-12 md:-bottom-6 bg-white w-22 h-8 md:w-28 md:h-12 items-center flex flex-row justify-between border border-gray-300 rounded-md'} ${loading && 'left-8 md:left-12 md:-bottom-6 w-20 h-8 md:w-28 md:h-12 border border-gray-300 rounded-md bg-gray-100'} `}>
          <MinusIcon className={`h-5 w-5  ml-2 text-gray-600 ${loading && 'hidden'}`} />
          <p className='text-gray-600 text-sm font-medium'> {loading ? null : 'Add'}</p>
          <PlusIcon className={`h-6 w-6 mr-2 text-gray-600 ${loading && 'hidden'}`} />
        </div>
        <p className={`text-gray-600 text-md ml-10 mr-1 mt-auto mb-auto ${!inCart && 'hidden'}`}>₹100</p>
      </div>

    </div>
  )
}

export default ShopItem
