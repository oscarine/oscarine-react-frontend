import React, { useEffect, useState, useReducer } from 'react'
import BottomNav from '../Layouts/BottomNav'
import Header from '../Layouts/Header'
import Shop from './Shop'
import axios from '../../axios'
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
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        })
      } catch (error) {
        httpDispatch({
          type: 'ERROR',
          errorMessage: error.message
        })
      }
    }

    async function shopsListGetRequest () {
      httpDispatch({ type: 'SEND' })
      try {
        const resp = await axios.get('/api/v1/shops-list', { params: { longitude: longitude, latitude: latitude } })
        if (resp.status === 200) {
          httpDispatch({
            type: 'RESPONSE',
            shopData: resp.data
          })
        }
      } catch (error) {
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
    position()
    if (longitude && latitude) {
      shopsListGetRequest()
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
