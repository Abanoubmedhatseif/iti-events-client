import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventDetails, clearEvent } from '../store/events/eventDetailsSlice';
import { Container, Typography, CircularProgress } from '@mui/material';
import EventCard from '../components/EventCard';

function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { event, loading, error } = useSelector(state => state.eventDetails);

  useEffect(() => {
    dispatch(fetchEventDetails(eventId));

    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, eventId]);

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

  if (!event) {
    return <div>No event details available</div>;
  }

  return (
    <Container>
      <EventCard
        id={event.id}
        name={event.name}
        desc={event.desc}
        date={event.date}
        image={event.image}
      />
    </Container>
  );
}

export default EventDetails;
