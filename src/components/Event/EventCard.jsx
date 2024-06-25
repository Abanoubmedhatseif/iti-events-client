import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomCard = styled(Card)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transition: 'background-color 0.3s ease',
  },
  maxWidth: 400, // Increased width
  margin: theme.spacing(2),
}));

function EventCard({ id, name, description, startDate }) {
  return (
    <CustomCard>
      <CardActionArea component={Link} to={`/events/${id}`}>
        <CardContent sx={{ minHeight: 200, textAlign: 'center' }}> {/* Centered text */}
          <Typography 
            gutterBottom 
            variant="h4" 
            component="div" 
            sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} // Bold name
          >
            {name}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ fontSize: '1.2rem', mb: 1 }}
          >
            {description}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ fontSize: '1.1rem' }}
          >
            {new Date(startDate).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
}

export default EventCard;
