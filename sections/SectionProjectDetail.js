import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip, Stack, Avatar } from '@mui/material';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { works } from './SectionProjects'

const SectionProjectDetail = () => {

  const router = useRouter();
  const route = router.route;

  console.log('route: ', works[router.query.id]);
  const projectItem = works[router.query.id];

  if (!projectItem) return null

  return (<Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="Project-Detail-Section"
    maxWidth="1200px"
  >
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <img style={{ width: '100%' }} src={projectItem.banner} />
        </Box>
      </Grid>
      <Grid item xs={8} justify="flex-start">
        <Stack spacing={4}>
          <Typography variant="h6" align="left">
            {projectItem.title}
          </Typography>
          <Typography align="left">
            {projectItem.description}
          </Typography>
          <Typography align="left">
            <Chip size="small" label="Website" color="success" variant="outlined" sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => { window.open(projectItem.url, '_blank'); }} />
            <Chip size="small" label={projectItem.type} variant="outlined" />
          </Typography>
          {/* <Typography align="left">
            share
          </Typography> */}
          <Typography align="left">
            <div>Creators</div>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src="/images/bruce.jpeg" />
              <Avatar alt="Travis Howard" src="/images/daodao.jpeg" />
              <Avatar alt="Cindy Baker" src="/images/kuncle.jpeg" />
            </Stack>
          </Typography>
          <Stack direction="row" spacing={8}>
            <Typography align="left">
              <div>Launch Date</div>
              <div>{projectItem.launchDate}</div>
            </Typography>
            <Typography align="left">
              <div>Status</div>
              <div>{projectItem.status}</div>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  </Container>)
};

export default SectionProjectDetail;
