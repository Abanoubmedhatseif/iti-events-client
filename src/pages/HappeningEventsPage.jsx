import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHappeningEvents } from '../store/Events/eventSlice';
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
import EventCard from '../components/Event/EventCard';

const HappeningEventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchHappeningEvents());
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
      <Box textAlign="center" mt={4} mb={2}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            letterSpacing: '2px', 
            color: '#151e27', 
            backgroundImage: 'linear-gradient(45deg, #901b20, #ff6b6b)',
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginTop: '70px'
          }}
        >
          Currently Happening Events
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent={first4Events.length < 4 ? 'center' : 'flex-start'}>
        {first4Events.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h5" align="center">No events currently happening.</Typography>
          </Grid>
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

export default HappeningEventsPage;
