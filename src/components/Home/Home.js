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
      try {
        await navigator.geolocation.getCurrentPosition(function (position) {
          if (position.coords.latitude && position.coords.longitude) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          }
        })
      } catch {
        httpDispatch({ type: 'ERROR', errorMessage: 'Something went wrong' })
      }
    }
    let unmounted = false
    const source = axios.CancelToken.source()
    async function shopsListGetRequest () {
      httpDispatch({ type: 'SEND' })
      try {
        const resp = await axiosInstance.get('/api/v1/shops-list', { params: { longitude: localStorage.getItem('longitude'), latitude: localStorage.getItem('latitude') }, cancelToken: source.token })
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
    function setLocalStorage () {
      if (latitude && longitude) {
        if (localStorage.getItem('longitude') === null && localStorage.getItem('latitude') === null) {
          localStorage.setItem('longitude', longitude)
          localStorage.setItem('latitude', latitude)
        } else if (latitude != localStorage.getItem('latitude') || longitude != localStorage.getItem('longitude')) {
          localStorage.setItem('longitude', longitude)
          localStorage.setItem('latitude', latitude)
        }
      }
    }
    position()
    setLocalStorage()
    const interval = setInterval(() => { setLocalStorage() }, 30 * 60 * 1000)

    if (localStorage.getItem('longitude') && localStorage.getItem('latitude')) {
      shopsListGetRequest()
    } else {
      httpDispatch({
        type: 'ERROR',
        errorMessage: 'Unable to find your location'
      })
    }
    return () => {
      unmounted = true
      source.cancel('Cancelling in cleanup')
      clearTimeout(interval)
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
