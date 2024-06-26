import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./categories/categorySlice";
import eventCategoryReducer from "./categories/categorySlice";
import eventReducer from "./Events/eventSlice";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import attedneesReducer from "./Events/attedneesSlice";

const store = configureStore({
  reducer: {
    // categories: categoryReducer,
    eventCategories: eventCategoryReducer,
    events: eventReducer,
    auth: authReducer,
    users: usersReducer,
    attednees: attedneesReducer,
  },
});

export default store;
