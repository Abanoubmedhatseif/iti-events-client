import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventDetails, clearEvent } from '../store/Events/eventDetailsSlice';
import { Container, Typography, CircularProgress } from '@mui/material';

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
      <Typography variant="h4" component="h1">{event.name}</Typography>
      <Typography variant="body1" component="p">{event.desc}</Typography>
    </Container>
  );
}

export default EventDetails;
