import React from 'react';
import { Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {children}
    </Box>
  );
}
