import axiosInstance from '../../axios'
import { makeUseAxios } from 'axios-hooks'
import { StarIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Header from '../Layouts/Header'
import ShopHeader from './ShopHeader'
import ShopSearch from './ShopSearch'
import ItemCategory from './ItemCategory'
import { useParams } from 'react-router'
import { HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY } from '../../const/httpStatus'
import ErrorModal from '../../UI/ErrorModal'

const loadingItems = Array.from(Array(5)).map(() => Math.floor(Math.random() * 1000))

function ShopView () {
  const [show, handleShow] = useState(false)
  const { id } = useParams()

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
  })

  const useAxios = makeUseAxios({ axios: axiosInstance })

  const [{ data: shopData, loading: shopLoading, error: shopError }] = useAxios(`/api/v1/shop-details?shop_id=${id}`)

  const [{ data: itemsList, loading: itemLoading, error: itemError }] = useAxios(`/api/v1/items-list/${1}`)

  let categoryArray = []
  if (itemsList) {
    const eachItemCategory = itemsList.map((item) => item.category)
    categoryArray = eachItemCategory.filter((value, index) => eachItemCategory.indexOf(value) === index)
  }
  let errorModal = null
  function errorHandler (error) {
    switch (error.response?.status) {
      case HTTP_404_NOT_FOUND: {
        errorModal = <ErrorModal message='Sorry! There are no items in this shop' />
        break
      }
      case HTTP_422_UNPROCESSABLE_ENTITY: {
        errorModal = <ErrorModal message='Something went wrong' />
        break
      }
      default:
        errorModal = <ErrorModal message='Oops! Cannot connect to our servers' />
    }
  }
  if (shopError) {
    errorHandler(shopError)
  } else if (itemError) {
    errorHandler(itemError)
  }
  return (
    <div className='bg-gray-100'>
      <div className='mob:hidden'>
        <Header />
      </div>
      <ShopHeader shopName={shopData?.name} show={show} />
      {!shopError
        ? (
          <div className='bg-white pt-16 md:pt-28 pl-4 pr-4 mob:shadow-lg'>
            <h1 className={`${!shopLoading && 'font-medium text-black-500 text-xl w-max ml-auto mr-auto'} ${shopLoading && ' ml-auto mr-auto  h-8 w-48 md:w-64 bg-gray-200 animate-pulse rounded-sm'}`}>{!shopLoading && shopError === null ? shopData.name : null}</h1>
            <p className={`${!shopLoading && 'text-gray-500 text-md md:mt-1 mb-5 w-max  ml-auto mr-auto'} ${shopLoading && ' ml-auto mr-auto mt-1 md:mt-3 mb-5 h-5 w-32 md:w-48 bg-gray-200 animate-pulse rounded-sm'}`}>{!shopLoading && shopError === null ? shopData.address : null}</p>
            <hr className='max-w-3xl m-auto border-dashed md:border-b-2 md:border-t-0' />
            <div className='max-w-3xl m-auto flex flex-row justify-between p-5 mob:pl-1 mob:pr-1'>
              <div className='flex flex-col '>
                <div className={`${!shopLoading && 'flex items-center'} ${shopLoading && ' h-5 w-12 bg-gray-200 animate-pulse rounded-sm'}`}>
                  <StarIcon className={`h-4 w-4 pt-0.5 text-gray-600 ${shopLoading && 'hidden'}`} />
                  <p className={`text-gray-600 font-medium text-md ${shopLoading && 'hidden'}`}>3.6</p>
                </div>
                <p className={`${!shopLoading && 'text-gray-500 text-xs'} ${shopLoading && 'mt-1 h-4 w-20 bg-gray-200 animate-pulse rounded-sm'}`}>{!shopLoading ? '20+ Ratings' : null}</p>
              </div>
              <div className='flex flex-col'>
                <h3 className={`${!shopLoading && shopData.is_available && 'text-green-500'} ${!shopLoading && !shopData.is_available && 'text-red-500'} font-medium text-md ${shopLoading && 'h-5 w-12 bg-gray-200 animate-pulse rounded-sm'}`}>{!shopLoading ? (shopData.is_available ? 'Open' : 'Close') : null}</h3>
                <p className={`text-gray-500 text-xs ${shopLoading && 'mt-1 h-4 w-20 bg-gray-200 animate-pulse rounded-sm'}`}>{!shopLoading && shopData.is_available ? (shopData.deliverable ? 'For delivery' : 'For take away') : null}</p>
              </div>
            </div>
          </div>)
        : null}
      <div className='mob:hidden'>
        <ShopSearch loading={shopLoading} />
      </div>
      {!itemLoading
        ? (!itemError && !shopError
            ? categoryArray.map((category) => <ItemCategory
                items={itemsList.filter((item) => item.category === category)}
                key={category}
                loading={itemLoading}
                name={category}
                                              />)
            : null)
        : <ItemCategory items={loadingItems} loading={itemLoading} />}
      {errorModal}
    </div>

  )
}

export default ShopView
