// src/components/DeleteConfirmationDialog.jsx

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, category }) => {
  const handleConfirmDelete = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the category "{category.name}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: '#203947', color: "white"}}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} style={{ backgroundColor: '#901b20', color: "white"}}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
