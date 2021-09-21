import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/aqi/getAQIdata/${userID}`, {
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

  return (
    <>
      <h1>{aqiData.message}</h1>
      <h2>{aqiData.location.toUpperCase()}</h2>
      {aqiData.aqi !== 0 && (
        <h3 style={aqiData.aqi > aqiData.aqiPref ? { color: 'red' } : { color: 'green' }}>
          {aqiData.location.toUpperCase()}'s air quality level is {aqiData.aqi} which is &nbsp;
          {aqiData.aqi > aqiData.aqiPref ? 'higher' : 'lower'} then your alert level of {aqiData.aqiPref}
        </h3>
      )}
    </>
  );
};

export default AQIData;
