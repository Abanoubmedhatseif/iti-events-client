import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingEvents } from '../store/Events/eventSlice';
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
import EventCard from '../components/Event/EventCard';

const UpcomingEventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const first4Events = events.slice(0, 4);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center" mt={4} mb={2}>
            <Typography 
              variant="h3" 
              component="h1" 
              style={{ 
                fontWeight: 700, 
                letterSpacing: '2px', 
                color: '#151e27', 
                background: 'linear-gradient(45deg, #901b20, #ff6b6b)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                marginTop: '70px',
                marginBottom: '50px'

              }}
            >
              Upcoming Events
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {first4Events.length === 0 ? (
          <Typography variant="h5">No events currently happening.</Typography>
        ) : (
          first4Events.map((event) => (
            <Grid item key={event.id} xs={3}>
              <EventCard
                id={event.id}
                name={event.name}
                description={event.description}
                startDate={event.startDate}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default UpcomingEventsPage;
