import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataGather from './components/AQICenter';
import Login from './components/Login';
import NavBar from './components/Navbar';
import Signup from './components/Signup';
import PrivateRoute from './util/privateRoute';
function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <NavBar isAuth={loggedIn} />
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/aqi' component={DataGather} />
      </Switch>
    </Router>
  );
}

export default App;
