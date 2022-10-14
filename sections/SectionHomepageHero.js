import React from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { Box, Typography, Link } from '@mui/material';
import Button from '@/components/Button';
import Container from '@/components/container';

const textColorGradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const HightlightText = styled.span`
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #3c7aff, #1eedd4);
  -webkit-background-clip: text;
  animation: ${textColorGradient} 3s ease infinite;
  color: transparent;
  font-size: 98px;
  line-height: 100px;
  font-weight: 700;
`;

const SectionHomepageHero = () => {
  const router = useRouter();

  const Title = () => {
    return (
      <Box>
        <Box display={{ lg: 'block', xs: 'none' }}>
          <Typography variant="h1" lineHeight="100px" fontWeight="700">
            LXDAO is an
          </Typography>
          <HightlightText>R&amp;D</HightlightText>
          <Typography
            variant="h1"
            lineHeight="100px"
            fontWeight="700"
            display="inline"
          >
            -focused DAO
          </Typography>
          <Typography variant="h1" lineHeight="100px" fontWeight="700">
            in Web3
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems={{ lg: 'flex-start', xs: 'center' }}
        textAlign={{ lg: 'left', xs: 'center' }}
      >
        <Title />
        <Box>
          <Typography variant="body1" lineHeight="36px" color="#667085">
            Our Vision & Consensus - The technologies, concepts and ideas of
            Web3
          </Typography>
          <Typography varient="body1" lineHeight="36px" color="#667085">
            will be used by a billion people in a decade.
          </Typography>
        </Box>
        <Button variant="gradient" width="180px">
          <Link
            href={`/joinus`}
            color="#ffffff"
            sx={{
              textDecoration: 'none',
            }}
          >
            JOIN US
          </Link>
        </Button>
        <Box>
          <Link>
            <Box component={'img'} src={'/icons/twitter-circle.svg'} />
          </Link>
          <Link>
            <Box component={'img'} src={'/icons/discord-circle.svg'} />
          </Link>
          <Link>
            <Box component={'img'} src={'/icons/telegram-circle.svg'} />
          </Link>
          <Link>
            <Box component={'img'} src={'/icons/forum-circle.svg'} />
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SectionHomepageHero;
