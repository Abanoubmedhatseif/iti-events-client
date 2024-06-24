import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#901b20b3" }}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Tabs
          indicatorColor="secondary" // Adjust indicator color if needed
          textColor="inherit"
        >
          <Tab
            label="Categories"
            sx={{ color: "white" }} // Set the text color to white
            component={Link}
            to="/admin/categories"
          />
          <Tab label="Events" component={Link} to="/admin/events" />
          <Tab label="Bus" component={Link} to="/admin/bus" />
          <Tab label="Guests" component={Link} to="/admin/guests" />
          <Tab label="Users" component={Link} to="/admin/users" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
