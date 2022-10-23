import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

import Container from '@/components/Container';

const workingGroupsData = [
  {
    image: '/images/workingGroups/governance-group.svg',
    name: 'Governance Group',
    link: 'https://www.notion.so/lxdao/Governance-Group-a3886d112d3b45c8a4fad6c178e2846b',
  },
  {
    image: '/images/workingGroups/onboarding-committee.svg',
    name: 'Onboarding Committee',
    link: 'https://www.notion.so/lxdao/Onboarding-Committee-680a0a9e034d482db273f24760d93f83',
  },
  {
    image: '/images/workingGroups/LXDAO-tools.svg',
    name: 'LXDAO Tools',
    link: 'https://www.notion.so/lxdao/LXDAO-Tools-5425810ff08e42d9913d74a2a883d9c2',
  },
  {
    image: '/images/workingGroups/LXDAO-dataCenter.svg',
    name: 'LXDAO DataCenter',
    link: 'https://www.notion.so/lxdao/LXDAO-DataCenter-40dfb4928f734c8eab0919490881d013',
  },
];

const WorkingGroupBox = ({ image, name, link }) => {
  return (
    <Grid item xs={6} sm={6} md={6} lg={4}>
      <Link href={link} sx={{ textDecoration: 'none' }}>
        <Box
          backgroundColor="#F5F5F5"
          height="160px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px 6px 0 0"
        >
          <Box component="img" src={image} />
        </Box>
        <Typography
          variant="body1"
          lineHeight="19px"
          fontWeight={600}
          backgroundColor="#ffffff"
          padding="20px 24px"
          borderRadius="0 0 6px 6px"
        >
          {name}
        </Typography>
      </Link>
    </Grid>
  );
};

const SectionWorkingGroup = () => (
  <Box width="100%" backgroundColor="#36AFF9">
    <Container paddingY={{ md: '112px' }} margin="0 auto">
      <Typography
        variant="h2"
        lineHeight="58px"
        fontWeight="600"
        color="#ffffff"
        marginBottom={8}
      >
        LXDAO Working Group
      </Typography>
      <Grid container spacing={2}>
        {workingGroupsData.map((group, index) => {
          return <WorkingGroupBox key={index} {...group} />;
        })}
      </Grid>
    </Container>
  </Box>
);

export default SectionWorkingGroup;
