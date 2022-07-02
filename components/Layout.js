import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {children}
    </Box>
  );
}
