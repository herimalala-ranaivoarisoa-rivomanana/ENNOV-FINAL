import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/products/productsSlice';
import { selectProductById } from '../../features/products/productsSelectors';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (!product || Object.keys(product).length === 0) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id, product]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;

  if (error) {
    return (
      <Typography variant="body1" color="error" align="center">
        Une erreur est survenue lors de la récupération du produit.
      </Typography>
    );
  }

  if (!product) return <Typography variant="body1">Aucun produit trouvé.</Typography>;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper
          sx={{
            padding: 3,
            margin: 3,
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[5],
          }}
        >
          <Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main, marginBottom: 2 }} align="center">
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.main, marginBottom: 2 }} align="center">
            {product.price !== undefined ? `$${product.price.toFixed(2)}` : 'Prix non disponible'}
          </Typography>
          <Typography variant="body1" sx={{ margin: '20px 0' }}>
            {product.description}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              component={Link}
              to={`/products/edit/${product.id}`}
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Modifier
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
