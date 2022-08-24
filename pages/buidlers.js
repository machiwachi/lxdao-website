/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Grid } from '@mui/material';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextInput from '@/components/TextInput';
import SingleSelect from '@/components/Select';
import skillNames from '@/common/skills';
import Container from '@/components/Container';

function BuidlerCard() {
  return (
    <Box boxShadow={1} borderRadius={2} padding={3} position="relative">
      <Box display="flex">
        <Box
          flexBasis="80px"
          flexShrink={0}
          width="80px"
          height="80px"
          borderRadius="50%"
          overflow="hidden"
          marginRight={3}
        >
          <img
            style={{ display: 'block', width: 80 }}
            src="/images/kuncle.jpeg"
            alt=""
          />
        </Box>
        <Box>
          <Typography variant="h6">Kuncle</Typography>
          <Box display="flex" flexWrap="wrap">
            <Box
              paddingX={1}
              marginRight={0.5}
              marginBottom={0.5}
              sx={{
                border: '1px solid #ccc',
              }}
            >
              Buidler
            </Box>
            <Box
              paddingX={1}
              marginRight={0.5}
              marginBottom={0.5}
              sx={{
                border: '1px solid #ccc',
              }}
            >
              Core
            </Box>
            <Box
              paddingX={1}
              marginRight={0.5}
              marginBottom={0.5}
              sx={{
                border: '1px solid #ccc',
              }}
            >
              Investor
            </Box>
          </Box>
        </Box>
      </Box>
      <Box marginTop={2}>
        <Typography marginBottom={1}>Skills</Typography>
        <Box display="flex" flexWrap="wrap">
          <Box
            paddingX={1}
            marginRight={0.5}
            marginBottom={0.5}
            sx={{
              background: '#55A3FF',
              color: '#fff',
              borderRadius: '4px',
            }}
          >
            UI Design
          </Box>
        </Box>
      </Box>
      <Box marginTop={2}>
        <Typography>Projects</Typography>
        <Typography>
          <strong>2</strong> Project Involved
        </Typography>
      </Box>
      <Box position="absolute" bottom="16px" right="16px">
        <Typography
          target="_blank"
          component="a"
          href="https://twitter.com/LXDAO_Official"
          color="primary"
        >
          <Box width="26px" component={'img'} src={'/icons/twitter.svg'} />
        </Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Layout>
      <Header />
      <Container paddingY={10} maxWidth={1085}>
        <Box textAlign="center">
          <Typography variant="h3">LXDAO Buidlers</Typography>
          <Typography fontSize="20px" marginTop={2}>
            Here are registered LXDAO Buidlers. Join Us(TODO).
          </Typography>
        </Box>
        <Box marginTop={6.25}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextInput label="Search" placeholder="Search buidlers" />
            </Grid>
            <Grid item xs={4}>
              <SingleSelect label="Skill" dropdown={skillNames} />
            </Grid>
          </Grid>
        </Box>
        <Box marginTop={6.25}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BuidlerCard />
            </Grid>
            <Grid item xs={4}>
              <BuidlerCard />
            </Grid>
            <Grid item xs={4}>
              <BuidlerCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Layout>
  );
}
