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
  Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../../store/Events/eventSlice';
import { fetchEventCategories } from '../../store/categories/categorySlice';

const UpdateModal = ({ open, onClose, onUpdate, event }) => {
  const dispatch = useDispatch();
  const { eventCategories } = useSelector((state) => state.eventCategories);
  const { updateEventError } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
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
    isActive: false,
    isPaid: false,
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (open && event) {
      setFormData({
        name: event.name || '',
        description: event.description || '',
        startDate: event.startDate ? formatDateForInput(event.startDate) : '',
        capacity: event.capacity || '',
        price: event.price || '',
        duration: event.duration || '',
        category: event.category?.id || '',
        minAge: event.minAge || '',
        maxAge: event.maxAge || '',
        registrationClosed: event.registrationClosed || false,
        isActive: event.isActive || false,
        isPaid: event.isPaid || false,
      });
    }
  }, [open, event]);

  useEffect(() => {
    if (open) {
      dispatch(fetchEventCategories());
    }
  }, [dispatch, open]);

  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let min = date.getMinutes();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;

    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'description', 'capacity', 'startDate'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    if (!event || !event.id) {
      return;
    }

    const parsedFormData = Object.entries({
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      duration: formData.duration ? parseFloat(formData.duration) : undefined,
      minAge: formData.minAge ? parseInt(formData.minAge, 10) : undefined,
      maxAge: formData.maxAge ? parseInt(formData.maxAge, 10) : undefined,
    }).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await dispatch(updateEvent({ id: event.id, ...parsedFormData })).unwrap();
      setSnackbarOpen(true);
      onUpdate(parsedFormData); // Call the onUpdate callback with updated data
      onClose(); // Close the modal after successful update
    } catch (error) {
    }
  };

  const handleClose = () => {
    onClose();
    setSnackbarOpen(false); // Reset snackbar state when the modal is closed
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
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
            Update Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Event Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Event Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  multiline
                  rows={5}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="datetime-local"
                  label="Start Date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  type="number"
                  error={!!errors.capacity}
                  helperText={errors.capacity}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  name="price"
                  value={formData.price}
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
                  value={formData.duration}
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
                    value={formData.category}
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
                  value={formData.minAge}
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
                  value={formData.maxAge}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="dense"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={formData.registrationClosed} onChange={handleChange} />}
                  label="Close Registration"
                  name="registrationClosed"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={formData.isActive} onChange={handleChange} />}
                  label="Active"
                  name="isActive"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={formData.isPaid} onChange={handleChange} />}
                  label="Paid"
                  name="isPaid"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: '45%', backgroundColor: '#203947', color: '#ffffff' }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    style={{ width: '45%', background: '#901b20', color: '#ffffff' }}
                  >
                    Cancel
                  </Button>
                </Box>
                {updateEventError && (
                  <Typography variant="body2" color="error" style={{ marginTop: 8 }}>
                    Failed to update event. Please try again later.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Event updated successfully"
      />
    </>
  );
};

export default UpdateModal;
