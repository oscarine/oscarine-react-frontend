import React from 'react'
import PropTypes from 'prop-types'
import sadEmoji from '../assets/images/sad-emoji.png'

function ErrorModal ({ message }) {
  return (
    <div className='fixed top-0 w-screen flex h-screen'>
      <div className='m-auto'>
        <img alt='' className='w-12 md:w-14 m-auto' src={sadEmoji} />
        <p className='mt-2 text-gray-500 font-semibold text-black-500 text-md md:text-lg'>{message}</p>
      </div>
    </div>

  )
}

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorModal
