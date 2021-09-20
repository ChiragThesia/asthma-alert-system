import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Signup = () => {
  const [user, setUser] = useState({
    username: ' ',
    email: '',
    password: '',
    aqiAlertLevel: 0,
    location: '',
  });
  const history = useHistory();

  const userSignup = () => {
    axios
      .post('http://localhost:8080/api/users/signup', { user })
      .then((response) => {
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('userID', response.data.user.id);
        history.push('/aqi');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Sing Up!</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          userSignup();
        }}
      >
        <fieldset>
          <label> &nbsp; Provide username:&nbsp; </label>
          <input
            onChange={(event) => {
              event.preventDefault();
              const usernameData = event?.target?.value;
              setUser({ ...user, username: usernameData });
            }}
            required
          />
          <label>&nbsp;Provide email: &nbsp;</label>
          <input
            type='email'
            onChange={(event) => {
              event.preventDefault();
              const emailData = event?.target?.value;
              setUser({ ...user, email: emailData });
            }}
          />
          <label>&nbsp;Provide password:&nbsp; </label>
          <input
            name='password'
            type='password'
            onChange={(event) => {
              event.preventDefault();
              const passwordData = event?.target?.value;
              console.log('Password', typeof passwordData);
              setUser({ ...user, password: passwordData });
            }}
          />
          <label>&nbsp;Provide aqiAlertLevel:&nbsp; </label>
          <input
            type='number'
            onChange={(event) => {
              event.preventDefault();
              const aqiAlertLevelData = parseInt(event?.target?.value);
              setUser({ ...user, aqiAlertLevel: aqiAlertLevelData });
            }}
          />
          <label>&nbsp;Provide location:&nbsp; </label>
          <input
            onChange={(event) => {
              event.preventDefault();
              const locationData = event?.target?.value;
              setUser({ ...user, location: locationData });
            }}
          />
          <button className='submitButton' type='submit'>
            Create User
          </button>
        </fieldset>
      </form>
    </>
  );
};
export default Signup;
