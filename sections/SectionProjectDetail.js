import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { works } from './SectionProjects'

const SectionProjectDetail = () => {

  const router = useRouter();
  const route = router.route;

  console.log('route: ', works[router.query.id]);

  return (<Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="Project-Detail-Section"
    maxWidth="1200px"
  >
    123456789

  </Container>)
};

export default SectionProjectDetail;
