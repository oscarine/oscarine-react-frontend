import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

function ShopHeader ({ show }) {
  return (
    <div className={`pl-5 pr-5 fixed top-0 z-10 bg-white w-full h-14 ${show && 'shadow-lg'}`}>
      <div className='h-full items-center flex flex-row justify-between'>
        <Link to='/'>
          <ArrowLeftIcon className='h-6 w-6 text-gray-500 ' />
        </Link>
        <p className={`ml-4 text-gray-600 font-medium text-black-500 text-lg text-left w-full ease-in-out duration-500 ${!show && 'hidden'}`}>Shop Name</p>
        <Link to='/shop-search'>
          <SearchIcon className='h-6 w-6 text-gray-500 ' />
        </Link>
      </div>
    </div>
  )
}

export default ShopHeader
