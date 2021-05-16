import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

function ShopSearch () {
  return (
    <div>
      <div className='pl-5 pr-5 fixed top-0 z-10 bg-white w-full h-14 shadow-lg '>
        <div className='h-full items-center flex flex-row justify-between'>
          <Link to='/shop-view'>
            <ArrowLeftIcon className='h-6 w-6 text-gray-500 ' />
          </Link>
          <input className='align-middle pl-5   text-md  items-center w-full focus:outline-none ' type='text' placeholder='Search In {ShopName}' />
          <SearchIcon className='h-7 w-7 text-gray-500 ' />
        </div>
      </div>
    </div>
  )
}

export default ShopSearch
