import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AqiData.css';

interface State {
  username: string;
  email: string;
  password: string;
  aqiAlertLevel: number;
  location: string;
  showPassword: boolean;
}

const AQIData = () => {
  const userID = localStorage.getItem('userID');
  const token = 'Bearer '.concat(localStorage.getItem('token'));

  const [aqiData, setAQIdata] = useState({
    aqi: 0,
    city: '',
    time: '',
    aqiPref: 0,
    location: '',
    message: '',
  });

  // const [user, setUser] = useState<State>({
  //   username: '',
  //   email: '',
  //   password: '',
  //   aqiAlertLevel: 0,
  //   location: '',
  //   showPassword: false,
  // });

  // const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, [prop]: event.target.value });
  // };

  useEffect(() => {
    axios.defaults.baseURL = 'https://asthma-alert-server-production.herokuapp.com/';
    axios
      .get(`/api/aqi/getAQIdata/${userID}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setAQIdata({
          ...aqiData,
          aqi: response?.data?.aqiData?.aqi,
          city: response?.data?.city?.name,
          time: response?.data?.aqiData?.time?.s,
          aqiPref: response?.data?.aqiPref,
          location: response?.data?.location,
          message: response?.data?.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [userID, token]);

  // const updatedUserPref = () => {
  //   console.log('USER', user);

  //   axios.defaults.baseURL = 'https://asthma-alert-server-production.herokuapp.com/';
  //   axios
  //     .put(
  //       `/api/users/updateUser/${userID}`,
  //       { user },
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log('response', response.data.user);
  //     })
  //     .catch((error) => {
  //       console.log('ERROR', error);
  //     });
  // };

  return (
    <div>
      {aqiData.aqi !== 0 && (
        <div className='aqiData'>
          <fieldset>
            <h1>{aqiData.message}</h1>
            <h3>{aqiData.location.toUpperCase()}</h3>
            <h3>Air Quality = {aqiData.aqi} &nbsp;</h3>
            <h2 style={aqiData.aqi > aqiData.aqiPref ? { color: 'red' } : { color: 'green' }}>
              {aqiData.aqi > aqiData.aqiPref ? '👆' : '👇'} then your set threshold of {aqiData.aqiPref}
            </h2>
          </fieldset>
          {/* 
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updatedUserPref();
            }}
            className='signupForm'
          >
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
                  type='number'
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
                  placeholder={aqiData.location.toUpperCase()}
                />
              </FormControl>
            </div>
            <Button variant='contained' type='submit' className='SubmitChange'>
              Updated Preferences
            </Button>
          </form> */}
        </div>
      )}
    </div>
  );
};

export default AQIData;
