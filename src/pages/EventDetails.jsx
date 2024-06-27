import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, Box, Snackbar, Alert } from '@mui/material';
import { fetchEventDetails, clearEvent } from '../store/Events/eventSlice';
import Button from '../components/Button';
import RegisterEventModal from '../components/Event/RegisterEvent';
import knowledgeCityIcon from '../assets/knowledgeCityicon.jpg'; // Import the static image
import '../styles/EventDetails.css'; // Import your custom CSS for styles

function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector(state => state.events.eventDetails);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    dispatch(fetchEventDetails(eventId));

    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, eventId]);

  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  const handleModalClose = () => {
    setRegisterModalOpen(false);
  };

  const handleRegistrationMessage = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="fade-in">
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="fade-in">
        <Typography variant="h6" component="div">Error: {error}</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" className="fade-in">
        <Typography variant="h6" component="div">Event not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" className="event-details-container">
      <Card className="event-details-card">
        <CardContent className="event-details-content">
          <Grid container spacing={4} alignItems="center">
            {/* Static image */}
            <Grid item xs={12} md={4} className="centered">
              <img src={knowledgeCityIcon} alt="Knowledge City Icon" className="event-details-image" />
            </Grid>
            {/* Event details */}
            <Grid item xs={12} md={8} className="event-details-info-container">
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography gutterBottom variant="h4" className="event-details-title" style={{ fontSize: '2rem' }}>
                  {event.name}
                </Typography>
                <Typography variant="body1" className="event-details-description" style={{ marginBottom: '16px', fontSize: '1.25rem' }}>
                  {event.description}
                </Typography>
                <Grid container spacing={2}>
                  {/* Event details in two columns */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                      <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                      <strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}
                    </Typography>
                    {event.price !== 0 && (
                      <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                        <strong>Price:</strong> {event.price} EGP
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                      <strong>Duration:</strong> {event.duration} {event.duration > 1 ? 'Hours' : 'Hour'}
                    </Typography>
                    {event.minAge && (
                      <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                        <strong>Min Age:</strong> {event.minAge} Years
                      </Typography>
                    )}
                    {event.maxAge && (
                      <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                        <strong>Max Age:</strong> {event.maxAge} Years
                      </Typography>
                    )}
                    <Typography variant="body2" className="event-details-info" style={{ fontSize: '1.2rem' }}>
                      <strong>Status:</strong> {event.registrationClosed ? 'Registration Closed' : 'Open To Register'}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Center the register button */}
                {!event.registrationClosed && (
                  <Box display="flex" justifyContent="center" marginTop="20px">
                    <Button
                      text="Register"
                      backgroundColor="#7d1719"
                      color="#ffffff"
                      width={200}
                      height={50}
                      onClick={handleRegisterClick}
                      className="event-register-button"
                      style={{ fontSize: '1.2rem' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <RegisterEventModal
        eventId={eventId}
        open={isRegisterModalOpen}
        handleClose={handleModalClose}
        event={event}
        onRegistrationMessage={handleRegistrationMessage}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EventDetails;
