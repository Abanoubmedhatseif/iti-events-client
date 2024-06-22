import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Hero.css';  // Import the CSS file

import backgroundImage1 from '../assets/sessions-hero.jpg';
import backgroundImage2 from '../assets/school-hero.jpg';
import backgroundImage3 from '../assets/compition-hero.jpg';

const slides = [
  {
    image: backgroundImage1,
    title: 'Empower Your Career with ITI',
    // description: 'Slide 1 Description',
  },
  {
    image: backgroundImage2,
    title: 'Stay Updated with ITI Events',
    // description: 'Slide 2 Description',
  },
  {
    image: backgroundImage3,
    title: 'Explore Cutting-edge Tech Events',
    // description: 'Slide 3 Description',
  },
];

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,           
        autoplaySpeed: 1500,      
        arrows: true,
      };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
