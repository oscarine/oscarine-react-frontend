import { LightBulbIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav () {
  return (
    <div className='md:hidden h-14 fixed bottom-0 w-full justify-between flex flex-row bg-white shadow-inner border-t-2 border-gray-200'>
      <NavLink activeClassName='text-yellow-400' className='text-gray-500' exact to='/'>
        <div className='ml-6 flex flex-col items-center pt-2'>
          <LightBulbIcon className='h-6 w-6  text-current' />
          <p className='font-medium text-current text-xs'>NEAR ME</p>
        </div>
      </NavLink>
      <NavLink activeClassName='text-yellow-400' className='text-gray-500' to='/search'>
        <div className='flex flex-col items-center pt-2 '>
          <SearchIcon className='h-6 w-6 text-current' />
          <p className='font-medium text-current text-xs'>SEARCH</p>
        </div>
      </NavLink>
      <NavLink activeClassName='text-yellow-400' className='text-gray-500' to='/cart'>
        <div className='flex flex-col items-center pt-2 '>
          <ShoppingBagIcon className='h-6 w-6 text-current ' />
          <p className='font-medium text-current text-xs'>CART</p>
        </div>
      </NavLink>
      <div className='mr-6 group flex flex-col items-center pt-2 '>
        <UserIcon className='h-6 w-6 text-gray-500 group-hover:text-yellow-400  ' />
        <p className='font-medium text-gray-500 text-xs group-hover:text-yellow-400'>ACCOUNT</p>
      </div>
    </div>
  )
}

export default BottomNav
