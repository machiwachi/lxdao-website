import React from 'react';
import { Box, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Button = ({ variant, children, ...rest }) => (
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
      borderRadius: '6px',
      border: variant === 'outlined' ? '1px solid #000000' : 'none',
      outline: 'none',
      padding: '12px 20px',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      background:
        variant === 'outlined'
          ? '#ffffff'
          : variant === 'gradient'
          ? 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)'
          : '#000000',
    }}
    {...rest}
  >
    {children}
  </Box>
);

export default Button;
