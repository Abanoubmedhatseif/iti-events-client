import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/Events/eventSlice'; // Adjust path as per your Redux setup
import EventCard from '../../components/Event/EventCard';
import { Grid, Container, Typography, CircularProgress, Box, Button, TextField } from '@mui/material';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events); // Assuming events are stored in the 'events' slice

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4; // Number of events per page

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
      {loading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedEvents.map((event) => (
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
        </>
      )}
    </Container>
  );
};

export default AdminHome;
