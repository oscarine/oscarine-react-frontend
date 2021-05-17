import React from 'react'
import ShopItem from './ShopItem'

function ItemCategory () {
  return (
    <div className='bg-white z-0 mt-4 max-w-3xl m-auto pt-3 p-2 pb-0 '>
      <p className=' w-full pl-3 text-gray-600 font-medium text-lg'>Category Name</p>
      <div className=' bg-white z-0 w-full m-auto  grid gap-3 grid-cols-1 place-items-center'>
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </div>

    </div>
  )
}

export default ItemCategory
