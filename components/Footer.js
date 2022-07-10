import React from 'react';
import { Box } from '@mui/material';

const Footer = () => (
  <Box
    display="flex"
    width="100%"
    height="198px"
    justifyContent="center"
    alignItems="center"
    backgroundColor="#f9f9f9"
    borderTop="1px solid #F2F4F7"
  >
    <Box width="160px" component={'img'} src={'/images/build-in-lxdao.png'} />
  </Box>
);

export default Footer;
