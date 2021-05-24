import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Auxilliary from '../Auxilliary'

afterEach(cleanup)

it('Check Auxilliary component rendering', () => {
  const { queryByText } = render(
    <Auxilliary className='flex flex-col'>
      Hello testing
    </Auxilliary>)
  const el = queryByText('Hello testing')
  expect(el).toBeTruthy()
  expect(el).toHaveClass('flex')
  expect(el).toHaveClass('flex-col')
  expect(el).toContainHTML('Hello testing')
})
