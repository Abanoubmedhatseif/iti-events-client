import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const CategoryCard = ({ id, name, image, style }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/categories/${id}`}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ width: '100%', height: '220px', objectFit: 'cover' }}  // Set fixed size and object fit
          style={style}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
