import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataGather = () => {
  const [location, setLocation] = useState<string | null>(
    localStorage.getItem('currentLocation') ? localStorage.getItem('currentLocation') : ''
  );
  const [aqiAlert, setAqiAlert] = useState<number | null | string | null>();
  const [aqi, setAQI] = useState<number>();
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  //Get data form the APi based on location
  const getData = () => {
    axios
      .get(`https://api.waqi.info/feed/${location}/?token=f53929499cbb89a36a6fac33e0d15f04e76047c4`)
      .then((response) => {
        console.log(response);
        setAQI(response?.data?.data?.aqi);
      });
  };

  useEffect(() => {
    deBouncing();
  }, [location]);

  const deBouncing = () => {
    if (isTimeOut && timer !== undefined) {
      clearTimeout(timer);
      const currentTimeout = setTimeout(() => {
        getData();
        setIsTimeOut(false);
      }, 300);
      setTimer(currentTimeout);
      setIsTimeOut(true);
    } else {
      const currentTimeout = setTimeout(() => {
        getData();
        setIsTimeOut(false);
      }, 300);
      setTimer(currentTimeout);
      setIsTimeOut(true);
    }
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLocation(localStorage.getItem('currentLocation'));
          setAqiAlert(localStorage.getItem('aqilevel'));
        }}
      >
        <fieldset>
          <label>What is your location? &nbsp; </label>
          <input
            onChange={(event) => {
              localStorage.setItem('currentLocation', event?.target?.value);
            }}
          />
          <label> &nbsp; Set your Alert Level? &nbsp; </label>

          <input
            onChange={(event) => {
              localStorage.setItem('aqilevel', event?.target?.value);
            }}
          />
          <button className='submitButton' type='submit'>
            Set Preference
          </button>
        </fieldset>
      </form>
      <div style={aqi > 50 ? { color: 'red' } : { color: 'green' }}>Your current air quality is: {aqi}</div>

      <div>
        {aqiAlert < aqi
          ? `Air quality in ${location} is higher then your set level`
          : `Air quality in ${location} is lower then your set level`}
      </div>
    </>
  );
};

export default DataGather;
