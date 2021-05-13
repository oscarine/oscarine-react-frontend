import { LightBulbIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

function BottomNav () {
  return (
    <div className='md:hidden h-14 fixed bottom-0 w-full justify-between flex flex-row bg-white shadow-inner'>
      <Link to='/home'>
        <div className='ml-3 group flex flex-col items-center pt-2 '>
          <LightBulbIcon className='h-5 w-5 text-gray-500 group-hover:text-yellow-400  ' />
          <p className='font-medium text-gray-500 text-sm group-hover:text-yellow-400'>NEAR ME</p>
        </div>
      </Link>
      <Link to='/search'>
        <div className='group flex flex-col items-center pt-2 '>
          <SearchIcon className='h-5 w-5 text-gray-500 group-hover:text-yellow-400  ' />
          <p className='font-medium text-gray-500 text-sm group-hover:text-yellow-400'>EXPLORE</p>
        </div>
      </Link>
      <div className='group flex flex-col items-center pt-2 '>
        <ShoppingBagIcon className='h-5 w-5 text-gray-500 group-hover:text-yellow-400  ' />
        <p className=' font-medium text-gray-500 text-sm group-hover:text-yellow-400'>CART</p>
      </div>
      <div className='mr-3 group flex flex-col items-center pt-2 '>
        <UserIcon className='h-5 w-5 text-gray-500 group-hover:text-yellow-400  ' />
        <p className='font-medium text-gray-500 text-sm group-hover:text-yellow-400'>ACCOUNT</p>
      </div>
    </div>
  )
}

export default BottomNav
