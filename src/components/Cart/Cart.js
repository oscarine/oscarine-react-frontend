import React from 'react'
import BottomNav from '../Layouts/BottomNav'
import Header from '../Layouts/Header'
import ShopHeader from '../ShopView/ShopHeader'
import ShopItem from '../ShopView/ShopItem'
import Bill from './Bill'

function Cart () {
  return (
    <div className='bg-gray-100 pb-20 md:pt-28'>
      <div className='mob:hidden'>
        <Header />
      </div>
      <ShopHeader inCart show />
      <div className='md:w-11/12 md:flex md:flex-row md:max-w-6xl m-auto md:justify-between place-items-top'>
        <div className='bg-white mob:pt-16 z-0  max-w-3xl md:w-3/5 m-auto p-3 md:pt-1 md:pl-10 md:pr-10 grid gap-0 grid-cols-1 place-items-center'>
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />
          <ShopItem inCart />

        </div>
        <Bill />
      </div>

      <BottomNav />
    </div>
  )
}

export default Cart
