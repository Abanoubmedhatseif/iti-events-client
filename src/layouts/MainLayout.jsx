import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ paddingBottom: '50px', minHeight: 'calc(100vh - 150px)',backgroundColor: '#f0f0f0' }}>
        {/* 150px is the height of the footer */}
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Outlet /> {/* This will render the child routes */}
        </main>
      </div>
      <Footer style={{ position: 'absolute', bottom: '0', width: '100%' }} />
    </div>
  );
};

export default MainLayout;
