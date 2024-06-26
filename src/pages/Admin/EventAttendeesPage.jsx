import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventAttendees, fetchEventDetails } from "../../store/Events/eventSlice";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid, Paper, CircularProgress, Divider, Button } from '@mui/material';

const EventAttendeesPage = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const attendees = useSelector((state) => state.events.attendees);
  const eventDetails = useSelector((state) => state.events.eventDetails.event);
  const loading = useSelector((state) => state.events.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const attendeesPerPage = 5;

  useEffect(() => {
    dispatch(fetchEventDetails(eventId)); // Fetch event details
    dispatch(fetchEventAttendees(eventId)); // Fetch event attendees
  }, [dispatch, eventId]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(attendees.length / attendeesPerPage)));
  };

  const paginatedAttendees = attendees.slice((currentPage - 1) * attendeesPerPage, currentPage * attendeesPerPage);

  return (
    <Box sx={{ py: 4, px: 2, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          mb: 6, 
          color: '#151e27',
          backgroundImage: 'linear-gradient(45deg, #901b20, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Event Details and Attendees
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ mb: 2, color: '#151e27' }}>
                Event Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {eventDetails ? (
                <Box>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Name:</strong> {eventDetails.name}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Description:</strong> {eventDetails.description}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Start Date:</strong> {new Date(eventDetails.startDate).toLocaleDateString()}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Capacity:</strong> {eventDetails.capacity}</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}><strong>Registration Closed:</strong> {eventDetails.registrationClosed ? "Yes" : "No"}</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ mb: 2, color: '#151e27' }}>
                Attendees
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  {attendees.length > 0 ? (
                    <>
                      {paginatedAttendees.map((attendee) => (
                        <Paper key={attendee.id} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 1 }}>
                          {attendee.user ? (
                            <Box>
                              <Typography variant="body1" sx={{ mb: 1 }}><strong>Name:</strong> {attendee.user.firstName} {attendee.user.lastName}</Typography>
                              <Typography variant="body1" sx={{ mb: 1 }}><strong>Email:</strong> {attendee.user.email}</Typography>
                            </Box>
                          ) : (
                            <Typography variant="body1" sx={{ mb: 1 }}>No user information available</Typography>
                          )}
                        </Paper>
                      ))}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button 
                          variant="contained" 
                          onClick={handlePreviousPage} 
                          disabled={currentPage === 1}
                          sx={{ backgroundColor: '#901b20', color: '#ffffff' }}
                        >
                          Previous
                        </Button>
                        <Button 
                          variant="contained" 
                          onClick={handleNextPage} 
                          disabled={currentPage === Math.ceil(attendees.length / attendeesPerPage)}
                          sx={{ backgroundColor: '#d0d0d0', color: '#151e27' }}
                        >
                          Next
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1" sx={{ mb: 1 }}>No attendees registered yet</Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventAttendeesPage;
