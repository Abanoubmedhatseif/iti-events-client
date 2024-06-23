import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/UserLogin";
import Register from "./pages/UserRegister";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminCategoryPage from './pages/Admin/AdminCategoryPage';
import AdminHome from './pages/Admin/AdminHome';
import AdminEventPage from './pages/Admin/AdminEventPage';
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "./store/auth/authSlice";
import { useEffect } from "react";
import { isTokenExpired } from "./api";
import { userDataAction } from "./store/auth/authActions";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Profile from "./pages/Profile";
import { setupInterceptors } from "./api";
import store from "./store";

setupInterceptors(store);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  useEffect(() => {
    if (!user || isTokenExpired(accessToken)) {
      dispatch(userDataAction());
    }
  }, [user, accessToken, dispatch]);
  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:eventId" element={<EventDetails />} />
              <Route path="Categories" element={<Categories />} />
              <Route
                path="Categories/:categoryId"
                element={<CategoryDetials />}
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="my" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:eventId" element={<EventDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryId" element={<CategoryDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route path="admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="categories" element={<AdminCategoryPage />} />
          <Route path="events" element={<AdminEventPage />} />



          {/* Add other admin routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
      </ThemeProvider>
      </>
  );
}

export default App;
