import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/Events/eventSlice'; // Adjust path as per your Redux setup
import EventCard from '../../components/Event/EventCard';
import { Grid, Container, Typography } from '@mui/material';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events); // Assuming events are stored in the 'events' slice

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Container>
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: 4, 
          color: '#151e27',
          backgroundImage: 'linear-gradient(45deg, #901b20, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginTop: '20px'
        }}
      >
        View Events Attendees
      </Typography>
      {loading ? (
        <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
          Loading events...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
              <EventCard
                id={event.id}
                name={event.name}
                description={event.description}
                startDate={event.startDate}
                // category={event.category}
                onClickPath={`/admin/events/${event.id}/attendees`} // Pass the custom path here
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminHome;
