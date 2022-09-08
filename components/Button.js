import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Button = ({ variant, size, children, ...rest }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      cursor: 'pointer',
      '&:hover': {
        backgroundColor:
          variant === 'outlined' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.8)',
      },
      color: variant === 'outlined' ? '#000000' : '#ffffff',
      borderRadius: '8px',
      border: variant === 'outlined' ? '1px solid #000000' : 'none',
      outline: 'none',
      padding: size === 'large' ? '22px 63px' : '12px 20px',
      background:
        variant === 'outlined'
          ? '#ffffff'
          : variant === 'gradient'
          ? 'linear-gradient(90deg, rgba(41,117,223,1) 0%, rgba(58,207,227,1) 100%)'
          : '#000000',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Button;
