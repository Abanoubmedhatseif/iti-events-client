import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteModal = ({ open, onClose, onConfirm, event }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Event</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete the event "{event?.name}"?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: '#203947', color: 'white' }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} style={{ backgroundColor: '#901b20', color: 'white' }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
