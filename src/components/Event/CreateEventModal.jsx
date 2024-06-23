import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/Events/eventSlice';
import { fetchEventCategories } from '../../store/categories/categorySlice';

const CreateEventModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { eventCategories } = useSelector((state) => state.eventCategories);
  const { createEventError } = useSelector((state) => state.events); 

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    startDate: '',
    capacity: '',
    price: '',
    duration: '',
    category: '',
    minAge: '',
    maxAge: '',
    registrationClosed: false,
    isActive: true,
    isPaid: true,
  });

  useEffect(() => {
    if (open) {
      dispatch(fetchEventCategories());
    }
  }, [dispatch, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedEventData = Object.entries({
      ...eventData,
      capacity: eventData.capacity ? parseInt(eventData.capacity, 10) : undefined,
      price: eventData.price ? parseFloat(eventData.price) : undefined,
      duration: eventData.duration ? parseFloat(eventData.duration) : undefined,
      minAge: eventData.minAge ? parseInt(eventData.minAge, 10) : undefined,
      maxAge: eventData.maxAge ? parseInt(eventData.maxAge, 10) : undefined,
    }).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await dispatch(createEvent(parsedEventData)).unwrap();
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const resetForm = () => {
    setEventData({
      name: '',
      description: '',
      startDate: '',
      capacity: '',
      price: '',
      duration: '',
      category: '',
      minAge: '',
      maxAge: '',
      registrationClosed: false,
      isActive: true,
      isPaid: true,
    });
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          maxHeight: '80%',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" component="h2" style={{ color: '#901b20', marginBottom: 16 }}>
          Create Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Event Name"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                multiline
                rows={5} 

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="datetime-local"
                label="Start Date"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Capacity"
                name="capacity"
                value={eventData.capacity}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                value={eventData.price}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration (in hours)"
                name="duration"
                value={eventData.duration}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                >
                  {eventCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Minimum Age"
                name="minAge"
                value={eventData.minAge}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Maximum Age"
                name="maxAge"
                value={eventData.maxAge}
                onChange={handleChange}
                fullWidth
                size="small"
                margin="dense"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox />}
                label="Close Registration"
                name="registrationClosed"
                checked={eventData.registrationClosed}
                onChange={handleCheckboxChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox />}
                label="Active"
                name="isActive"
                checked={eventData.isActive}
                onChange={handleCheckboxChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Paid"
                name="isPaid"
                checked={eventData.isPaid}
                onChange={handleCheckboxChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: '45%', backgroundColor: '#203947', color: '#ffffff' }}
                >
                  Create
                </Button>
                <Button
                  onClick={handleModalClose}
                  variant="contained"
                  style={{ width: '45%', background: '#901b20', color: '#ffffff' }}
                >
                  Cancel
                </Button>
              </Box>
              {createEventError && (
                <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
                  {Object.values(createEventError).join(', ')}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
