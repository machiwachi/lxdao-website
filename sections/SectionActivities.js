import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';

const ActivityItem = ({ title, link, date }) => {
  return (
    <Link
      href={link}
      target="_blank"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '26px',
        background: '#ffffff',
        textDecoration: 'none',
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
      }}
    >
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          wordWrap: 'break-word',
        }}
        width={{ lg: '980px', md: '750px', sm: '480px', xs: '220px' }}
      >
        {title}
      </Typography>
      <Typography>{date}</Typography>
    </Link>
  );
};

const activitiesData = [
  {
    title:
      'LXP should be ERC20 SBT tokens?LXP should be ERC20 SBT tokens?LXP should be ERC20 SBT tokens?LXP should be ERC20 SBT tokens?',
    link: 'https://forum.lxdao.io/t/lxp-should-be-erc20-sbt-tokens/227',
    date: 'Oct 19',
  },
  {
    title: 'Simple donation solution or dapp in Web3?',
    link: 'https://forum.lxdao.io/t/simple-donation-solution-or-dapp-in-web3/53/10',
    date: 'Jul 27',
  },
  {
    title: 'The next version of MyFirstNFT?',
    link: 'https://forum.lxdao.io/t/the-next-version-of-myfirstnft/66/2',
    date: 'Jul 28',
  },
];

const SectionActivities = () => {
  return (
    <Box backgroundColor="#F1F1F1" width="100%">
      <Container
        paddingY={{ md: '112px', xs: 8 }}
        margin="0 auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={8}
      >
        <Typography variant="h2" lineHeight="58px" fontWeight={600}>
          LXDAO Activities
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          {activitiesData.map((activity, index) => {
            return <ActivityItem {...activity} key={index} />;
          })}
        </Box>
        <Button width="200px" variant="outlined">
          View More
        </Button>
      </Container>
    </Box>
  );
};

export default SectionActivities;
