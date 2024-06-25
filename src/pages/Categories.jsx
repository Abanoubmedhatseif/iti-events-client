import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventCategories } from '../store/categories/categorySlice';
import { Grid, Container, Typography, CircularProgress, Box } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
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
    <Container style={{ paddingTop: '10px', paddingBottom: '20px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center" mt={1} mb={2}>
            <CategoryIcon fontSize="large" style={{ marginRight: '8px', color: '#901b20' }} />
            <Typography 
              variant="h3" 
              component="h1" 
              style={{ 
                fontWeight: 700, 
                letterSpacing: '2px', 
                color: '#151e27', 
                background: 'linear-gradient(45deg, #901b20, #ff6b6b)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}
            >
              Explore Our Categories
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: '10px' }}>
        {eventCategories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <CategoryCard
              id={category.id}
              name={category.name}
              image={category.imageUrl}  // Pass the image URL here
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Categories;
