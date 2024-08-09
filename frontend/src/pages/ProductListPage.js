import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectAuthToken } from '../features/auth/authSlice';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import ProductList from '../components/Products/ProductList';
import LoginForm from '../components/Auth/LoginForm';

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location } });
    }
  }, [token, navigate, location]);

  const handleCreateProduct = () => {
    navigate('/products/create');
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <LoginForm />
        {token && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Liste de Produits</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateProduct}
                style={{ marginBottom: '20px' }}
              >
                Ajouter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ProductList />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default ProductListPage;
