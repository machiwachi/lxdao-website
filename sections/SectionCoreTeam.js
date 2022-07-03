import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const coreTeamData = [
  {
    name: 'Bruce Xu',
    title: 'PM / FullStack Developer',
    description: 'Ex-Alibaba, FullStack, 9yrs',
    twitter: 'brucexu_eth',
    avatarUrl: '/images/bruce.jpeg',
  },
  {
    name: 'Yootou',
    title: 'PM / FullStack Developer',
    description: 'Ex-Alibaba, FullStack, 13yrs',
    twitter: '0xYootou',
    avatarUrl: '/images/yootou.png',
  },
  {
    name: 'Kuncle',
    title: 'Big Data Developer',
    description: 'Ex-Alibaba, Data Infra, 8yrs',
    twitter: 'KingsUncle1',
    avatarUrl: '/images/kuncle.jpeg',
  },
  {
    name: 'Satoshi Natsu',
    title: 'Business / Legal support',
    description: 'Entrepreneur',
    twitter: 'satoshi_natsu',
    avatarUrl: '/images/satoshi.jpeg',
  },

  {
    name: 'Muxin',
    title: 'FrontEnd / Assistant',
    description: 'Ex-Alibaba, FrontEnd, 7yrs',
    twitter: 'muxin_eth',
    avatarUrl: '/images/muxin.jpeg',
  },
  {
    name: 'Teng Wang',
    title: 'Designer',
    description: 'UI/UX Designer, 7yrs',
    twitter: 'goodtombetter',
    avatarUrl: '/images/wang.png',
  },
  {
    name: 'Mrzzz',
    title: 'Product Design / Operation',
    description: '3D Animation Artist, 4yrs',
    twitter: 'Bitzack_01',
    avatarUrl: '/images/mrzzz.jpg',
  },
];

const TeamMemberCard = ({ data }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box marginBottom="20px">
      <img
        width={80}
        height={80}
        src={data.avatarUrl}
        style={{ borderRadius: '50%' }}
      />
    </Box>
    <Typography variant="h6" lineHeight="28px" color="#101828">
      {data.name}
    </Typography>
    <Typography marginTop={1} color="#305FE8">
      {data.title}
    </Typography>
    <Typography>{data.description}</Typography>
    <Typography
      marginTop="4px"
      target="_blank"
      component="a"
      href={'https://twitter.com/' + data.twitter}
      color="primary"
    >
      <Box width="32px" component={'img'} src={'/icons/twitter.svg'} />
    </Typography>
  </Box>
);

const SectionCoreTeam = () => (
  <Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="CoreTeam-Section"
    maxWidth
  >
    <Typography variant="h4">LXDAO Foundation Core Team</Typography>
    <Typography fontSize="20px" marginTop={2}>
      We’re buidling our SBT-based membership system, and will onboard more.
    </Typography>
    <Box marginTop="96px">
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {coreTeamData.map((data, index) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <TeamMemberCard data={data} key={index} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  </Container>
);

export default SectionCoreTeam;
