import React from "react";
import "./styles/Global.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
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
import AdminGuestsPage from "./pages/Admin/AdminGuestsPage";
import AdminAccountsPage from "./pages/Admin/AdminAccountsPage";
import AboutUsPage from "./pages/AboutUs";
import UpcomingEventsPage from "./pages/UpcomingEventsPage";
import HappeningEventsPage from "./pages/HappeningEventsPage";
import EventAttendeesPage from "./pages/Admin/EventAttendeesPage";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import ExcelUploader from "./pages/Excel";
import VerifyEmail from "./pages/VerifyEmail";
import { Navigate } from "react-router-dom";
import ContactUs from "./pages/ContactUs";

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
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="about" element={<AboutUsPage />} />
              <Route
                path="UpcomingEventsPage"
                element={<UpcomingEventsPage />}
              />
              <Route path="happeningEvents" element={<HappeningEventsPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="excel" element={<ExcelUploader />} />
              <Route path="createUsers" element={<ExcelUploader />} />
              <Route path="verify" element={<VerifyEmail />} />

              <Route
                path="login"
                element={user ? <Navigate to={"/"} /> : <Login />}
              />
              <Route
                path="register"
                element={user ? <Navigate to={"/"} /> : <Register />}
              />
              <Route
                path="forgot"
                element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
              />
              <Route
                path="reset"
                element={user ? <Navigate to={"/"} /> : <ResetPassword />}
              />
            </Route>

            {/* Admin Layout Routes */}
            <Route
              path="admin/*"
              element={
                user?.role !== "admin" ? <Navigate to={"/"} /> : <AdminLayout />
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="categories" element={<AdminCategoryPage />} />
              <Route path="events" element={<AdminEventPage />} />
              <Route
                path="events/:eventId/attendees"
                element={<EventAttendeesPage />}
              />
              <Route path="guests" element={<AdminGuestsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="admins" element={<AdminAccountsPage />} />
              <Route path="createUsers" element={<ExcelUploader />} />

              <Route path="*" element={<PageNotFound />} />
              {/* Add other admin routes here */}
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
