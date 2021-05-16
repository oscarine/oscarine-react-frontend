import React from 'react'
import ShopItem from './ShopItem'

function ItemCategory () {
  return (
    <div className='z-0 mt-2 mb-16 max-w-4xl m-auto p-2  grid gap-3 grid-cols-1 place-items-center'>
      <p>Category Name</p>
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
      <ShopItem />
    </div>
  )
}

export default ItemCategory
