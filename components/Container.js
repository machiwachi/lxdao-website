import React from 'react';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const Container = ({ children, maxWidth, minHeight, ...rest }) => (
  <Box
    maxWidth={maxWidth || '1220px'}
    minHeight={minHeight}
    width="100%"
    paddingX={{ md: 4, xs: 2 }}
    boxSizing="border-box"
    marginX={'auto'}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
