import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { fetchEventCategoryDetails, fetchCategoryEvents } from '../store/categories/categorySlice';
import EventCard from '../components/Event/EventCard'; // Adjust the path as needed

function CategoryDetails() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { eventCategory, categoryEvents, status, error } = useSelector(state => state.eventCategories);

  useEffect(() => {
    dispatch(fetchEventCategoryDetails(categoryId));
    dispatch(fetchCategoryEvents(categoryId));
  }, [dispatch, categoryId]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" component="div" style={{ marginLeft: '16px' }}>Loading...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" component="div">Error: {error}</Typography>
      </Box>
    );
  }

  if (!eventCategory) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" component="div">Category not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card>
        <CardMedia
          component="img"
          image={eventCategory.imageUrl} // Assuming imageUrl is a property in your category object
          alt={eventCategory.name}
          sx={{ width: '90%', height: '320px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {eventCategory.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {eventCategory.desc}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" component="div" style={{ marginTop: '20px' }}>
        Events in this Category
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '10px' }}>
        {categoryEvents.length > 0 ? (
          categoryEvents.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard 
                id={event.id} 
                name={event.name} 
                desc={event.description} 
                date={event.startDate} 
                // image={event.imageUrl} 
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
            No events found for this category.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default CategoryDetails;