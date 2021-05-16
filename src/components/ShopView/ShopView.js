import { StarIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import ShopItem from '../ShopView/ShopItem'
import Header from '../Layouts/Header'
import ShopHeader from './ShopHeader'

function ShopView () {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 160) {
        handleShow(true)
      } else {
        handleShow(false)
      }
    })
    return () => {
      window.removeEventListener('scroll', window)
    }
  }, [])

  return (
    <div className=''>
      <div className='mob:hidden'>
        <Header />
      </div>
      <div className='md:hidden'>
        <ShopHeader show={show} />
      </div>
      <div className='mt-16 md:mt-36 text-center pl-4 pr-4 mob:shadow-lg'>
        <h1 className='font-medium text-black-500 text-xl'>Shop Name</h1>
        <p className='text-gray-500 text-md -mt-1 mb-5'>Description</p>
        <hr className='max-w-4xl m-auto border-dashed' />
        <div className='max-w-4xl m-auto flex flex-row justify-between p-5'>
          <div className='flex flex-col pr-3'>
            <div className='flex items-center'>
              <StarIcon className='h-4 w-4 pt-0.5 text-gray-600 ' />
              <p className='text-gray-600 font-medium text-md'>3.6</p>
            </div>
            <p className='text-gray-500 text-xs'>20+ Ratings</p>
          </div>
          <div className='flex flex-col pr-3'>
            <h3 className='text-green-500 font-medium text-md '>Open</h3>
            <p className='text-gray-500 text-xs'>For Delivery</p>
          </div>
        </div>
      </div>
      <div className='z-0 mt-2 mb-16 max-w-4xl m-auto p-2  grid gap-3 grid-cols-1 place-items-center'>
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </div>

    </div>

  )
}

export default ShopView
