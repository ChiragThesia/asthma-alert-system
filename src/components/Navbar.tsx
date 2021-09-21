import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import '../styles/NavBar.css';

//@ts-ignore
const NavBar = (props) => {
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className='navbar'>
      <AppBar position='static'>
        <Toolbar>
          <h2 className='title'>AirQuality Alert System</h2>

          {localStorage.getItem('token') && (
            <Button variant='contained' color='inherit' className='navLink'>
              <Link href='/' style={{ textDecoration: 'none', color: 'black' }} onClick={handleLogout}>
                Logout
              </Link>
            </Button>
          )}
          {!localStorage.getItem('token') && (
            <Button variant='contained' color='inherit' className='navLink'>
              <Link href='/signup' style={{ textDecoration: 'none', color: 'black' }}>
                Signup
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
