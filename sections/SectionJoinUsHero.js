import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import SectionHero from './SectionHero';

const SectionJoinUsHero = () => {
  const Title = () => {
    return (
      <>
        <Typography
          variant="h3"
          lineHeight="1.5em"
          marginBottom={3}
          textTransform="uppercase"
          display={{ lg: 'block', xs: 'none' }}
        >
          Join the <br />
          community
        </Typography>
        <Typography
          variant="h3"
          lineHeight="1.5em"
          marginBottom={3}
          textTransform="uppercase"
          display={{ lg: 'none', xs: 'block' }}
        >
          Join the community
        </Typography>
      </>
    );
  };
  return (
    <SectionHero
      leftContent={
        <Box>
          <Title />
          <Typography
            variant="body1"
            lineHeight="1.5em"
            fontSize={{ md: '24px', xs: '16px' }}
          >
            We are an ever growing international community of humans from a
            diversity of specializations. Coders, Engineers, Legal Experts,
            Designers, Writers, Testers, Activists - and more! Come one, come
            all! If you are passionate about the web3 here are the many ways you
            can join our thriving community.
          </Typography>
        </Box>
      }
      rightContent={
        <Box width={{ sm: '420px', xs: '300px' }}>
          <img src="/images/join-us-img.png" width="100%" />
        </Box>
      }
    />
  );
};

export default SectionJoinUsHero;
