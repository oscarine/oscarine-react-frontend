import React, { useEffect, useState, useReducer } from 'react'
import BottomNav from '../Layouts/BottomNav'
import Header from '../Layouts/Header'
import Shop from './Shop'
import axiosInstance from '../../axios'
import axios from 'axios'
import reducer, { initialState } from './reducer'
import ErrorModal from '../../UI/ErrorModal'

const loadingShops = Array.from(Array(8)).map(() => Math.floor(Math.random() * 1000))

function Home () {
  const [httpState, httpDispatch] = useReducer(reducer, initialState)

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  useEffect(() => {
    async function position () {
      const now = new Date()
      if (JSON.parse(localStorage.getItem('location') == null) || now.getTime() > JSON.parse(localStorage.getItem('location')).expiryTime) {
        await navigator.geolocation.getCurrentPosition(function (position) {
          if (position.coords.latitude && position.coords.longitude) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          }
        }, function (error) {
          console.log(error)
          switch (error.code) {
            case 1: {
              httpDispatch({ type: 'ERROR', errorMessage: 'Please allow access to access your location' })
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
        }, { timeout: 15 * 1000 })
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
        const location = { longitude: longitude, latitude: latitude, expiryTime: now.getTime() + 10 * 1000 }
        const localStorageLoc = JSON.parse(localStorage.getItem('location'))
        if (localStorageLoc == null) {
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
