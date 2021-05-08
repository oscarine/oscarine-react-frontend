import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <SignUp/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
      </Switch> 
    </Router>
    
  );
}

export default App;
