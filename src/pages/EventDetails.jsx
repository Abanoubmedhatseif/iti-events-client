import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { fetchEventDetails, clearEvent } from '../store/Events/eventSlice'; // Adjust the path as needed

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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" component="div">Error: {error}</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" component="div">Event not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" align="center">
            {event.name}
          </Typography>
          
          
        </CardContent>
      </Card>

      <Typography variant="h5" component="div" style={{ marginTop: '20px' }} align="center">
            {event.description}
          </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px' }} align="center">
            End Date: {new Date(event.endDate).toLocaleString()}
          </Typography>
          <Typography variant="h5" component="div" style={{ marginTop: '20px' }} align="center">
            Price: EGP{event.price}
          </Typography>
          <Typography variant="h5" component="div" style={{ marginTop: '20px' }} align="center">
            Duration: {event.duration} minutes
          </Typography>
          <Typography variant="h5" component="div" style={{ marginTop: '20px' }} align="center">
            Status: {event.registrationClosed ? 'Registration Closed' : 'Open To Register'}
          </Typography>
    </Container>
  );
}

export default EventDetails;
