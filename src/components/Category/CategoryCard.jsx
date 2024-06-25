import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import defaultImage from '../../assets/sessions-hero.jpg'; // Adjust the path as necessary

const CategoryCard = ({ id, name, image }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        borderRadius: '15px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        overflow: 'hidden',
      }}
    >
      <CardActionArea component={Link} to={`/categories/${id}`}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.5)',
              zIndex: 1,
              opacity: 0,
              transition: 'opacity 0.3s',
            },
            '&:hover::before': {
              opacity: 1,
            },
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={image || defaultImage}
            alt={name}
            sx={{
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Box>
        <CardContent
          sx={{
            textAlign: 'center',
            padding: '16px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 100%)',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {name}
          </Typography>
          {/* Add any additional content or description here */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
