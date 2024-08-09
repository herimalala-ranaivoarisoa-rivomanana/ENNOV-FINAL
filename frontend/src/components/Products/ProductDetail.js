import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/products/productsSlice';
import { selectProductById } from '../../features/products/productsSelectors';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);

  useEffect(() => {
    if (Object.keys(product).length===0) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id, product]);

  if (!product) return <p>Loading...</p>;
  return (
    <div>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary">
        Edit
      </Button>
    </div>
  );
};

export default ProductDetail;
