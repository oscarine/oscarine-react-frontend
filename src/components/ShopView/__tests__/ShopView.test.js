import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Route, MemoryRouter } from 'react-router-dom'
import ShopView from '../ShopView'

afterEach(cleanup)

jest.mock('../../Layouts/Header', () => () => <div data-testid='header' />)
jest.mock('../../ShopView/ShopHeader', () => () => <div data-testid='shop-head' />)
jest.mock('../../ShopView/ShopSearch', () => () => <div data-testid='shop-search' />)
jest.mock('../../ShopView/ItemCategory', () => () => <div data-testid='item-category' />)

it('Check ShopView component rendering', () => {
  const { getByTestId, queryByTestId } = render(
    <MemoryRouter initialEntries={['/shop/1/shop-a']}>
      <Route path='/shop/:id/:name'>
        <ShopView />
      </Route>
    </MemoryRouter>)
  expect(getByTestId(/header/)).toBeInTheDocument()
  expect(getByTestId(/shop-head/)).toBeInTheDocument()
  expect(getByTestId(/shop-search/)).toBeInTheDocument()
  expect(getByTestId(/item-category/)).toBeInTheDocument()

  expect(queryByTestId('shop-name')).toBeTruthy()
  expect(queryByTestId('shop-address')).toBeTruthy()
  expect(queryByTestId('shop-rating')).toBeTruthy()
  expect(queryByTestId('shop-availability')).toBeTruthy()
  expect(queryByTestId('shop-deliverable')).toBeTruthy()
})
