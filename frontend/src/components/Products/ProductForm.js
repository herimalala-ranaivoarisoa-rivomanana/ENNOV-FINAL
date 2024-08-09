import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchProduct, updateProduct } from '../../features/products/productsSlice';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { selectProductById } from '../../features/products/productsSelectors';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector(selectProductById);

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceToFloat = parseFloat(price);
  
    if (id) {
      dispatch(updateProduct({ id: Number(id), product: { name, price: priceToFloat, description } }))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            navigate(`/`);
          } else {
            navigate('/error');
          }
        });
    } else {
      dispatch(createProduct({ name, price: priceToFloat, description }))
        .then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            const createdProductId = action.payload.id;
            if(createdProductId) navigate(`/`);
          } else {
            navigate('/error');
          }
        });
    }
    dispatch(fetchProduct());
  };
  
    const handleCancel = () => {
      dispatch(fetchProduct());
      navigate(-1);
    };

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
    }
  }, [product]);

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Edit Product' : 'Create Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="number"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          {id ? 'Update' : 'Ajouter'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Annuler
        </Button>
      </form>
    </Paper>
  );
};

export default ProductForm;
