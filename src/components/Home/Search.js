import { SearchIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../Layouts/BottomNav'
import Header from '../Layouts/Header'

function Search () {
  return (
    <div>
      <div className='mob:hidden'>
        <Header />
      </div>
      <div className='pl-2 pr-2 pt-4 md:pl-6 md:pr-6 md:pt-10'>
        <div className='flex justify-between w-11/12 max-w-4xl m-auto items-center relative md:mt-20'>
          <input className='pl-10 md:pl-16 pr-6 h-10 md:h-16 md:mr-12 md:text-2xl items-center w-full  rounded-lg shadow-md border border-gray-300 focus:outline-none ' type='text' placeholder='Search For Shops Or Items' />
          <SearchIcon className='absolute left-3 md:left-6 md:top-6 h-5 w-5 md:h-7 md:w-7 text-gray-500 group-hover:text-yellow-400  ' />
          <Link to='/'>
            <div className='mob:hidden items-center'>
              <XIcon className='h-6 w-6 md:h-12 md:w-12 text-gray-500' />
              <p className='text-sm md:text-lg text-center text-gray-500'>ESC</p>
            </div>
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Search
