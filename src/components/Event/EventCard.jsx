import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/EventCard.css';

const EventCard = ({ id, name, description, startDate, category }) => {
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  return (
    <Card className="event-card">
      <CardContent className="card-content">
        <Typography variant="h5" component="div" className="event-title">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="event-description">
         {category}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="event-date">
          Start Date: {formattedStartDate}
        </Typography>
      </CardContent>
      <Box className="hover-cover">
        <Link to={`/events/${id}`} className="hover-link">
          <Typography variant="h6" component="div" className="hover-text">
            Click for more details
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default EventCard;
