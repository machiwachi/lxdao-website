import React from 'react';
import { Box } from '@mui/material';

const Button = ({ children }) => (
  <Box
    backgroundColor="#000000"
    padding="12px 20px"
    outline="none"
    border="none"
    borderRadius="8px"
    color="#ffffff"
    sx={{
      cursor: 'pointer',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    }}
  >
    {children}
  </Box>
);

export default Button;
