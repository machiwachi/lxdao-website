import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Container({ title, children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX="80px"
      width="100%"
    >
      <Typography variant="h4" marginBottom="64px">
        {title}
      </Typography>
      <Box marginBottom="48px">{children}</Box>
    </Box>
  );
}
