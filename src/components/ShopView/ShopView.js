import axios from 'axios'
import axiosInstance from '../../axios'
import { StarIcon } from '@heroicons/react/solid'
import React, { useEffect, useReducer, useState } from 'react'
import reducer, { initialState } from './reducer'
import Header from '../Layouts/Header'
import ShopHeader from './ShopHeader'
import ShopSearch from './ShopSearch'
import ItemCategory from './ItemCategory'
import { useParams } from 'react-router'
import { HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY } from '../../const/httpStatus'
import ErrorModal from '../../UI/ErrorModal'

const loadingItems = Array.from(Array(5)).map(() => Math.floor(Math.random() * 1000))

function ShopView () {
  const [show, handleShow] = useState(false)
  const { id, name } = useParams()
  const [httpState, httpDispatch] = useReducer(reducer, initialState)

  let categoryArray = []
  if (httpState.items.length !== 0) {
    const eachItemCategory = httpState.items.map((item) => item.category)
    categoryArray = eachItemCategory.filter((value, index) => eachItemCategory.indexOf(value) === index)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 160) {
        handleShow(true)
      } else {
        handleShow(false)
      }
    })

    let unmounted = false
    const source = axios.CancelToken.source()
    async function getItemList () {
      httpDispatch({ type: 'SEND' })
      try {
        const resp = await axiosInstance.get(`/api/v1/items-list/${id}`)
        if (!unmounted) {
          if (resp.status === HTTP_200_OK) {
            httpDispatch({
              type: 'RESPONSE',
              shopItems: resp.data
            })
          }
        }
      } catch (error) {
        if (!unmounted) {
          switch (error.response?.status) {
            case HTTP_404_NOT_FOUND: {
              httpDispatch({ type: 'ERROR', errorMessage: 'Sorry! There are no items in this shop' })
              break
            }
            case HTTP_422_UNPROCESSABLE_ENTITY: {
              httpDispatch({
                type: 'ERROR',
                errorMessage: 'Something went wrong'
              })
              break
            }
            default:
              httpDispatch({ type: 'ERROR', errorMessage: 'Oops! Cannot connect to our servers' })
          }
        }
      }
    }

    getItemList()
    return () => {
      unmounted = true
      source.cancel('Cancelling in cleanup')
      window.removeEventListener('scroll', window)
    }
  }, [id])

  return (
    <div className='bg-gray-100'>
      <div className='mob:hidden'>
        <Header />
      </div>
      <ShopHeader show={show} />
      <div className='bg-white pt-16 md:pt-36 text-center pl-4 pr-4 mob:shadow-lg'>
        <h1 className='font-medium text-black-500 text-xl'>{name.split('-').join(' ')}</h1>
        <p className='text-gray-500 text-md -mt-1 mb-5'>Description</p>
        <hr className='max-w-3xl m-auto border-dashed md:border-b-2 md:border-t-0' />
        <div className='max-w-3xl m-auto flex flex-row justify-between p-5'>
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
      <div className='mob:hidden'>
        <ShopSearch />
      </div>
      {!httpState.loading
        ? (!httpState.error
            ? categoryArray.map((category) => <ItemCategory
                items={httpState.items.filter((item) => item.category === category)}
                key={category}
                name={category}
                                              />)
            : null)
        : <ItemCategory items={loadingItems} loading={httpState.loading} />}
      {httpState.error ? (<ErrorModal message={httpState.error} />) : null}
    </div>

  )
}

export default ShopView
