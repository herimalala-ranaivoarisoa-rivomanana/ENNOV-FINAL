import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectIsAuthenticated, selectAuthUser, selectAuthError } from '../../features/auth/authSlice';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const authError = useSelector(selectAuthError);
  const navigate = useNavigate(); // Hook for navigation
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError.message || 'An error occurred');
      setOpenSnackbar(true);
    }
  }, [authError]);

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      setOpenSnackbar(true);
      return;
    }
    dispatch(login({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div style={{display:"flex", flexDirection:"row", gap:"2.5rem", justifyContent:"flex-start"}}>
          <Typography variant="h6">Authentifié, {user?.name}</Typography>
          <Button  variant="contained" color="secondary" onClick={handleLogout}>
            Sortir
          </Button>
        </div>
      ) : (
        <div>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          {errorMessage && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                {errorMessage}
              </MuiAlert>
            </Snackbar>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
