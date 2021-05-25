import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Cart from './components/Cart/Cart'
import Home from './components/Home/Home'
import Search from './components/Home/Search'
import ShopSearch from './components/ShopView/ShopSearch'
import ShopView from './components/ShopView/ShopView'
import { StateProvider } from './StateProvider'
import reducer, { initialState } from './reducer'

function App () {
  const shopSearch = (<div className='md:hidden'><ShopSearch /></div>)
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Switch>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/shop-view'>
            <ShopView />
          </Route>
          <Route path='/shop-search'>
            {shopSearch}
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  )
}

export default App
