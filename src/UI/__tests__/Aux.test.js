import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Aux from '../Aux'

afterEach(cleanup)

it('Check Aux component rendering', () => {
  const { queryByText } = render(
    <Aux className='flex flex-col'>
      Hello testing
    </Aux>)
  const el = queryByText('Hello testing')
  expect(el).toBeTruthy()
  expect(el).toHaveClass('flex')
  expect(el).toHaveClass('flex-col')
  expect(el).toContainHTML('Hello testing')
})
