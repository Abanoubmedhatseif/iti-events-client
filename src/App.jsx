import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import CategoryDetials from "./pages/CategoryDetails";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/UserLogin";
import Register from "./pages/UserRegister";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken , selectUser } from "./store/auth/authSlice";
import { useEffect } from "react";
import { isTokenExpired } from "./api";
import { userDataAction } from "./store/auth/authActions";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  useEffect(() => {
    if (!user || isTokenExpired(accessToken)) {
      dispatch(userDataAction());
    }
    console.log("User", user);
  }, [user, accessToken, dispatch]);
  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <NavBar />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
            }}
          >
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
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
