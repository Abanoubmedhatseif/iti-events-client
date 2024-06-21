import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import categoryDetailsReducer from './categories/categoryDetailsSlice'
import eventSlice from './Events/eventSlice';
import eventDetailsReducer from './Events/eventDetailsSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    categoryDetails: categoryDetailsReducer,
    events: eventSlice,
    eventDetails: eventDetailsReducer,
  },
});
