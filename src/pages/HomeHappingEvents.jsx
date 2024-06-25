import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Card } from '@mui/material';
import EventImage from '../assets/itinewCapital.png'; // Replace with your event image

const HomeHappingEvents = () => {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', py: 4, maxWidth: '1400px', margin: 'auto' }}>
      <Box sx={{ maxWidth: '90%', textAlign: 'center', mx: 'auto', px: 2 }}>
        <Typography 
          variant="h3"
          component="h1"
          sx={{ 
            fontWeight: 700, 
            letterSpacing: '2px', 
            color: '#151e27', 
            backgroundImage: 'linear-gradient(45deg, #901b20, #ff6b6b)',
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginTop: '40px',
            fontSize: '2.5rem', // Increased font size
          }}
        >
          Today's Events
        </Typography>
        <Card sx={{ maxWidth: 1000, margin: 'auto', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src={EventImage} alt="Happening Events" style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'brightness(0.7)', transition: 'filter 0.3s ease-in-out' }} />
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 1, width: '100%', padding: '0 20px' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Discover What's Happening Now</Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Stay updated with our latest events and activities.</Typography>
            <Button
              variant="contained"
              component={Link}
              to="/happeningEvents"
              color="primary"
              sx={{ px: 4, py: 2, borderRadius: '999px', fontSize: '1.1rem', fontWeight: 'bold', bgcolor: '#901b20', color: 'white', '&:hover': { bgcolor: '#b71c1f' } }}
            >
              View Events
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default HomeHappingEvents;
