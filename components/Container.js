import React from 'react';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const Container = ({ children, minHeight, ...rest }) => (
  <Box
    minHeight={minHeight}
    width="1216px"
    boxSizing="border-box"
    marginX={'auto'}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
