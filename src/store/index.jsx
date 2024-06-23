import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./categories/categorySlice";
import eventCategoryReducer from "./categories/categorySlice";
import eventReducer from "./Events/eventSlice";
import authReducer from "./auth/authSlice";
const store = configureStore({
  reducer: {
    // categories: categoryReducer,
    eventCategories: eventCategoryReducer,
    events: eventReducer,
    auth: authReducer,
  },
});

export default store;
