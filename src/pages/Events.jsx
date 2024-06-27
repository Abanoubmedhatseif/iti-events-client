import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingEvents } from '../store/Events/eventSlice';
import { Grid, Container, Typography, CircularProgress, Box, Button, TextField } from '@mui/material';
import EventCard from '../components/Event/EventCard';

function Events() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const eventsPerPage = 4; // Number of events per page

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
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

  const formatDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `Start Date: ${formatDate(event.startDate)}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Get the events for the current page
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

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
              }}
            >
              Events
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="Search Events"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: '400px' }}
        />
      </Box>
      <Grid container spacing={4} style={{ marginTop: '16px' }}>
        {paginatedEvents.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
            <EventCard
              id={event.id}
              name={event.name}
              startDate={event.startDate}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: '8px', backgroundColor: '#901b20', color: '#ffffff' }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: '#d0d0d0', color: '#151e27' }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default Events;
