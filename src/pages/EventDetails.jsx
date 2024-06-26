import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { fetchEventDetails, clearEvent } from '../store/Events/eventSlice';
import Button from '../components/Button';
import knowledgeCityIcon from '../assets/knowledgeCityicon.jpg'; // Import the static image
import '../styles/EventDetails.css'; // Import your custom CSS for styles

function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector(state => state.events.eventDetails);

  useEffect(() => {
    dispatch(fetchEventDetails(eventId));

    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, eventId]);

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

  const handleRegisterClick = () => {
    // Handle registration logic here
    console.log('Register button clicked');
  };

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
                <Typography gutterBottom variant="h4" className="event-details-title">
                  {event.name}
                </Typography>
                <Typography variant="body1" className="event-details-description">
                  {event.description}
                </Typography>
                <Typography variant="body2" className="event-details-info">
                  <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" className="event-details-info">
                  <strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}
                </Typography>
                {/* Conditionally render price */}
                {event.price !== 0 && (
                  <Typography variant="body2" className="event-details-info">
                    <strong>Price:</strong> {event.price} EGP
                  </Typography>
                )}
                <Typography variant="body2" className="event-details-info">
                  <strong>Duration:</strong> {event.duration} {event.duration > 1 ? 'Hours' : 'Hour'}
                </Typography>
                {event.minAge && (
                  <Typography variant="body2" className="event-details-info">
                    <strong>Min Age:</strong> {event.minAge} Years
                  </Typography>
                )}
                {event.maxAge && (
                  <Typography variant="body2" className="event-details-info">
                    <strong>Max Age:</strong> {event.maxAge} Years
                  </Typography>
                )}
                <Typography variant="body2" className="event-details-info">
                  <strong>Status:</strong> {event.registrationClosed ? 'Registration Closed' : 'Open To Register'}
                </Typography>
                {!event.registrationClosed && (
                  <Button
                    text="Register"
                    backgroundColor="#7d1719"
                    color="#ffffff"
                    width={200}
                    height={50}
                    onClick={handleRegisterClick}
                    className="event-register-button"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EventDetails;
