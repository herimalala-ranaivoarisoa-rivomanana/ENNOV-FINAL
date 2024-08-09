import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      state.error = null; 
    },
    loadUserFromToken(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken); 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

// Exporting actions
export const { logout, loadUserFromToken } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectAuthToken = (state) => state?.auth?.token;
export const selectAuthUser = (state) => state?.auth?.user;
export const selectAuthError = (state) => state?.auth?.error; 

export default authSlice.reducer;
