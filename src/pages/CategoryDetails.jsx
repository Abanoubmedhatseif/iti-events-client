// CategoryDetails.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid } from '@mui/material';
import { fetchCategoryDetails } from '../store/categories/categoryDetailsSlice';
import CategoryCard from '../components/CategoryCard';

function CategoryDetails() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector(state => state.categoryDetails);

  useEffect(() => {
    dispatch(fetchCategoryDetails(categoryId)); 
  }, [dispatch, categoryId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div">Error: {error}</Typography>
      </div>
    );
  }

  if (!category) {
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
            id={category.id}
            name={category.name}
            desc={category.desc}
            image={category.image}
            style={{ width: '100%', height: 'auto' }} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryDetails;
