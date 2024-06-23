import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventCategory } from '../../store/categories/categorySlice';

const UpdateCategoryModal = ({ open, onClose, category, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [backendError, setBackendError] = useState(null); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const createUpdateError = useSelector((state) => state.eventCategories.createUpdateError);

  useEffect(() => {
    if (open && category) {
      setName(category.name || '');
    }
  }, [open, category]);

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    try {
      await dispatch(updateEventCategory({ id: category.id, name })).unwrap();
      setShowSuccessMessage(true); 
      onUpdateSuccess();
      setTimeout(() => {
        setShowSuccessMessage(false); 
      }, 5000);
      onClose();
    } catch (error) {
      setBackendError(error.message); 
    }
  };

  const handleModalClose = () => {
    setName(''); 
    setBackendError(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, margin: 'auto', marginTop: '20vh', maxWidth: '500px' }}>
        <Typography variant="h6" component="h2">Update Category</Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            error={!!createUpdateError} 
            helperText={createUpdateError || backendError || ''}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button type="submit" color="primary" variant="contained" style={{ width: '45%', backgroundColor: '#203947', color: '#ffffff' }}>
              Update
            </Button>
            <Button onClick={handleModalClose} color="secondary" variant="contained" style={{ width: '45%', background: "#901b20" }}>
              Cancel
            </Button>
          </Box>
        </form>
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={5000}
          onClose={() => setShowSuccessMessage(false)}
          message="Category updated successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            backgroundColor: '#4caf50',
            color: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            marginTop: '16px',
          }}
        />
      </Box>
    </Modal>
  );
};

export default UpdateCategoryModal;