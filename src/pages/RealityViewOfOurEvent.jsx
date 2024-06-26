import React from 'react';
import { Box, Typography, Grid, CardMedia, IconButton, Paper } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image1 from '../assets/realityimage/image1.jpeg';
import Image2 from '../assets/realityimage/image2.jpeg';
import Image3 from '../assets/realityimage/image3.jpeg';
import Image4 from '../assets/realityimage/image4.jpeg';
import Image5 from '../assets/realityimage/image5.jpeg';

const images = [Image1, Image2, Image3, Image4, Image5];

const RealityViewOfOurEvent = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true, // Add fade effect for transition
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: 2, maxWidth: '1600px', margin: 'auto', backgroundColor: 'inherit' }}>
      <Box sx={{ maxWidth: '90%', textAlign: 'center', mx: 'auto', mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h2"
          component="h1"
          sx={{ 
            fontWeight: 700, 
            letterSpacing: '2px', 
            color: '#151e27', 
            backgroundImage: 'linear-gradient(45deg, #901b20, #ff6b6b)',
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginBottom: '50px',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            marginTop: { xs: '20px', md: '30px' },
          }}
        >
          Reality View of Our Event
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ maxWidth: '90%', mx: 'auto' }}>
        <Grid item xs={12} md={7} sx={{ marginBottom: { xs: 4, md: 0 } , marginTop: '100px' }}>
          <Box sx={{ position: 'relative', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', borderRadius: '8px', overflow: 'hidden' }}>
            <Slider ref={sliderRef} {...settings}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', paddingTop: '66.66%' }}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Event Image ${index + 1}`}
                    sx={{
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.5s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
              ))}
            </Slider>
            <IconButton
              onClick={handlePrevious}
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '10px', 
                transform: 'translateY(-50%)', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                color: '#fff', 
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
                '@media (max-width: 600px)': {
                  left: '5px', 
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                right: '10px', 
                transform: 'translateY(-50%)', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                color: '#fff', 
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
                '@media (max-width: 600px)': {
                  right: '5px', 
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: { xs: 2, md: 4 }, borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="body1" sx={{ color: '#151e27', fontSize: { xs: '1.2rem', md: '1.4rem' }, lineHeight: '2' }}>
              This is a sneak peek into our events where we combine fun and learning in an exciting way. At ITI Egypt, we host a variety of events that are both educational and enjoyable, providing opportunities to grow and network with like-minded individuals. Our events are meticulously planned to ensure that every participant gains valuable insights and has a memorable experience.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RealityViewOfOurEvent;
