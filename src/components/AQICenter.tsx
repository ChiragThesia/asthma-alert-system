import axios from 'axios';
import React, { useEffect } from 'react';

const DataGather = () => {
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/getAQIdata/${userID}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {/* <div style={aqi > 50 ? { color: 'red' } : { color: 'green' }}>Your current air quality is: {aqi}</div> */}

      {/* <div>
        {
          ? `Air quality in is higher then your set level`
          : `Air quality in is lower then your set level`}
      </div> */}
    </>
  );
};

export default DataGather;
