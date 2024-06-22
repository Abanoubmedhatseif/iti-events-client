import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEventCategory } from '../../store/categories/categorySlice'; 

const CreateCategoryModal = ({ open, handleClose, handleSuccessMessageClose }) => {
  const dispatch = useDispatch();
  const createUpdateError = useSelector((state) => state.eventCategories.createUpdateError);

  const [categoryName, setCategoryName] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(createEventCategory({ name: categoryName })).unwrap(); 
        setShowSuccessMessage(true); 
        setTimeout(() => {
          setShowSuccessMessage(false); 
        }, 5000);
        resetForm();
        handleClose();
        handleSuccessMessageClose(); 
      } catch (error) {
        console.error('Failed to create category:', error);
        setErrors({ name: error });
      }
    }
  };

  const resetForm = () => {
    setCategoryName('');
    setErrors({});
  };

  const validateForm = () => {
    let errors = {};
    if (!categoryName.trim()) {
      errors.name = 'Name is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ p: 4, backgroundColor: '#dedede', borderRadius: 2, margin: 'auto', marginTop: '20vh', maxWidth: '500px' }}>
          <Typography variant="h6" component="h2" style={{ color: '#901b20' }}>
            Create Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              margin="normal"
              error={!!errors.name || !!createUpdateError}
              helperText={errors.name || createUpdateError}
              InputLabelProps={{ style: { color: '#901b20' } }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: '45%', backgroundColor: '#203947', color: '#ffffff' }}
              >
                Create
              </Button>
              <Button
                onClick={handleModalClose}
                variant="contained"
                style={{ width: '45%', background: "#901b20" }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={5000}
          onClose={() => setShowSuccessMessage(false)}
          message="Category created successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      )}
    </>
  );
};

export default CreateCategoryModal;
