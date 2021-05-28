import React, { useReducer, useCallback, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../UI/FormikFormComponents/TextInput'
import { LOGIN_URL } from '../../endpoints'
import AuthContext from '../../store/auth-context'
import ThreeBounceLoader from '../../UI/ThreeBounceLoader'
import axios from '../../axios'

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { loading: false, error: null }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    default:
      throw new Error('Invalid httpReducer action')
  }
}

const Login = () => {
  const [httpState, httpDispatch] = useReducer(httpReducer, { loading: false, error: null })
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const submitHandler = useCallback((values, { setSubmitting }) => {
    async function postLoginDetails () {
      httpDispatch({ type: 'SEND' })
      try {
        const response = await axios.post(LOGIN_URL, {
          email: values.email,
          password: values.password
        })
        if (response.status === 200) {
          httpDispatch({ type: 'RESPONSE' })
          setSubmitting(false)
          const authToken = response.data.access_token
          authCtx.login(authToken)
          history.push('/')
        }
      } catch (error) {
        setSubmitting(false)
        switch (error.response?.status) {
          case 401: {
            httpDispatch({ type: 'ERROR', errorMessage: 'Incorrect email or password' })
            break
          }
          case 422: {
            httpDispatch({
              type: 'ERROR',
              errorMessage: 'Invalid data provided. Please enter the valid email and password values'
            })
            break
          }
          default:
            httpDispatch({ type: 'ERROR', errorMessage: 'Oops! Cannot connect to our servers' })
        }
      }
    }
    postLoginDetails()
  }, [authCtx, history])

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
      onSubmit={submitHandler}
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
          {httpState.error &&
            <div className='pt-1'>
              <p className='text-red-600'>{httpState.error}</p>
            </div>}
          <button
            className='h-10 font-semibold p-2 mt-6 rounded-xl shadow-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 ...'
            data-testid='login-submit-btn'
            type='submit'
          >
            {httpState.loading
              ? <ThreeBounceLoader />
              : 'Login'}
          </button>
        </Form>
        <p className='text-sm text-center mt-3'>Don&apos;t have an account? <span className='text-blue-500 cursor-pointer'><Link to='/signup'><strong>Sign up</strong></Link></span></p>
      </div>
    </Formik>
  )
}

export default Login
