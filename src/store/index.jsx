import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import categoryDetailsReducer from './categories/categoryDetailsSlice'

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryDetails: categoryDetailsReducer,

  },
});
