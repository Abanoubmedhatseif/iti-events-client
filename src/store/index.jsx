import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import eventCategoryReducer from './categories/categorySlice'

export const store = configureStore({
  reducer: {
    // categories: categoryReducer,
    eventCategories: eventCategoryReducer,


  },
});
