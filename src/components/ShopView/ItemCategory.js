import React from 'react'
import ShopItem from './ShopItem'

function ItemCategory ({ items, loading, name }) {
  return (
    <div className='bg-white z-0 mt-4 max-w-3xl m-auto pt-3 p-2 pb-0 '>
      <p className={`${!loading && 'w-full pl-3 text-gray-600 font-medium text-lg'} ${loading && 'ml-3 h-6 w-40 md:w-60 bg-gray-200 animate-pulse rounded-sm'}`}>{loading ? null : name}</p>
      <div className=' bg-white z-0 w-full m-auto  grid gap-3 grid-cols-1 place-items-center'>
        {!loading ? items.map((item) => <ShopItem key={item.id} name={item.name} cost={item.cost} loading={loading} />) : items.map((id) => <ShopItem key={id} loading={loading} />)}
      </div>
    </div>
  )
}

export default ItemCategory
