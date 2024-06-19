import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text, backgroundColor, color, width, height, fontSize }) => {
  return (
    <MuiButton
      variant="contained"
      style={{
        backgroundColor,
        color,
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}%`,
      }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
