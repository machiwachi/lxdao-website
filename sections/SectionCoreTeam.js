import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Container from '@/components/Container';

import coreTeamData from '@/common/content/coreTeam';

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
    {data.twitter && (
      <Typography
        marginTop="4px"
        target="_blank"
        component="a"
        href={'https://twitter.com/' + data.twitter}
        color="primary"
      >
        <Box width="32px" component={'img'} src={'/icons/twitter.svg'} />
      </Typography>
    )}
  </Box>
);

const SectionCoreTeam = () => (
  <Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="CoreTeam-Section"
    maxWidth="1200px"
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
