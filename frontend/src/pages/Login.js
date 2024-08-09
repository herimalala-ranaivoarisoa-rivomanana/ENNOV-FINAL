import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>
        Login
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
