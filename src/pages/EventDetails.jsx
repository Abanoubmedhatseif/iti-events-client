import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { fetchEventDetails, clearEvent } from '../store/Events/eventSlice';
import Button from '../components/Button';
import '../styles/EventDetails.css';

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
    // register for event
    console.log('Register button clicked');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }} className="fade-in">
      <Card>
        <CardContent className="slide-in-left card-content">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4} className="centered">
              <Typography gutterBottom variant="h4" component="div" align="center" style={{ fontSize: '2rem' }}>
                {event.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} className="centered">
              <Box>
                <Typography variant="body1" color="textSecondary" align="center" style={{ fontSize: '1.5rem' }}>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                  Start Date: {new Date(event.startDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                  End Date: {new Date(event.endDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                  Price: {event.price} EGP
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                  Duration: {event.duration} {event.duration > 1 ? 'Hours' : 'Hour'}
                </Typography>
                
                {event.minAge && (
                  <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                    Min Age: {event.minAge} Years
                  </Typography>
                )}
                {event.maxAge && (
                  <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                    Max Age: {event.maxAge} Years
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '1.25rem' }}>
                  Status: {event.registrationClosed ? 'Registration Closed' : 'Open To Register'}
                </Typography>
                {!event.registrationClosed && (
                  <Box display="flex" justifyContent="center" marginTop="20px">
                    <Button
                      text="Register"
                      backgroundColor="#7d1719"
                      color="#ffffff"
                      width={200}
                      height={50}
                      fontSize={100}
                      onClick={handleRegisterClick}
                    />
                  </Box>
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
