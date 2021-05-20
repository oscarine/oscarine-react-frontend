import { render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Login from '../Login'

afterEach(cleanup)

it('check login form render', () => {
  const { queryByTitle, queryByLabelText, queryByTestId } = render(<MemoryRouter><Login /></MemoryRouter>)
  const form = queryByTitle('loginForm')
  expect(form).toHaveClass('flex')
  expect(form).toHaveClass('flex-col')

  const email = queryByLabelText('Email')
  expect(email).toBeTruthy()
  expect(email.value).toBe('')
  expect(email.placeholder).toBe('Your email address')
  expect(email.type).toBe('email')
  expect(email.name).toBe('email')
  expect(email.id).toBe('email')

  const password = queryByLabelText('Password')
  expect(password).toBeTruthy()
  expect(password.value).toBe('')
  expect(password.placeholder).toBe('Your password')
  expect(password.type).toBe('password')
  expect(password.name).toBe('password')
  expect(password.id).toBe('password')
  expect(password.autocomplete).toBe('current-password')

  const submitBtn = queryByTestId('login-submit-btn')
  expect(submitBtn).toBeTruthy()
  expect(submitBtn).toHaveTextContent('Login')
})

describe('submit login form', () => {
  it('on click', async () => {
    const { queryByTestId, getByPlaceholderText } = render(<MemoryRouter><Login /></MemoryRouter>)
    const submitBtn = queryByTestId('login-submit-btn')

    expect(queryByTestId('error-email')).toBeFalsy()
    expect(queryByTestId('error-password')).toBeFalsy()

    fireEvent.click(submitBtn)
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Required')
      expect(queryByTestId('error-password').innerHTML).toBe('Required')
    })

    fireEvent.change(getByPlaceholderText('Your email address'), {
      target: { value: 'invalid-email@protonmail' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Invalid email address')
      expect(queryByTestId('error-password').innerHTML).toBe('Required')
    })

    fireEvent.change(getByPlaceholderText('Your password'), {
      target: { value: 'pass' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Invalid email address')
      expect(queryByTestId('error-password')).toBeFalsy()
    })

    fireEvent.change(getByPlaceholderText('Your email address'), {
      target: { value: 'valid-email@protonmail.com' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email')).toBeFalsy()
      expect(queryByTestId('error-password')).toBeFalsy()
    })
  })
})

describe('check login form without hitting submit', () => {
  it('check form errors on inputs', async () => {
    const { queryByTestId, getByPlaceholderText } = render(<MemoryRouter><Login /></MemoryRouter>)

    fireEvent.change(getByPlaceholderText('Your email address'), {
      target: { value: 'invalid-email@protonmail' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email')).toBeFalsy()
      expect(queryByTestId('error-password')).toBeFalsy()
    })

    fireEvent.blur(getByPlaceholderText('Your email address'))
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Invalid email address')
      expect(queryByTestId('error-password')).toBeFalsy()
    })

    fireEvent.focus(getByPlaceholderText('Your password'))
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Invalid email address')
      expect(queryByTestId('error-password')).toBeFalsy()
    })
    fireEvent.blur(getByPlaceholderText('Your password'))
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Invalid email address')
      expect(queryByTestId('error-password').innerHTML).toBe('Required')
    })

    fireEvent.change(getByPlaceholderText('Your email address'), {
      target: { value: '' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email').innerHTML).toBe('Required')
      expect(queryByTestId('error-password').innerHTML).toBe('Required')
    })

    fireEvent.change(getByPlaceholderText('Your email address'), {
      target: { value: 'valid@protonmail.com' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email')).toBeFalsy()
      expect(queryByTestId('error-password').innerHTML).toBe('Required')
    })
    fireEvent.change(getByPlaceholderText('Your password'), {
      target: { value: 'pass' }
    })
    await waitFor(() => {
      expect(queryByTestId('error-email')).toBeFalsy()
      expect(queryByTestId('error-password')).toBeFalsy()
    })
  })
})
