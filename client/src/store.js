import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Create a Redux Persist configuration object
const persistConfig = {
  key: 'root', // key is required
  storage, // storage is required
  // You can add other options like blacklist, whitelist, etc.
};

// Wrap your cartReducer with the persistReducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer, // Use the persisted cart reducer
  },
});

export const persistor = persistStore(store);
