import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const tabs = [
  { label: 'Categories', link: '/admin/categories' },
  { label: 'Events', link: '/admin/events' },
  { label: 'Bus', link: '/admin/bus' },
  { label: 'Guests', link: '/admin/people' },
];

const AdminNavbar = ({ activeTab, onTabChange }) => {
  const handleTabChange = (event, newValue) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#901b20b3' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              component={Link}
              to={tab.link}
              sx={{ color: 'white' }}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
