import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';
import { BuidlerCard } from '@/pages/buidlers';
import API from '@/common/API';
import { getRandom } from '@/utils/utility';

const SectionBuidlers = () => {
  const [buidlers, setBuidlers] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    try {
      const res = await API.get('/buidler');
      const result = res?.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      const records = result?.data;
      setBuidlers(getRandom(records, records.length >= 6 ? 6 : records.length));
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Buidlers-Section"
      maxWidth="1200px"
    >
      <Typography variant="h4">LXDAO Buidlers</Typography>
      <Typography fontSize="20px" marginTop={2}>
        Welcome to{' '}
        <Link href={`/joinus`} color={'inherit'}>
          Join Us
        </Link>
        , let's buidl more valuable Web3 products together!
      </Typography>
      <Box marginTop="96px" textAlign="left">
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
        >
          {buidlers.map((buidler, index) => {
            return (
              <Grid item xs={2} sm={2} md={4} key={index}>
                <BuidlerCard record={buidler} />
              </Grid>
            );
          })}
        </Grid>
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() => {
              router.push('/buidlers');
            }}
          >
            View More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionBuidlers;
