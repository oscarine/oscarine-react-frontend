import { StarIcon } from '@heroicons/react/solid'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Shop ({ address, id, loading, name }) {
  const linkDisableHandler = useCallback(
    (event) => {
      if (loading) {
        event.preventDefault()
      }
    },
    [loading]
  )

  return (
    <Link className={`mt-0 md:mt-5 lg:w-64  container mx-auto p-4 bg-white rounded-md md:rounded-lg border ${!loading && 'hover:border-gray-300'}  flex flex-row md:flex-col  place-items-center md:transform ${!loading && 'hover:scale-105'} ease-in-out duration-500`} onClick={linkDisableHandler} to={`/shop/${id}/${name.toLowerCase().split(' ').join('-')}`}>
      <img alt='ShopImage' className={`w-28 md:w-60 object-contain ${loading && 'hidden'}`} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/rsqfmdbnv3w2zf5g7qdn' />
      <div className={`w-44 h-20 md:w-56 md:h-32 bg-gray-200 animate-pulse rounded-sm ${!loading && 'hidden'}`} />
      <div className='w-full flex flex-col ml-4 md:ml-0  place-items-left'>
        <h1 className={`${!loading && 'md:mt-3 font-medium text-black-500 text-lg'} ${loading && 'md:mt-5 h-6 w-36 bg-gray-200 animate-pulse rounded-sm'}`}>{loading ? null : name}</h1>
        <p className={`${!loading && 'text-gray-500 text-md -mt-1'} ${loading && 'mt-1 h-4 w-24 bg-gray-200 animate-pulse rounded-sm'}`}>{loading ? null : address}</p>
        <div className={`${!loading && 'flex items-center bg-yellow-400 w-10 pl-1 pr-1 mt-3.5'} ${loading && 'mt-3.5 h-4 w-8 bg-gray-200 animate-pulse'}`}>
          <StarIcon className={`h-4 w-4 text-white ${loading && 'hidden'}`} />
          <p className={`text-white text-sm ${loading && 'hidden'}`}>3.6</p>
        </div>
      </div>
    </Link>
  )
}

Shop.propTypes = {
  address: PropTypes.string,
  id: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string
}

Shop.defaultProps = {
  address: '',
  name: ''
}

export default Shop
