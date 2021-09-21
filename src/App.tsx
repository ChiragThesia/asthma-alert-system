import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataGather from './components/AQICenter';
import Login from './components/Login';
import NavBar from './components/Navbar';
import Signup from './components/Signup';
import './styles/App.css';
import PrivateRoute from './util/privateRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));

  return (
    <div className='App'>
      <Router>
        <NavBar isAuth={loggedIn} />
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/aqi' component={DataGather} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
