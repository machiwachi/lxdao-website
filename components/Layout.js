import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from '@lingui/macro';

export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {children}
    </Box>
  );
}
