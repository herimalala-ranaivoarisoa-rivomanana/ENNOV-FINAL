import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await api.get('/products');
  return response.data;
});

export const fetchProduct = createAsyncThunk('products/fetchOne', async (id) => {
  if(!id) return
  const response = await api.get(`/products/${id}`);
  return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (product) => {
  const response = await api.post('/products', product);
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error('Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, product }) => {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
});

// Define deleteProduct action
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await api.delete(`/products/${id}`);
  return id; // Return the id of the deleted product
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    item: {},
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Handle deleteProduct action
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.items = state.items.filter(product => product.id !== deletedId);
      });
  },
});

export default productsSlice.reducer;
