// components/EventCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function EventCard({ id, name, desc, date, image }) {
  return (
    <Card>
      <CardMedia component="img" alt={name} height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;
