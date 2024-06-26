import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet /> {/* This will render the child routes */}
      </Container>
    </Box>
  );
};

export default AdminLayout;
