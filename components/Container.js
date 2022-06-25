import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Container({ title, children }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4">{title}</Typography>
      <Box marginBottom="48px">{children}</Box>
    </Box>
  );
}
