import React from 'react';
import { Box, Typography } from '@mui/material';

const Container = ({ title, children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      overflow="hidden"
      marginBottom="100px"
    >
      <Typography variant="h4" marginBottom="64px">
        {title}
      </Typography>
      <Box marginBottom="48px">{children}</Box>
    </Box>
  );
};

export default Container;
