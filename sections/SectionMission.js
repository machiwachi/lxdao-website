import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionMission = () => (
  <Box
    backgroundColor="#F9FAFB"
    paddingY={{ md: '96px', xs: 8 }}
    paddingX={{ md: 10, xs: 6 }}
    textAlign="center"
  >
    <Typography marginBottom={{ md: 6, xs: 4 }} fontSize="20px">
      Our Vision & Consensus
    </Typography>
    <Typography variant="h3">
      The technologies, concepts and ideas of Web3 will be used by a billion
      people in a decade.
    </Typography>
  </Box>
);

export default SectionMission;
