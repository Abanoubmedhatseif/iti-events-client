import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import AdminNavbar from '../../components/AdminNavbar';
import EventTable from '../../components/Event/EventTable';
import CreateEventModal from '../../components/Event/CreateEventModal';
import Button from '../../components/Button'; 

const AdminEventPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateEvent = () => {
    setOpen(true);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={4} mb={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="white"
            text="Create Event"
            onClick={handleCreateEvent}
            width={200}
            height={60}
            fontSize={100}
            margin="0"
            padding="10px"
            backgroundColor="#901b20b3"
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EventTable />
          </Grid>
        </Grid>
        <CreateEventModal open={open} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default AdminEventPage;