import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function EventCard({ id, name, description, startDate }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/events/${id}`}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {startDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventCard;