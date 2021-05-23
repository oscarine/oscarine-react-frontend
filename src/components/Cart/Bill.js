import React from 'react'

function Bill () {
  return (
    <div className='h-full md:w-1/3 mob:mt-4 max-w-3xl container  mx-auto p-3  bg-white flex flex-col md:items-top '>
      <h1 className='font-medium text-black-500 text-lg text-left ml-1'>Bill Details</h1>
      <div className='justify-between flex flex-row mt-1 ml-1 mr-1 md:ml-0'>
        <p className=' text-md'>Item Total</p>
        <p className=' text-md'>₹400</p>
      </div>
      <div className='justify-between flex flex-row ml-1 mr-1 md:ml-0'>
        <p className=' text-md'>Delivery Charge</p>
        <p className=' text-md'>₹20</p>
      </div>
      <hr className='w-full m-auto border-t-2 border-gray-300 mt-3 mb-3' />
      <div className='justify-between flex flex-row ml-1 mr-1 md:ml-0'>
        <p className='font-medium text-black-500 text-md'>To Pay</p>
        <p className=' font-medium text-black-500 text-md'>₹420</p>
      </div>
    </div>
  )
}

export default Bill
