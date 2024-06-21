import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/Events/eventSlice';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import EventCard from '../components/EventCard';

function Events() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" component="h1">Events</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: '16px' }}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
            <EventCard
              id={event.id}
              name={event.name}
              desc={event.desc}
              date={event.date}
              image={event.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Events;
