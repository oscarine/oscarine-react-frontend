import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home/Home'
import Search from './components/Home/Search'
import ShopSearch from './components/ShopView/ShopSearch'
import ShopView from './components/ShopView/ShopView'

function App () {
  return (
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
          <ShopSearch />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
