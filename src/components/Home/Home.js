import axios from 'axios'
import axiosInstance from '../../axios'
import BottomNav from '../Layouts/BottomNav'
import ErrorModal from '../../UI/ErrorModal'
import Header from '../Layouts/Header'
import Shop from './Shop'
import React, { useEffect, useReducer, useState } from 'react'
import reducer, { initialState } from './reducer'
import { localStorageExpiryTime, navigatorOptions } from '../../settings/config'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../utils/storage'
import { HTTP_200, HTTP_404, HTTP_422 } from '../../const/httpStatus'
import { ERROR_CODE_1, ERROR_CODE_2, ERROR_CODE_3 } from '../../const/navigatorErrorCode'

const loadingShops = Array.from(Array(8)).map(() => Math.floor(Math.random() * 1000))

function Home () {
  const [httpState, httpDispatch] = useReducer(reducer, initialState)

  const [location, setLocation] = useState(null)

  useEffect(() => {
    async function position () {
      const now = new Date()
      if (getLocalStorage('location') === null || now.getTime() > getLocalStorage('location').expiryTime) {
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
              case ERROR_CODE_1: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Please allow to access your location' })
                break
              }
              case ERROR_CODE_2: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Unable to find your location' })
                break
              }
              case ERROR_CODE_3: {
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
      if (getLocalStorage('location')) {
        try {
          const resp = await axiosInstance.get('/api/v1/shops-list', { params: { longitude: getLocalStorage('location').longitude, latitude: getLocalStorage('location').latitude }, cancelToken: source.token })
          if (!unmounted) {
            if (resp.status === HTTP_200) {
              httpDispatch({
                type: 'RESPONSE',
                shopData: resp.data
              })
            }
          }
        } catch (error) {
          if (!unmounted) {
            switch (error.response?.status) {
              case HTTP_404: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Sorry! There are no registered shops near you' })
                break
              }
              case HTTP_422: {
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
        if (getLocalStorage('location') === null) {
          setLocalStorage('location', loc)
        } else if (now.getTime() > getLocalStorage('location').expiryTime) {
          removeLocalStorage('location')
          setLocalStorage('location', loc)
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
      <div className='bg-gray-100 z-0 mt-16 pb-16  max-w-6xl m-auto p-2 md:p-6 grid gap-3 grid-cols-1 md:grid-cols-auto  place-items-center'>
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
