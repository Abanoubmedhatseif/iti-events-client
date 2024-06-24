import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEventCategory } from '../../store/categories/categorySlice';

const CreateCategoryModal = ({ open, handleClose, handleSuccessMessageClose }) => {
  const dispatch = useDispatch();
  const createUpdateError = useSelector((state) => state.eventCategories.createUpdateError);

  const [categoryName, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        name: categoryName,
        image: selectedImage,
      };

      try {
        await dispatch(createEventCategory(formData)).unwrap();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        resetForm();
        handleClose();
        handleSuccessMessageClose();
      } catch (error) {
        console.error('Failed to create category:', error);
        setErrors({ ...errors, createUpdate: error.message });
      }
    }
  };

  const resetForm = () => {
    setCategoryName('');
    setSelectedImage(null);
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
              helperText={errors.name || createUpdateError || ''}
              InputLabelProps={{
                style: { color: '#901b20' },
              }}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: '16px' }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#901b20', color: 'white', marginTop: '16px' }}
              fullWidth
            >
              Create
            </Button>
            <Button
              onClick={handleModalClose}
              style={{ backgroundColor: '#6c757d', color: 'white', marginTop: '8px' }}
              fullWidth
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={5000}
        onClose={() => setShowSuccessMessage(false)}
        message="Category created successfully"
      />
    </>
  );
};

export default CreateCategoryModal;
