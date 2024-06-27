import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerForEvent, clearRegistrationMessages } from '../../store/Events/eventSlice';

const RegisterEventModal = ({ eventId, open, handleClose, event, onRegistrationMessage }) => {
  const dispatch = useDispatch();
  const { registrationSuccess, registrationError, loading } = useSelector((state) => state.events);

  const [registrationData, setRegistrationData] = useState({
    imageUrl: null,
  });

  const [selectedImageName, setSelectedImageName] = useState('');

  useEffect(() => {
    if (registrationSuccess) {
      onRegistrationMessage(registrationSuccess, 'success');
      dispatch(clearRegistrationMessages());
      handleClose();
    } else if (registrationError) {
      onRegistrationMessage(registrationError, 'error');
      dispatch(clearRegistrationMessages());
    }
  }, [registrationSuccess, registrationError, dispatch, handleClose, onRegistrationMessage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegistrationData({
      ...registrationData,
      imageUrl: file,
    });
    setSelectedImageName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(event , registrationData)
    if (event.isPaid && registrationData.imageUrl) {
      formData.append('image', registrationData.imageUrl); // Change 'imageUrl' to 'image'
    }

    try {
      dispatch(registerForEvent({ eventId, formData }));
    } catch (error) {
      onRegistrationMessage(error.message || 'Failed to register for the event', 'error');
    }
  };

  const resetForm = () => {
    setRegistrationData({
      imageUrl: null,
    });
    setSelectedImageName('');
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
    dispatch(clearRegistrationMessages());
  };

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
                {selectedImageName && (
                  <Typography variant="body2" style={{ marginTop: 8 }}>
                    {selectedImageName}
                  </Typography>
                )}
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
  );
};

export default RegisterEventModal;
