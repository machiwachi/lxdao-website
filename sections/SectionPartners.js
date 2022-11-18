import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';

const partnersData = [
  {
    name: 'NextDAO',
    logo: '/images/partners/nextdao-logo.svg',
    link: 'https://twitter.com/theNextDAO',
  },
];

const SectionPartners = () => (
  <Box width="100%">
    <Container paddingY={{ md: '112px', xs: 8 }} margin="0 auto">
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="64px"
      >
        <Typography variant="h2" lineHeight="58px" fontWeight={600}>
          Our Partners
        </Typography>
        <Box
          display="flex"
          gap={3}
          flexWrap="wrap"
          justifyContent={{ md: 'center', sm: 'center', xs: 'center' }}
        >
          {partnersData.map((partner, index) => {
            return (
              <Link href={partner.link} target="_blank" key={index}>
                <Box component={'img'} src={partner.logo} />
              </Link>
            );
          })}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default SectionPartners;
