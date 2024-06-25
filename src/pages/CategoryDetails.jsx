import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/system';
import { fetchEventCategoryDetails, fetchCategoryEvents } from '../store/categories/categorySlice';
import EventCard from '../components/Event/EventCard'; // Assuming EventCard is correctly implemented in its own file
import defaultImage from '../assets/sessions-hero.jpg';

const CategoryInfoCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '400px', // Updated minimum height for the card
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div" sx={{ marginLeft: '16px' }}>Loading...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" component="div" sx={{ color: 'error.main' }}>Error: {error}</Typography>
      </Box>
    );
  }

  if (!eventCategory) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" component="div" sx={{ color: 'text.secondary' }}>Category not found.</Typography>
      </Box>
    );
  }

  const categoryImage = eventCategory.imageUrl || defaultImage;

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px', paddingBottom: '30px' }}>
      <Grid container spacing={3}>
        {/* Category Information */}
        <Grid item xs={12} md={5}>
          <CategoryInfoCard elevation={3}>
            <CardMedia
              component="img"
              image={categoryImage}
              alt={eventCategory.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' }}
            />
            <CardContent sx={{ padding: '20px', flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: theme => theme.spacing(2) }}>
                {eventCategory.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {eventCategory.desc}
              </Typography>
              {/* Additional Content Placeholder */}
              <Typography variant="body2" color="textSecondary">
              </Typography>
            </CardContent>
          </CategoryInfoCard>
        </Grid>

        {/* Events in this Category */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: '20px', marginTop: '10px', textAlign: 'center' }}>
            Discover Events
          </Typography>
          <Grid container spacing={3}>
            {categoryEvents.length > 0 ? (
              categoryEvents.map(event => (
                <Grid item xs={12} sm={6} key={event.id}>
                  <EventCard
                    id={event.id}
                    name={event.name}
                    // description={event.description}
                    startDate={event.startDate}
                    // category={event.category}
                    sx={{
                      height: '100%',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  No events found for this category.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryDetails;
