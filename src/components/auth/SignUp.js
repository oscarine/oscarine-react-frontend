import React from 'react'
import { Link } from 'react-router-dom'

function SignUp () {
  return (
    <div className='w-4/5 max-w-sm mt-10 container mx-auto p-5 bg-white rounded-xl shadow-md border border-gray-300  flex flex-col ...'>
      <h1 className='text-center text-2xl font-medium text-black p-6'>Sign-Up</h1>
      <form className='flex flex-col ...'>
        <h5 className='text-m font-medium text-black pb-2 pt-4'>E-mail</h5>
        <input className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...' type='text' />
        <h5 className='text-m font-medium text-black pb-2 pt-4'>Password</h5>
        <input className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...' type='password' />
        <h5 className='text-m font-medium text-black pb-2 pt-4'>Confirm Password</h5>
        <input className='pl-2 pr-2 h-8 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ...' type='password' />
        <button className='font-semibold p-2 mt-6 rounded-xl shadow-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 ...' type='submit'>Sign Up</button>
        <p className='text-sm text-center mt-3'>Have an account? <span className='text-blue-500 cursor-pointer'><Link to='/login'><strong>Log in</strong></Link></span></p>
      </form>
    </div>
  )
}

export default SignUp
