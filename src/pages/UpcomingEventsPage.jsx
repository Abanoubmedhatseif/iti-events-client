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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" sx={{ marginLeft: '16px' }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const first4Events = events.slice(0, 4);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            letterSpacing: '2px', 
            color: '#151e27', 
            background: 'linear-gradient(45deg, #901b20, #ff6b6b)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            marginTop: { xs: '70px', md: '50px' },
            marginBottom: '50px'
          }}
        >
          Upcoming Events
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
        {first4Events.length === 0 ? (
          <Typography variant="h5">No events currently happening.</Typography>
        ) : (
          first4Events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={3}>
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
