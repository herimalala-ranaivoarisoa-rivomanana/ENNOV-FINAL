import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're sorry, but there was an error processing your request. Please try again later.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoBack}
        sx={{ marginRight: '10px' }}
      >
        Go Back
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
