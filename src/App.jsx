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
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
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
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
