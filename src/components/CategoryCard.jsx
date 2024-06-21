import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const CategoryCard = ({ id, name, desc, image , style}) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/categories/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          style={style} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
