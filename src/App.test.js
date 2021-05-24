import { render, cleanup } from '@testing-library/react'
import React from 'react'
import App from './App'

afterEach(cleanup)

test('renders learn react link', () => {
  const div = document.createElement('div')
  render(<App />, div)
})
