import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text, backgroundColor, color, width, height, fontSize, onClick, margin, padding, type }) => {
  return (
    <MuiButton
      variant="contained"
      style={{
        backgroundColor,
        color,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        fontSize: fontSize ? `${fontSize}%` : '100%',
        margin: margin || '0',
        padding: padding || '8px 16px',
      }}
      onClick={onClick}
      type={type}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
