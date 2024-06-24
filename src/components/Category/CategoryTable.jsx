import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Typography,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import UpdateCategoryModal from './UpdateCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';
import { fetchEventCategories, deleteEventCategory } from '../../store/categories/categorySlice';

const EventCategoryTable = () => {
  const dispatch = useDispatch();
  const eventCategories = useSelector((state) => state.eventCategories.eventCategories);
  const status = useSelector((state) => state.eventCategories.status);
  const error = useSelector((state) => state.eventCategories.error);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedEventCategory, setSelectedEventCategory] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEventCategories());
    }
  }, [dispatch, status]);

  const handleDelete = (eventCategory) => {
    setSelectedEventCategory(eventCategory);
    setOpenDeleteDialog(true);
  };

  const handleUpdate = (eventCategory) => {
    setSelectedEventCategory(eventCategory);
    setOpenUpdateModal(true);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEventCategory) {
      dispatch(deleteEventCategory(selectedEventCategory.id))
        .then(() => {
          setOpenDeleteDialog(false);
          setSelectedEventCategory(null);
          setShowSuccessMessage(true);
        })
        .catch((error) => {
          console.error('Failed to delete event category:', error);
          if (error.message === 'Category name already exists') {
            setBackendError(error.message);
          }
        });
    }
  };

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (status === 'failed') {
    return <p>Error loading event categories: {error}</p>;
  }

  if (!Array.isArray(eventCategories) || eventCategories.length === 0) {
    return <p>No event categories available.</p>;
  }

  const handleModalClose = (updated, errorMessage = null) => {
    setOpenUpdateModal(false);
    setSelectedEventCategory(null);
    if (updated) {
      setShowSuccessMessage(true);
    }
    if (errorMessage) {
      setBackendError(errorMessage);
    }
  };

  const handleCreateModalClose = (created, errorMessage = null) => {
    setOpenCreateModal(false);
    if (created) {
      setShowSuccessMessage(true);
    }
    if (errorMessage) {
      setBackendError(errorMessage);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventCategories.map((eventCategory) => (
            <TableRow key={eventCategory.id}>
              <TableCell>{eventCategory.name}</TableCell>
              <TableCell>
                <img src={eventCategory.imageUrl} alt={eventCategory.name} style={{ width: '100px', height: '100px' }} />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleUpdate(eventCategory)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(eventCategory)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedEventCategory && (
        <>
          <DeleteConfirmationDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            category={selectedEventCategory}
            handleSuccessMessageClose={() => setShowSuccessMessage(false)}
          />
          <UpdateCategoryModal
            open={openUpdateModal}
            onClose={(updated, errorMessage) => handleModalClose(updated, errorMessage)}
            category={selectedEventCategory}
            onUpdateSuccess={() => handleModalClose(true)}
            showSuccessMessage={showSuccessMessage}
            setShowSuccessMessage={setShowSuccessMessage}
            backendError={backendError}
          />
        </>
      )}
      <CreateCategoryModal
        open={openCreateModal}
        handleClose={(created, errorMessage) => handleCreateModalClose(created, errorMessage)}
        handleSuccessMessageClose={() => setShowSuccessMessage(false)}
        backendError={backendError}
      />

      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={5000}
          onClose={() => setShowSuccessMessage(false)}
          message="Operation successful"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            backgroundColor: '#4caf50',
            color: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px',
          }}
        />
      )}
    </TableContainer>
  );
};

export default EventCategoryTable;
