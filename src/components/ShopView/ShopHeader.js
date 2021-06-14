import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ShopHeader ({ inCart, shopName, show }) {
  return (
    <div className={`md:hidden pl-5 pr-5 fixed top-0 z-10 bg-white w-full h-14 ${show && 'mob:shadow-lg'}`}>
      <div className='h-full items-center flex flex-row justify-between'>
        <Link to='/'>
          <ArrowLeftIcon className='h-6 w-6 text-gray-500 ' />
        </Link>
        <p className={`ml-4 text-gray-600 font-semibold text-black-500 text-lg text-left w-full ease-in-out duration-500 ${!show && 'hidden'}`}>{shopName}</p>
        <Link to='/shop-search'>
          <SearchIcon className={`h-6 w-6 text-gray-500  ${inCart && 'hidden'}`} />
        </Link>
      </div>
    </div>
  )
}

ShopHeader.propTypes = {
  inCart: PropTypes.bool,
  shopName: PropTypes.string,
  show: PropTypes.bool
}

ShopHeader.defaultProps = {
  inCart: false,
  shopName: null,
  show: false
}

export default ShopHeader
