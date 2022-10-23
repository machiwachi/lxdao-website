import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

import Container from '@/components/Container';

const SectionWorkingGroup = () => (
  <Box width="100%" backgroundColor="#36AFF9">
    <Container paddingY={{ md: '112px' }} margin="0 auto">
      <Typography
        variant="h2"
        lineHeight="58px"
        fontWeight="600"
        color="#ffffff"
      >
        LXDAO Working Group
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link></Link>
        </Grid>
        <Grid item xs={12}>
          <Link></Link>
        </Grid>
        <Grid item xs={12}>
          <Link></Link>
        </Grid>
        <Grid item xs={12}>
          <Link></Link>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default SectionWorkingGroup;
