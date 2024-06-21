import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const CreateCategoryModal = ({ open, handleClose }) => {
  const [categoryName, setCategoryName] = useState('');
//   const [categoryDesc, setCategoryDesc] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setTimeout(() => {
        console.log('Category Name:', categoryName);
        // console.log('Category Description:', categoryDesc);
        console.log('Category Image File:', categoryImage);
        setShowSuccessMessage(true); 
        resetForm(); 
        handleClose(); 
      }, 1000); 

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 6000);
    }
  };

  const resetForm = () => {
    setCategoryName('');
    // setCategoryDesc('');
    setCategoryImage(null);
    setErrors({});
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file);
  };

  const validateForm = () => {
    let errors = {};
    if (!categoryName.trim()) {
      errors.name = 'Name is required';
    }
    // if (!categoryDesc.trim()) {
    //   errors.desc = 'Description is required';
    // }
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
              error={!!errors.name}
              helperText={errors.name}
              InputLabelProps={{ style: { color: '#901b20' } }}
            />
            {/* <TextField
              label="Category Description"
              fullWidth
              multiline
              rows={4}
              value={categoryDesc}
              onChange={(e) => setCategoryDesc(e.target.value)}
              margin="normal"
              error={!!errors.desc}
              helperText={errors.desc}
              InputLabelProps={{ style: { color: '#901b20' } }}
            /> */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="categoryImageInput"
            />
            <label htmlFor="categoryImageInput">
              <Button
                component="span"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '16px', marginBottom: '16px', backgroundColor: '#901b20', color: '#ffffff' }}
              >
                Upload Image
              </Button>
            </label>
            {categoryImage && <Typography variant="body2">{categoryImage.name}</Typography>}
            {errors.image && <Typography color="error">{errors.image}</Typography>}
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
          <Typography variant="body1">Category created successfully!</Typography>
        </Box>
      )}
    </>
  );
};

export default CreateCategoryModal;
