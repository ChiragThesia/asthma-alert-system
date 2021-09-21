import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AQIData from './components/AQICenter';
import Login from './components/Login';
import NavBar from './components/Navbar';
import Signup from './components/Signup';
import './styles/App.css';
import PrivateRoute from './util/privateRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/aqi' component={AQIData} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
