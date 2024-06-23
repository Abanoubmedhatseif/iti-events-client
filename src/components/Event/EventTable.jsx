import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Snackbar,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { fetchEvents, deleteEvent, updateEvent } from '../../store/Events/eventSlice';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const EventTable = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  const { updateEventError } = useSelector((state) => state.events);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setOpenDeleteDialog(true);
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id))
        .then(() => {
          setOpenDeleteDialog(false);
          setSelectedEvent(null);
          setSnackbarOpen(true);
          setSnackbarMessage('Event deleted successfully');
        })
        .catch((error) => {
          console.error('Failed to delete event:', error);
          setOpenDeleteDialog(false);
        });
    }
  };

  const handleConfirmUpdate = (formData) => {
    if (selectedEvent) {
      dispatch(updateEvent({ id: selectedEvent.id, ...formData }))
        .then(() => {
          setOpenUpdateModal(false);
          setSelectedEvent(null);
          setSnackbarOpen(true);
          setSnackbarMessage('Event updated successfully');
        })
        .catch((error) => {
          console.error('Failed to update event:', error);
          setOpenUpdateModal(false);
        });
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedEvent(null);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedEvent(null);
  };

  const handleMouseEnter = (eventId) => {
    setHoveredEventId(eventId);
  };

  const handleMouseLeave = () => {
    setHoveredEventId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Minimum Age</TableCell>
              <TableCell>Maximum Age</TableCell>
              <TableCell>Registration Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  <Tooltip title={event.description} arrow>
                    <Typography
                      onMouseEnter={() => handleMouseEnter(event.id)}
                      onMouseLeave={handleMouseLeave}
                      style={{ cursor: 'pointer' }}
                    >
                      {hoveredEventId === event.id
                        ? event.description
                        : `${event.description.split(' ').slice(0, 2).join(' ')}${
                            event.description.split(' ').length > 2 ? '...' : ''
                          }`}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{event.category ? event.category.name : 'Uncategorized'}</TableCell>
                <TableCell>{new Date(event.startDate).toLocaleString()}</TableCell>
                <TableCell>{event.capacity}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>{event.minAge}</TableCell>
                <TableCell>{event.maxAge}</TableCell>
                <TableCell>{event.registrationClosed ? 'Closed' : 'Open'}</TableCell>
                <TableCell>{event.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{event.isPaid ? 'Paid' : 'Free'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(event)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(event)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteModal
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        event={selectedEvent}
      />

      {/* Update Modal */}
      <UpdateModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        onUpdate={handleConfirmUpdate}
        event={selectedEvent}
      />

      {/* Snackbar for success messages */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </TableContainer>
  );
};

export default EventTable;
