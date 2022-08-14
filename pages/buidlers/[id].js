/* eslint-disable no-undef */
import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { formatAddress } from '@/utils/utility';

function BuidlerDetails() {
  return (
    <Container paddingY={10} display="flex">
      <Box marginRight={6}>
        <Box width="150px" borderRadius="50%" overflow="hidden">
          <img
            style={{ display: 'block', width: 150 }}
            src="/images/kuncle.jpeg"
            alt=""
          />
        </Box>
        <Box textAlign="center" marginTop={4}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          <Box>
            <Typography variant="h4">Wang Teng</Typography>
            <Typography>
              I am a UI designer with 7 years of work experience, I hope to
              learn more knowledge in WEB3.
            </Typography>
          </Box>
          <Box>
            <Box borderRight="1px solid #D0D5DD">
              <Link
                marginRight={5}
                target="_blank"
                href="https://twitter.com/LXDAO_Official"
              >
                <Box
                  width="18px"
                  component={'img'}
                  src={'/icons/website.svg'}
                />
              </Link>
              <Link
                marginRight={5}
                target="_blank"
                href="https://twitter.com/LXDAO_Official"
              >
                <Box
                  width="18px"
                  component={'img'}
                  src={'/icons/twitter.svg'}
                />
              </Link>
              <Link
                marginRight={5}
                target="_blank"
                href="https://twitter.com/LXDAO_Official"
              >
                <Box
                  width="18px"
                  component={'img'}
                  src={'/icons/discord.svg'}
                />
              </Link>
              <Link
                marginRight={5}
                target="_blank"
                href="https://twitter.com/LXDAO_Official"
              >
                <Box
                  width="18px"
                  component={'img'}
                  src={'/icons/ellipsis.svg'}
                />
              </Link>
            </Box>
            <Box>
              {formatAddress('0x147b166fb4f1Aa9581D184596Dbabe2980ba4b14')}
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
}

export default function Buidler() {
  return (
    <Layout>
      <Header />
      <BuidlerDetails />
      <Footer />
    </Layout>
  );
}
