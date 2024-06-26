import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DownloadIcon from '@mui/icons-material/Download';

const RidePage = () => {
  const googleDriveLink = "https://drive.google.com/drive/folders/16dkLmWXox-ixM_tycGHX_SxUcbDW8gdD";

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '320px',
        marginTop: '20px',
        marginX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: 2,
        }}
      >
        <DirectionsCarIcon
          sx={{
            fontSize: '60px',
            color: '#901b20',
            mb: 2,
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
            color: '#151e27',
            mb: 2,
          }}
        >
          Need a Ride?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            letterSpacing: '0.5px',
            color: '#6c757d',
            mb: 2,
          }}
        >
          Download our app and get going!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'regular',
            letterSpacing: '0.5px',
            color: '#6c757d',
            mb: 2,
            fontSize: '20px',
          }}
        >
          Book the new capital buses through the app, pick your point, and arrive in time!
        </Typography>
      </Box>
      <Button
        variant="contained"
        href={googleDriveLink} // Direct users to the Google Drive link
        startIcon={<DownloadIcon />}
        sx={{
          backgroundColor: '#901b20',
          color: '#ffffff',
          padding: '10px 20px',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        Download Now
      </Button>
    </Container>
  );
};

export default RidePage;
