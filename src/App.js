import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import BottomNav from './components/Layouts/BottomNav'
import Header from './components/Layouts/Header'
import Home from './components/Home/Home'
import Search from './components/Home/Search'

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
        <Route path='/home'>
          <Header />
          <Home />
          <BottomNav />
        </Route>
        <Route path='/search'>
          <Header />
          <Search />
          <BottomNav />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
