import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventCategories } from '../store/categories/categorySlice';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import CategoryCard from '../components/Category/CategoryCard';

function Categories() {
  const dispatch = useDispatch();
  const { eventCategories, status, error } = useSelector(state => state.eventCategories);

  useEffect(() => {
    dispatch(fetchEventCategories());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" component="h1">Categories</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: '16px' }}>
        {eventCategories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <CategoryCard
              id={category.id}
              name={category.name}
              // desc={category.desc}
              // image={category.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Categories;
