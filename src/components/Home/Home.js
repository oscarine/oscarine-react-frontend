import React, { useEffect, useState, useReducer } from 'react'
import BottomNav from '../Layouts/BottomNav'
import Header from '../Layouts/Header'
import Shop from './Shop'
import axios from '../../axios'
import reducer, { initialState } from './reducer'

function Home () {
  const [{ shops }, dispatch] = useReducer(reducer, initialState)

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function position () {
      try {
        await navigator.geolocation.getCurrentPosition(function (position) {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        })
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }

    async function shopsListGetRequest () {
      try {
        const resp = await axios.get('/api/v1/shops-list', { params: { longitude: longitude, latitude: latitude } })
        setLoading(false)
        setError(null)
        dispatch({
          type: 'FETCH_SHOPS',
          shopData: resp.data
        })
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }
    position()
    if (longitude && latitude) {
      shopsListGetRequest()
    }
  }, [latitude, longitude, dispatch])

  return (
    <div className='bg-gray-100 '>
      <Header />
      <div className='bg-gray-100 z-0 mt-16 pb-16  max-w-6xl m-auto p-2 md:p-6 grid gap-3 grid-cols-1 md:grid-cols-auto  place-items-center'>
        {!loading
          ? (shops.map((shop) => (<Shop
              address={shop.address}
              id={shop.id}
              key={shop.id}
              loading={loading}
              name={shop.name}
              phone_number={shop.phone_number}
                                  />)))
          : (Array(8).fill(null).map(() => <Shop loading={loading}/>))}
        {error ? (<p>{error}</p>) : null}
      </div>
      <BottomNav />
    </div>
  )
}

export default Home
