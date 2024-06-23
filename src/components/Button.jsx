import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text, backgroundColor, color, width, height, fontSize, onClick, margin, padding }) => {
  return (
    <MuiButton
      variant="contained"
      style={{
        backgroundColor,
        color,
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}%`,
        margin: margin || '0', 
        padding: padding || '8px 16px',
      }}
      onClick={onClick} 
    >
      {text}
    </MuiButton>
  );
};

export default Button;
