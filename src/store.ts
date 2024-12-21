import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import cityReducer from './citySlice';
import cartReducer from './cartSlice';
import { authApi } from './authApi';
import authReducer from './authSlice';
import ModalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    city: cityReducer,
    cart: cartReducer,
    modal: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;