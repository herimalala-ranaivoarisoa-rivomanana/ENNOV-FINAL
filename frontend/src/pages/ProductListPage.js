import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectAuthToken } from '../features/auth/authSlice';
import { Container, Typography, Grid, Paper} from '@mui/material';
import ProductList from '../components/Products/ProductList';

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location } });
    }
  }, [token, navigate, location]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        {token && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Liste de Produits</Typography>
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
