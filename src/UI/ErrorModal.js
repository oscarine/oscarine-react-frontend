import React from 'react'
import PropTypes from 'prop-types'
import sadEmoji from '../assets/images/sad-emoji.png'

function ErrorModal ({ message }) {
  return (
    <div className='mob:-mt-36 -mt-28  flex h-screen'>
      <div className='m-auto'>
        <img alt='' className='w-12 md:w-20 m-auto' src={sadEmoji} />
        <p className='mt-2 md:mt-6 text-gray-500 font-semibold text-black-500 text-md md:text-lg'>{message}</p>
      </div>
    </div>

  )
}

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorModal
