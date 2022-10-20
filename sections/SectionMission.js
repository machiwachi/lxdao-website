import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';

const DataBox = ({ number, name, link }) => (
  <Box
    sx={{
      border: '0.5px solid #ffffff',
      borderRadius: '6px',
      background: 'transpant',
    }}
    flex={1}
    display="flex"
    flexDirection="column"
    alignItems="center"
    gap={2}
    paddingY="30px"
  >
    <Typography variant="h3" lineHeight="51px" fontWeight={700}>
      {number}
    </Typography>
    <Link
      target="_blank"
      href={link}
      color="#ffffff"
      sx={{ textDecoration: 'none' }}
    >
      <Typography variant="subtitle1" lineHeight="25px" fontWeight={400}>
        {name} →
      </Typography>
    </Link>
  </Box>
);

const SectionMission = () => (
  <Box
    sx={{ background: 'linear-gradient(90deg, #2A76DF 0%, #0FDBC2 100%)' }}
    width="100%"
    color="#ffffff"
  >
    <Container paddingY={{ md: '112px', xs: 8 }} margin="0 auto">
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        gap="64px"
      >
        <Typography variant="subtitle1" lineHeight="60px" fontWeight={500}>
          Our Mission
        </Typography>
        <Typography variant="h2" lineHeight="70px" fontWeight={500}>
          Bringing together buidlers to buidl and maintain “LX” projects for
          Web3, in a sustainable manner.
        </Typography>
        <Box display="flex" gap={2}>
          <DataBox number="12+" name="Buidlers" link="" />
          <DataBox number="6+" name="Projects" link="" />
          <DataBox number="16k+ USDC" name="Treasury" link="" />
        </Box>
      </Box>
    </Container>
  </Box>
);

export default SectionMission;
