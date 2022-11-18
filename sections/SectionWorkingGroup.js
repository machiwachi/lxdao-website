import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

import Container from '@/components/Container';
import WorkingGroupCard from '@/components/WorkingGroupCard';

import workingGroupsData from '@/common/content/workingGroups';

const SectionWorkingGroup = () => (
  <Box width="100%" backgroundColor="#36AFF9">
    <Container paddingY={{ md: '112px', xs: 8 }} margin="0 auto">
      <Typography
        variant="h2"
        lineHeight="58px"
        fontWeight="600"
        color="#ffffff"
        marginBottom={8}
      >
        LXDAO Working Groups
      </Typography>
      <Grid container spacing={2}>
        {workingGroupsData.length > 0 &&
          workingGroupsData.map((group, index) => {
            return <WorkingGroupCard key={index} {...group} />;
          })}
      </Grid>
    </Container>
  </Box>
);

export default SectionWorkingGroup;
