import React from 'react'
import { useHistory } from 'react-router-dom'
import { ChatAltIcon } from '@heroicons/react/solid'

function Login () {
  const history = useHistory()

  const directToSignUp = () => {
    history.push('/signup')
  }

  return (
    <div className='w-4/5 max-w-sm mt-10 container mx-auto p-5 bg-white rounded-xl shadow-md space-x-4 flex flex-col ...'>
      <h1 className='text-center text-2xl font-medium text-black p-6'>Log-In</h1>
      <form className='flex flex-col ...'>
        <h5 className='text-m font-medium text-black pb-2 '>E-mail</h5>
        <input className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...' type='text' />
        <h5 className='text-m font-medium text-black pb-2 pt-4'>Password</h5>
        <input className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...' type='password' />
        <button className='font-semibold p-2 mt-6 rounded-xl shadow-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 ...' type='submit'>Log In</button>
      </form>
      <p className='text-sm text-center mt-3'>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={directToSignUp}><strong>Sign up</strong></span></p>
      <div>
        <ChatAltIcon className='h-10 w-10 text-blue-500' />
        <p>Check the above icon</p>
      </div>
    </div>
  )
}

export default Login
