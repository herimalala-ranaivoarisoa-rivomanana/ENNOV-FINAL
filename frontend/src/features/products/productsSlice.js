import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await api.get('/products');
  return response.data;
});

// Fetch a single product by id
export const fetchProduct = createAsyncThunk('products/fetchOne', async (id) => {
  if (!id) return;
  const response = await api.get(`/products/${id}`);
  return response.data;
});

// Create a new product
export const createProduct = createAsyncThunk('products/create', async (product) => {
  const response = await api.post('/products', product);
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error('Failed to create product');
  }
});

// Update an existing product
export const updateProduct = createAsyncThunk('products/update', async ({ id, product }) => {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
});

// Delete a product
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
  reducers: {
    clearProduct(state) {
      state.item = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.items = state.items.map((item) =>
          item.id === updatedProduct.id ? updatedProduct : item
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.items = state.items.filter((product) => product.id !== deletedId);
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (state) => state.products.item;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export const { clearProduct } = productsSlice.actions;

export default productsSlice.reducer;
