import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataGather from './components/AQICenter';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className='App'>
      <Router>
        <header className='App-header'>Asthma Alert System</header>
        <Switch>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/aqi'>
            <DataGather />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
