import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
};

export default AdminLayout;
