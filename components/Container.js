import React from 'react';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const Container = ({ children, maxWidth, ...rest }) => (
  <Box
    maxWidth={maxWidth || '100%'}
    width="100%"
    paddingX={{ md: 10, xs: 2 }}
    boxSizing="border-box"
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
