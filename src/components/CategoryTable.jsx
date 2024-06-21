import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import UpdateCategoryModal from './UpdateCategoryModal';

const dummyCategories = [
  { id: 1, name: 'Category 1', desc: 'Description 1', image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Category 2', desc: 'Description 2', image: 'https://via.placeholder.com/100' }
];

const CategoryTable = ({ categories = dummyCategories }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell>Description</TableCell> */}
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              {/* <TableCell>{category.desc}</TableCell> */}
              <TableCell>
                <img src={category.image} alt={category.name} style={{ width: '100px' }} />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleUpdate(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(category)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedCategory && (
        <>
          <DeleteConfirmationDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            category={selectedCategory}
          />
          <UpdateCategoryModal
            open={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            category={selectedCategory}
          />
        </>
      )}
    </TableContainer>
  );
};

export default CategoryTable;
