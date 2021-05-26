import { render, cleanup } from '@testing-library/react'
import React from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

afterEach(cleanup)

test('renders react', () => {
  const div = document.createElement('div')
  render(<BrowserRouter><App /></BrowserRouter>, div)
})
