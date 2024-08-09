import React from 'react';
import ProductForm from '../components/Products/ProductForm';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

const ProductFormPage = () => {
  const { id } = useParams();

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Product' : 'Create Product'}
      </Typography>
      <ProductForm />
    </Paper>
  );
};

export default ProductFormPage;
