import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DataGather from './components/AQICenter';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './util/privateRoute';

function App() {
  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          {localStorage.getItem('token') && (
            <Button variant='contained' color='inherit'>
              <Link
                className='navLink'
                to='/'
                onClick={(event) => {
                  localStorage.clear();
                }}
                text-decoration='none'
              >
                Logout
              </Link>
            </Button>
          )}
          {!localStorage.getItem('token') && (
            <Button variant='contained' color='inherit'>
              <Link className='navLink' to='/login' text-decoration='none'>
                Login
              </Link>
            </Button>
          )}
          {!localStorage.getItem('token') && (
            <Button variant='contained' color='inherit'>
              <Link className='navLink' to='/signup'>
                Signup
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <PrivateRoute exact path='/aqi' component={DataGather} />
      </Switch>
    </Router>
  );
}

export default App;
