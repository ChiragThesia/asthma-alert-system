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
  username: string;
  email: string;
  password: string;
  aqiAlertLevel: number;
  location: string;
  showPassword: boolean;
}

export default function Signup() {
  const [user, setUser] = useState<State>({
    username: '',
    email: '',
    password: '',
    aqiAlertLevel: 0,
    location: '',
    showPassword: false,
  });
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
      .post('/api/users/signup', { user })
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
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='formBox'>
      <fieldset>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            userSignup();
          }}
          className='signupForm'
        >
          <div className='formInput'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-username'>Username</InputLabel>
              <OutlinedInput
                id='outlined-adornment-username'
                value={user.username}
                onChange={handleChange('username')}
                aria-describedby='outlined-username-helper-text'
                inputProps={{
                  'aria-label': 'username',
                }}
                label='Username'
                required
              />
            </FormControl>
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

          <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-aqiAlertlevel'>AQI Alert Level</InputLabel>
              <OutlinedInput
                id='outlined-adornment-aqiAlertlevel'
                value={user.aqiAlertLevel}
                onChange={handleChange('aqiAlertLevel')}
                aria-describedby='outlined-aqiAlertlevel-helper-text'
                inputProps={{
                  'aria-label': 'aqiAlertlevel',
                }}
                label='AQI Alert Level'
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-location'>Location</InputLabel>
              <OutlinedInput
                id='outlined-adornment-location'
                value={user.location}
                onChange={handleChange('location')}
                aria-describedby='outlined-location-helper-text'
                inputProps={{
                  'aria-label': 'location',
                }}
                label='Location'
                required
              />
            </FormControl>
          </div>
          <Button variant='contained' type='submit' className='createUserButton'>
            Create User
          </Button>
        </form>
      </fieldset>
    </Box>
  );
}
