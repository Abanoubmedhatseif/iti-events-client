import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const UpdateCategoryModal = ({ open, onClose, category }) => {
  const [name, setName] = useState(category.name);
  // const [desc, setDesc] = useState(category.desc);
  const [image, setImage] = useState(category.image);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (open) {
      setName(category.name);
      // setDesc(category.desc);
      setImage(category.image);
      setImageFile(null);
      setErrors({});
    }
  }, [open, category]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    // if (!desc.trim()) {
    //   errors.desc = 'Description is required';
    // }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      console.log('Name:', name);
      // console.log('Description:', desc);
      console.log('Image File:', imageFile);
      setShowSuccessMessage(true); 
      setTimeout(() => {
        setShowSuccessMessage(false); 
      }, 6000);
      onClose();
    }
  };

  const handleModalClose = () => {
    setShowSuccessMessage(false); 
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, margin: 'auto', marginTop: '20vh', maxWidth: '500px' }}>
          <Typography variant="h6" component="h2">Update Category</Typography>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          {/* <TextField
            label="Description"
            fullWidth
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            margin="normal"
            error={!!errors.desc}
            helperText={errors.desc}
          /> */}
          <TextField
            type="file"
            fullWidth
            onChange={handleImageChange}
            margin="normal"
          />
          <Button onClick={handleUpdate} color="primary" variant="contained" style={{ marginTop: '16px', marginRight: '8px', backgroundColor: '#203947' }}>
            Update
          </Button>
          <Button onClick={handleModalClose} color="secondary" variant="contained" style={{ marginTop: '16px', backgroundColor: '#901b20' }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      {showSuccessMessage && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4caf50',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '4px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1">Category updated successfully!</Typography>
        </Box>
      )}
    </>
  );
};

export default UpdateCategoryModal;
