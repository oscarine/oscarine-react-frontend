import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../UI/FormikFormComponents/TextInput'
import useAxios from 'axios-hooks'
import { LOGIN_URL } from '../../endpoints'

const Login = () => {
  const [errorMessage] = useState('')

  const [{ data: postData, loading: postLoading, error: postError }, executePost] = useAxios(
    {
      url: LOGIN_URL,
      method: 'POST'
    },
    { manual: true, ssr: false }
  )

  const sendLoginData = (email, password) => {
    executePost({
      data: {
        email: email,
        password: password
      }
    })
  }

  // const loginHandler = async (email, password) => {
  //   try {
  //     const response = await axios.post(LOGIN_URL, {
  //       email: email,
  //       password: password
  //     })
  //     if (response.status === 200) {
  //       console.log(response.data)
  //     }
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       setErrorMessage('Incorrect email or password')
  //       console.log('yes')
  //     }
  //   }
  // }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        sendLoginData(values.email, values.password)
        setSubmitting(false)
      }}
    >
      <div className='w-4/5 max-w-sm mt-10 container mx-auto p-5 bg-white rounded-xl shadow-md border border-gray-300  flex flex-col ...'>
        <h1 className='text-center text-2xl font-medium text-black p-6'>Login</h1>
        <Form className='flex flex-col ...' data-testid='login-form'>
          <TextInput
            label='Email'
            name='email'
            type='email'
            placeholder='Your email address'
          />
          <TextInput
            label='Password'
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder='Your password'
          />
          {errorMessage && errorMessage.length > 0 &&
            <div className='pt-1'>
              <p className='text-red-600'>{errorMessage}</p>
            </div>}
          <button data-testid='login-submit-btn' className='font-semibold p-2 mt-6 rounded-xl shadow-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 ...' type='submit'>Login</button>
        </Form>
        <p className='text-sm text-center mt-3'>Don't have an account? <span className='text-blue-500 cursor-pointer'><Link to='/signup'><strong>Sign up</strong></Link></span></p>
        <div>
          {postData}
          {postLoading}
          {postError}
        </div>
      </div>
    </Formik>
  )
}

export default Login
