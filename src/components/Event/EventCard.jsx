import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const EventCardContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: '#d0d0d0', // Gray background
  color: '#901b20', // Text and accent color
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const EventCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const EventCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const EventCardDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const EventCardDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginTop: 'auto', // Ensures date is positioned at the bottom of the card
}));

const HoverCover = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black for hover effect
  padding: theme.spacing(2),
  borderBottomLeftRadius: theme.spacing(2),
  borderBottomRightRadius: theme.spacing(2),
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#901b20', // Accent color on hover
    color: 'white', // Text color on hover
  },
}));

const HoverLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
}));

const HoverText = styled(Typography)(({ theme }) => ({
  color: 'white', // White text color
  fontWeight: 600,
}));

const EventCard = ({ id, name, description, startDate, category }) => {
  // Format start date
  const formattedStartDate = new Date(startDate).toLocaleDateString();

  return (
    <EventCardContainer>
      <EventCardContent>
        <EventCardTitle>{name}</EventCardTitle>
        <EventCardDescription>{category}</EventCardDescription>
        <EventCardDate>Start Date: {formattedStartDate}</EventCardDate>
      </EventCardContent>
      <HoverCover>
        <HoverLink to={`/events/${id}`}>
          <HoverText variant="h6">Click for more details</HoverText>
        </HoverLink>
      </HoverCover>
    </EventCardContainer>
  );
};

export default EventCard;
