import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';

const partnersData = [
  {
    name: 'NextDAO',
    logo: '/images/partners/nextdao-logo.svg',
    link: 'https://twitter.com/theNextDAO',
  },
  {
    name: 'ELEDUCK',
    logo: '/images/partners/eleduck-logo.svg',
    link: 'https://eleduck.com/',
  },
  {
    name: 'MobyMask',
    logo: '/images/partners/mobymask-logo.svg',
    link: 'https://mobymask.com/',
  },
  {
    name: 'MoleDAO',
    logo: '/images/partners/moledao-logo.svg',
    link: 'https://www.moledao.io/',
  },
  {
    name: 'MarsDAO',
    logo: '/images/partners/marsdao-logo.svg',
    link: 'https://linktr.ee/MarsDAO',
  },
  {
    name: 'EthSign',
    logo: '/images/partners/ethsign-logo.svg',
    link: 'https://www.ethsign.xyz/',
  },
  {
    name: 'Plancker',
    logo: '/images/partners/plancker-logo.svg',
    link: 'https://plancker.org/',
  },
  {
    name: '8dao',
    logo: '/images/partners/8dao-logo.svg',
    link: 'https://8dao.io/',
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
