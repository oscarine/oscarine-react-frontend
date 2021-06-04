import axios from 'axios'
import axiosInstance from '../../axios'
import BottomNav from '../Layouts/BottomNav'
import ErrorModal from '../../UI/ErrorModal'
import Header from '../Layouts/Header'
import Shop from './Shop'
import React, { useEffect, useReducer, useState } from 'react'
import reducer, { initialState } from './reducer'

const loadingShops = Array.from(Array(8)).map(() => Math.floor(Math.random() * 1000))
const navigatorTimeout = { timeout: 15 * 1000 }
const localStorageExpiryMin = 10 * 60 * 1000

function Home () {
  const [httpState, httpDispatch] = useReducer(reducer, initialState)

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(() => {
    async function position () {
      const now = new Date()
      if (JSON.parse(localStorage.getItem('location') === null) || now.getTime() > JSON.parse(localStorage.getItem('location')).expiryTime) {
        try {
          await navigator.geolocation.getCurrentPosition((pos) => {
            if (pos.coords.latitude && pos.coords.longitude) {
              setLatitude(pos.coords.latitude)
              setLongitude(pos.coords.longitude)
            }
          }, (error) => {
            switch (error.code) {
              case 1: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Please allow to access your location' })
                break
              }
              case 2: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Unable to find your location' })
                break
              }
              case 3: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Timeout!' })
                break
              }
              default:
                httpDispatch({ type: 'ERROR', errorMessage: 'Something went wrong' })
            }
          }, navigatorTimeout)
        } catch (error) {
          httpDispatch({ type: 'ERROR', errorMessage: 'Something went wrong' })
        }
      }
    }

    let unmounted = false
    const source = axios.CancelToken.source()
    async function shopsListGetRequest () {
      httpDispatch({ type: 'SEND' })
      const loc = JSON.parse(localStorage.getItem('location'))
      if (loc) {
        try {
          const resp = await axiosInstance.get('/api/v1/shops-list', { params: { longitude: loc.longitude, latitude: loc.latitude }, cancelToken: source.token })
          if (!unmounted) {
            if (resp.status === 200) {
              httpDispatch({
                type: 'RESPONSE',
                shopData: resp.data
              })
            }
          }
        } catch (error) {
          if (!unmounted) {
            switch (error.response?.status) {
              case 404: {
                httpDispatch({ type: 'ERROR', errorMessage: 'Sorry! There are no registered shops near you' })
                break
              }
              case 422: {
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

    function setLocalStorage () {
      if (latitude && longitude) {
        const now = new Date()
        const location = {
          longitude,
          latitude,
          expiryTime: now.getTime() + localStorageExpiryMin
        }
        const localStorageLoc = JSON.parse(localStorage.getItem('location'))
        if (localStorageLoc === null) {
          localStorage.setItem('location', JSON.stringify(location))
        } else if (now.getTime() > localStorageLoc.expiryTime) {
          localStorage.removeItem('location')
          localStorage.setItem('location', JSON.stringify(location))
        }
      }
    }

    position()
    setLocalStorage()
    shopsListGetRequest()

    return () => {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [latitude, longitude])

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
