import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';

const communitiesData = [
  {
    name: 'NextDAO',
    logo: '/images/partners/nextdao-logo.svg',
    link: 'https://twitter.com/theNextDAO',
  },
  {
    name: 'GCC',
    logo: '/images/partners/gcc-logo.svg',
    link: 'https://www.gccofficial.org/',
  },
  {
    name: 'PlanckerDAO',
    logo: '/images/partners/Plancker-logo.svg',
    link: 'https://plancker.org/',
  },
  {
    name: 'DAOStar',
    logo: '/images/partners/DAOStar-logo.svg',
    link: 'https://daostar.org/',
  },
  {
    name: 'MoleDAO',
    logo: '/images/partners/moledao-logo.svg',
    link: 'https://linktr.ee/moledao',
  },
  {
    name: 'MarsDAO',
    logo: '/images/partners/marsdao-logo.svg',
    link: 'https://linktr.ee/MarsDAO',
  },
  {
    name: 'EthSign',
    logo: '/images/partners/ethsign-logo.svg',
    link: 'https://linktr.ee/SignProtocol',
  },
  {
    name: '8dao',
    logo: '/images/partners/8dao-logo.svg',
    link: 'https://8dao.io/',
  },
  {
    name: 'Uncommons',
    logo: '/images/partners/Uncommons-logo.svg',
    link: 'https://www.notion.so/Uncommons-04ea0224d3cd4fe9b5181b6dd22d02b4',
  },
  {
    name: 'AAStar',
    logo: '/images/partners/AAStar-logo.svg',
    link: 'https://www.aastar.xyz/',
  },
];

const sponsorshipsData = [
  {
    name: 'Ethereum Foundation',
    logo: '/images/partners/ethereumFoundation-logo.svg',
    link: 'https://esp.ethereum.foundation/',
  },
  {
    name: 'Optimism',
    logo: '/images/partners/optimism-logo.svg',
    link: 'https://www.optimism.io/',
  },
  {
    name: 'Filecoin Foundation',
    logo: '/images/partners/filecoinFoundation-logo.svg',
    link: 'https://fil.org/',
  },
  {
    name: 'MetaMask',
    logo: '/images/partners/mobymask-logo.svg',
    link: 'https://mobymask.com/',
  },
  {
    name: 'Mask Network',
    logo: '/images/partners/mask-logo.svg',
    link: '	https://mask.io/',
  },
  {
    name: 'Gitcoin',
    logo: '/images/partners/gitcoin-logo.svg',
    link: 'https://www.gitcoin.co/',
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
          Sponsorships
        </Typography>
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent={{ md: 'center', sm: 'center', xs: 'center' }}
        >
          {sponsorshipsData.map((partner, index) => {
            return (
              <Link href={partner.link} target="_blank" key={index}>
                <Box component={'img'} src={partner.logo} />
              </Link>
            );
          })}
        </Box>
        <Typography variant="h2" lineHeight="58px" fontWeight={600}>
          Our Partners & Community
        </Typography>
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent={{ md: 'center', sm: 'center', xs: 'center' }}
        >
          {communitiesData.map((partner, index) => {
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
