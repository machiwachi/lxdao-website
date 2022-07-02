import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const coreTeamData = [
  {
    name: 'Bruce Xu',
    title: 'Senior Web Developer, 9yrs',
    description: 'Ex-Alibaba, FullStack, PM',
    avatarUrl: '/images/bruce.jpeg',
  },
  {
    name: 'Kuncle',
    title: 'Data infra lead, 8yrs',
    description: 'Ex-Alibaba, BigData',
    avatarUrl: '/images/kuncle.jpeg',
  },
  {
    name: 'Satoshi Natsu',
    title: 'Entrepreneur',
    description: 'Business/legal support',
    avatarUrl: '/images/satoshi.jpeg',
  },
  {
    name: 'Yootou',
    title: 'Senior Web Developer, 13yrs',
    description: 'Ex-Alibaba, FullStack, PM',
    avatarUrl: '/images/yootou.png',
  },
  {
    name: 'Muxin',
    title: 'Senior Web Developer, 7yrs',
    description: 'Ex-Alibaba, FrontEnd',
    avatarUrl: '/images/muxin.jpeg',
  },
  {
    name: 'Designer',
    title: 'Good at UI/UX design',
    description: '',
    avatarUrl: '/images/designer.png',
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
    <Typography fontSize="18px" lineHeight="28px" color="#101828">
      {data.name}
    </Typography>
    <Typography marginBottom="8px" color="#305FE8">
      {data.title}
    </Typography>
    <Typography>{data.description}</Typography>
  </Box>
);

const SectionCoreTeam = () => (
  <Box
    paddingY={{ md: '96px', xs: 8 }}
    paddingX={{ md: 10, xs: 6 }}
    textAlign="center"
    id="CoreTeam-Section"
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
  </Box>
);

export default SectionCoreTeam;
