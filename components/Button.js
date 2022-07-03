import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Button = ({ variant, children }) => (
  <Box
    backgroundColor={variant === 'outlined' ? '#ffffff' : '#000000'}
    padding="12px 20px"
    outline="none"
    border="1px solid #000000"
    borderRadius="8px"
    color={variant === 'outlined' ? '#000000' : '#ffffff'}
    sx={{
      cursor: 'pointer',
      '&:hover': {
        backgroundColor:
          variant === 'outlined' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.8)',
      },
    }}
  >
    {children}
  </Box>
);

export default Button;
