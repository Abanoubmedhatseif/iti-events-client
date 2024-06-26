import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setupInterceptors } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/UserLogin";
import Register from "./pages/UserRegister";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminCategoryPage from "./pages/Admin/AdminCategoryPage";
import AdminHome from "./pages/Admin/AdminHome";
import AdminEventPage from "./pages/Admin/AdminEventPage";
import { selectAccessToken, selectUser } from "./store/auth/authSlice";
import { isTokenExpired } from "./api";
import { userDataAction } from "./store/auth/authActions";
import store from "./store";
import AdminUsersPage from "./pages/Admin/AdminUsersPage";
import AdminBusPage from "./pages/Admin/AdminBusPage";
import AdminGuestsPage from "./pages/Admin/AdminGuestsPage";
import AdminAccountsPage from "./pages/Admin/AdminAccountsPage";
import AboutUsPage from "./pages/AboutUs";
import UpcomingEventsPage from "./pages/UpcomingEventsPage";
import HappeningEventsPage from "./pages/HappeningEventsPage";
import EventAttendeesPage from "./pages/Admin/EventAttendeesPage";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import theme from "./styles/theme";
import CssBaseline from '@mui/material/CssBaseline';

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
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:eventId" element={<EventDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route
                path="categories/:categoryId"
                element={<CategoryDetails />}
              />
              <Route path="faq" element={<FAQ />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="about" element={<AboutUsPage />} />
              <Route
                path="UpcomingEventsPage"
                element={<UpcomingEventsPage />}
              />
              <Route path="happeningEvents" element={<HappeningEventsPage />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>

            {/* Admin Layout Routes */}
            <Route path="admin/*" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="categories" element={<AdminCategoryPage />} />
              <Route path="events" element={<AdminEventPage />} />
              <Route
                path="events/:eventId/attendees"
                element={<EventAttendeesPage />}
              />
              <Route path="bus" element={<AdminBusPage />} />
              <Route path="guests" element={<AdminGuestsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="admins" element={<AdminAccountsPage />} />
              <Route path="*" element={<PageNotFound />} />

              {/* Add other admin routes here */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
