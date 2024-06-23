import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
