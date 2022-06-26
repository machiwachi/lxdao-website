import React from 'react';
import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const SectionMission = () => (
  <Container title={t`lxdao-mission-title`}>
    <Box
      marginX="80px"
      marginY="100px"
      backgroundColor="#F9FAFB"
      padding="24px"
      borderRadius="8px"
    >
      <Typography fontSize="30px" lineHeight="50px" textAlign="center">
        Bringing together buidlers to buidl and maintain &quot;LX&quot; projects
        for Web3,
      </Typography>
      <Typography fontSize="30px" lineHeight="50px" textAlign="center">
        in a sustainable manner.
      </Typography>
    </Box>
    <Box
      marginX="80px"
      marginY="80px"
      backgroundColor="#F9FAFB"
      padding="24px"
      borderRadius="8px"
    >
      <Typography fontSize="30px" lineHeight="50px" textAlign="center">
        LXDAO is mainly made by Web Developers, Designers, PMs, etc.
      </Typography>
      <Typography fontSize="30px" lineHeight="50px" textAlign="center">
        We like and are good at building high-quality Web Projects.
      </Typography>
    </Box>
  </Container>
);

export default SectionMission;
