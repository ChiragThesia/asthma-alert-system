import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/Signup.css';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const [user, setUser] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const userSignup = () => {
    axios.defaults.baseURL = 'https://asthma-alert-server-production.herokuapp.com/';
    axios
      .post('/api/users/login', { user })
      .then((response) => {
        console.log('response', response);
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('userID', response.data.user.id);
        history.push('/aqi');
      })
      .catch((response) => {
        console.log('RESPONSE', response);
        setError('Please input correct credentials');
      });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='formBox'>
      <fieldset>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            userSignup();
          }}
          className='signupForm'
        >
          <h4 className='error'>{error}</h4>
          <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
              <OutlinedInput
                id='outlined-adornment-email'
                value={user.email}
                onChange={handleChange('email')}
                aria-describedby='outlined-email-helper-text'
                inputProps={{
                  'aria-label': 'email',
                }}
                label='Email'
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={user.showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {user.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                required
              />
            </FormControl>
          </div>
          <Button variant='contained' type='submit'>
            Login
          </Button>
        </form>
      </fieldset>
    </Box>
  );
}
