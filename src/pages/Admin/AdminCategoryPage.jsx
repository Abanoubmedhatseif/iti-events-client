import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import AdminNavbar from '../../components/AdminNavbar';
import CategoryTable from '../../components/Category/CategoryTable';
import CreateCategoryModal from '../../components/Category/CreateCategoryModal';
import Button from '../../components/Button'; // Assuming this is a custom Button component

const AdminCategoryPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCategory = () => {
    setOpen(true);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={4} mb={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="white"
            text="Create Category"
            onClick={handleCreateCategory}
            width={200} 
            height={60} 
            fontSize={100} 
            margin="0" 
            padding="10px" 
            backgroundColor="#901b20b3"
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CategoryTable />
          </Grid>
        </Grid>
        <CreateCategoryModal open={open} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default AdminCategoryPage;
