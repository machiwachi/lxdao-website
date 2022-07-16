import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const SectionMission = () => (
  <Box backgroundColor="#F9FAFB" width="100%">
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      maxWidth="1200px"
      margin="0 auto"
    >
      <Typography marginBottom={{ md: 6, xs: 4 }} fontSize="20px">
        Our Vision & Consensus
      </Typography>
      <Typography variant="h4">
        The technologies, concepts, and ideas of Web3 will be used by a billion
        people in a decade.
      </Typography>
    </Container>
  </Box>
);

export default SectionMission;
