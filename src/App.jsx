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
import AdminCategoryPage from './pages/AdminCategoryPage';
import AdminHome from './pages/AdminHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
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


          {/* Add other admin routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
