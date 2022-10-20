import React from 'react';
import { Box } from '@mui/material';
import Container from '@/components/Container';

const SectionHero = ({ leftContent, rightContent }) => {
  return (
    <Container
      // height="calc(100vh - 81px)"
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ lg: 'flex-start', xs: 'center' }}
        textAlign={{ lg: 'left', xs: 'center' }}
      >
        {leftContent}
      </Box>
      <Box>{rightContent}</Box>
    </Container>
  );
};

export default SectionHero;
