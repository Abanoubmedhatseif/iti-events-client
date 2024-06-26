import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          padding: "20px",
          margin: "0 auto",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Outlet /> {/* This will render the child routes */}
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
