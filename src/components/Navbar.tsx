import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

//@ts-ignore
const NavBar = (props) => {
  const handleLogout = () => {
    localStorage.clear();
  };

  if (props.isAuth == null) {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              <Button variant='contained' color='inherit'>
                <Link href='/login' style={{ textDecoration: 'none', color: 'black' }}>
                  Login
                </Link>
              </Button>
            </Typography>
            <Button variant='contained' color='inherit'>
              <Link href='/signup' style={{ textDecoration: 'none', color: 'black' }}>
                Signup
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              <Button variant='contained' color='inherit'>
                <Link href='/login' style={{ textDecoration: 'none', color: 'black' }} onClick={handleLogout}>
                  Logout
                </Link>
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default NavBar;
