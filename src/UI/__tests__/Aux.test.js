import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Auxilliary from '../Auxilliary'

afterEach(cleanup)

it('Check Auxilliary component rendering', () => {
  const { queryByText, queryByTestId } = render(
    <Auxilliary className='flex flex-col'>
      <p>Hello testing</p>
      <p>Hello</p>
    </Auxilliary>)
  const el = queryByText('Hello testing')
  expect(el).toBeTruthy()
  expect(el).toContainHTML('Hello testing')
  const aux = queryByTestId('aux-parent-div')
  expect(aux).toBeTruthy()
  expect(aux.className).toBe('flex flex-col')
})
