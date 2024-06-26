import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerForEvent, clearRegistrationMessages } from '../../store/Events/eventSlice';

const RegisterEventModal = ({ eventId, open, handleClose, event }) => {
  const dispatch = useDispatch();
  const { registrationSuccess, registrationError, loading } = useSelector((state) => state.events);

  const [registrationData, setRegistrationData] = useState({
    uploadImage: null,
  });

  useEffect(() => {
    if (registrationSuccess || registrationError) {
      handleClose();
      dispatch(clearRegistrationMessages());
    }
  }, [registrationSuccess, registrationError, handleClose, dispatch]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (registrationSuccess) {
      setSnackbarMessage(registrationSuccess);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (registrationError) {
      setSnackbarMessage(registrationError);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [registrationSuccess, registrationError]);

  const handleFileChange = (e) => {
    setRegistrationData({
      ...registrationData,
      uploadImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (event.capacity > 0 && !event.registrationClosed && event.isActive) {
      const formData = new FormData();

      if (event.isPaid && registrationData.uploadImage) {
        formData.append('uploadImage', registrationData.uploadImage);
      }

      try {
        await dispatch(registerForEvent({ eventId, formData })).unwrap();
        handleClose();
        resetForm();
      } catch (error) {
        console.error('Failed to register for event:', error);
      }
    }
  };

  const resetForm = () => {
    setRegistrationData({
      uploadImage: null,
    });
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
    dispatch(clearRegistrationMessages());
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!open) return null;

  return (
    <>
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
            Register for Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {event.isPaid && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    style={{ backgroundColor: '#203947', color: '#ffffff' }}
                  >
                    Upload Payment Proof
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: '45%', backgroundColor: '#203947', color: '#ffffff' }}
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                  <Button
                    onClick={handleModalClose}
                    variant="contained"
                    style={{ width: '45%', background: '#901b20', color: '#ffffff' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterEventModal;
