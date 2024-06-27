import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, item }) => {
  const handleConfirmDelete = () => {
    if (!item) {
      onClose();
      return;
    }
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation message ✔️</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          style={{ backgroundColor: "#203947", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          style={{ backgroundColor: "#901b20", color: "white" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
