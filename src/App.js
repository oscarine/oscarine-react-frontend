import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/sign-up'>
          <SignUp/>
        </Route>
        <Route path='/log-in'>
          <Login/>
        </Route>
      </Switch> 
    </Router>
    
  );
}

export default App;
