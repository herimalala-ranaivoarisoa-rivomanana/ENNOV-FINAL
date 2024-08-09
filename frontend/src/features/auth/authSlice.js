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
    user: JSON.parse(localStorage.getItem('ennov_test_user')) || null,
    token: localStorage.getItem('ennov_test_token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('ennov_test_token');
      state.error = null; 
    },
    loadToken(state) {
      const token = localStorage.getItem('ennov_test_token');
      if (token) {
        state.token = token;
      }
    },
    loadUser(state) {
      const user = JSON.parse(localStorage.getItem('ennov_test_user')) ;
      if (user) {
        state.user = user;
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
        localStorage.setItem('ennov_test_token', action.payload.accessToken); 
        localStorage.setItem('ennov_test_user', JSON.stringify(action.payload.user)); 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

// Exporting actions
export const { logout, loadToken } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectAuthToken = (state) => state?.auth?.token;
export const selectAuthUser = (state) => state?.auth?.user;
export const selectAuthError = (state) => state?.auth?.error; 

export default authSlice.reducer;
