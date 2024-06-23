// CategoryDetails.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid } from '@mui/material';
import { fetchEventCategoryDetails } from '../store/categories/categorySlice';
import CategoryCard from '../components/Category/CategoryCard';

function CategoryDetails() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { eventCategory, status, error } = useSelector(state => state.eventCategories);

  useEffect(() => {
    dispatch(fetchEventCategoryDetails(categoryId));
  }, [dispatch, categoryId]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Error: {error}</Typography>
      </div>
    );
  }

  if (!eventCategory) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Category not found.</Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <CategoryCard
            id={eventCategory.id}
            name={eventCategory.name}
            desc={eventCategory.desc} // Assuming desc is a property in your category object
            // image={eventCategory.image} // Assuming image is a property in your category object
            style={{ width: '100%', height: 'auto' }} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryDetails;
