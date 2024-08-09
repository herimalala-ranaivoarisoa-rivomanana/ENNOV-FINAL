import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { selectAuthToken, selectAuthUser } from '../features/auth/authSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken); 
  const user = useSelector(selectAuthUser); 
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <AppBar position="static" sx={{ backgroundColor: '#00796b' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Product Management App
            </Typography>
            {token ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenu}
                  sx={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  <Avatar sx={{ marginRight: 1, bgcolor: '#ffffff', color: '#00796b' }}>
                    {user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body1">
                    {user?.name || 'Utilisateur'}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to="/">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              location.pathname !== '/login' && (
                <Button component={Link} to="/login" color="inherit" variant="outlined" sx={{ borderColor: '#ffffff', color: '#ffffff' }}>
                  Login
                </Button>
              )
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
