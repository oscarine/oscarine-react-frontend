import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

function ShopSearch () {
  return (
    <div className='pl-5 pr-5 mob:fixed top-0 z-10 bg-white max-w-lg m-auto w-full h-14 md:h-12 mob:shadow-lg items-center flex flex-row justify-between md:-mt-6 md:bg-gray-200 mob:hidden'>
      <Link to='/shop-view'>
        <ArrowLeftIcon className='h-6 w-6 text-gray-500 md:hidden' />
      </Link>
      <input className='align-middle pl-5   text-md  items-center w-full focus:outline-none md:bg-gray-200 ' placeholder='Search In {ShopName}' type='text' />
      <SearchIcon className='h-7 w-7 text-gray-500 ' />
    </div>
  )
}

export default ShopSearch
