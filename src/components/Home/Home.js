import axios from 'axios'
import axiosInstance from '../../axios'
import BottomNav from '../Layouts/BottomNav'
import ErrorModal from '../../UI/ErrorModal'
import Header from '../Layouts/Header'
import Shop from './Shop'
import React, { useEffect, useReducer, useState } from 'react'
import reducer, { initialState } from './reducer'
import { localStorageExpiryTime, navigatorOptions } from '../../settings/config'
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from '../../utils/storage'
import { HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY } from '../../const/httpStatus'
import { NAVIGATOR_PERMISSION_DENIED_ERROR, NAVIGATOR_POSITION_UNAVAILABLE_ERROR, NAVIGATOR_TIMEOUT_ERROR } from '../../const/navigatorErrorCode'

const loadingShops = Array.from(Array(8)).map(() => Math.floor(Math.random() * 1000))

function Home () {
  const [httpState, httpDispatch] = useReducer(reducer, initialState)

  const [location, setLocation] = useState({ longitude: null, latitude: null })

  useEffect(() => {
    async function position () {
      const now = new Date()
      if (getFromLocalStorage('location') === null || now.getTime() > getFromLocalStorage('location').expiryTime) {
        try {
          await navigator.geolocation.getCurrentPosition((pos) => {
            if (pos.coords.latitude && pos.coords.longitude) {
              setLocation({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude
              })
            }
          }, (error) => {
            switch (error.code) {
              case NAVIGATOR_PERMISSION_DENIED_ERROR: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Please allow to access your location' })
                break
              }
              case NAVIGATOR_POSITION_UNAVAILABLE_ERROR: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Unable to find your location' })
                break
              }
              case NAVIGATOR_TIMEOUT_ERROR: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Timeout!' })
                break
              }
              default:
                httpDispatch({ type: 'ERROR', errorMessage: 'Something went wrong' })
            }
          }, navigatorOptions)
        } catch (error) {
          httpDispatch({ type: 'ERROR', errorMessage: 'Something went wrong' })
        }
      }
    }

    let unmounted = false
    const source = axios.CancelToken.source()
    async function shopsListGetRequest () {
      httpDispatch({ type: 'SEND' })
      if (getFromLocalStorage('location')) {
        try {
          const resp = await axiosInstance.get('/api/v1/shops-list', { params: { longitude: getFromLocalStorage('location').longitude, latitude: getFromLocalStorage('location').latitude }, cancelToken: source.token })
          if (!unmounted) {
            if (resp.status === HTTP_200_OK) {
              httpDispatch({
                type: 'RESPONSE',
                shopData: resp.data
              })
            }
          }
        } catch (error) {
          if (!unmounted) {
            switch (error.response?.status) {
              case HTTP_404_NOT_FOUND: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Sorry! There are no registered shops near you' })
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
    }

    function storeLocation () {
      if (location && location.latitude && location.longitude) {
        const now = new Date()
        const loc = {
          longitude: location.longitude,
          latitude: location.latitude,
          expiryTime: now.getTime() + localStorageExpiryTime
        }
        if (getFromLocalStorage('location') === null) {
          setToLocalStorage('location', loc)
        } else if (now.getTime() > getFromLocalStorage('location').expiryTime) {
          removeFromLocalStorage('location')
          setToLocalStorage('location', loc)
        }
      }
    }

    position()
    storeLocation()
    shopsListGetRequest()

    return () => {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [location])

  return (
    <div className='bg-gray-100 '>
      <Header />
      <div className={`bg-gray-100 mt-16 pb-16  max-w-6xl m-auto p-2 md:p-6 grid gap-3 grid-cols-1 md:grid-cols-auto  place-items-center ${httpState.error && 'hidden'}`}>
        {!httpState.loading
          ? (!httpState.error
              ? (httpState.shops.map((shop) => (<Shop
                  address={shop.address}
                  id={shop.id}
                  key={shop.id}
                  loading={httpState.loading}
                  name={shop.name}
                  phone_number={shop.phone_number}
                                                />)))
              : null)
          : loadingShops.map((id) => <Shop key={id} loading={httpState.loading} />)}
      </div>
      {httpState.error ? (<ErrorModal message={httpState.error} />) : null}
      <BottomNav />
    </div>
  )
}

export default Home
