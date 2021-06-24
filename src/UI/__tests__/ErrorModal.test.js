import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ErrorModal from '../ErrorModal'

afterEach(cleanup)

it('Check ErrorModal component rendering', () => {
  const { queryByText, queryByAltText } = render(
    <ErrorModal message='Test Error Modal' />
  )
  const el = queryByText('Test Error Modal')
  expect(el).toBeTruthy()
  const img = queryByAltText('error')
  expect(img).toBeTruthy()
  expect(img.src).toContain('sad-emoji.png')
})
