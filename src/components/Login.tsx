import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const userLogin = () => {
    axios
      .post('http://localhost:8080/api/users/login', { user })
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
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          userLogin();
        }}
      >
        <fieldset>
          <label>&nbsp; Enter your email: &nbsp; </label>
          <input
            type='email'
            onChange={(event) => {
              event.preventDefault();
              const emailData = event?.target?.value;
              setUser({ ...user, email: emailData });
            }}
          />
          <label> &nbsp; Enter your password: &nbsp; </label>
          <input
            name='password'
            type='password'
            onChange={(event) => {
              event.preventDefault();
              const passwordData = event?.target?.value;
              setUser({ ...user, password: passwordData });
            }}
          />
          <button className='submitButton' type='submit'>
            Login
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
