import React from 'react';
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
          Join the <strong>LXDAO</strong>
          <br />
          community
        </Typography>
        <Typography
          variant="h3"
          lineHeight="1.5em"
          marginBottom={3}
          textTransform="uppercase"
          display={{ lg: 'none', xs: 'block' }}
        >
          Join the <strong>LXDAO</strong> community
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
            LXDAO is formed by a group of{' '}
            <strong>
              Web3 buidlers who enjoy building high-quality valuable Web3
              products
            </strong>
            . We believe that in ten years, there will be one billion people
            using Web3 technologies, products and ideas every day. Therefore, as
            a pioneer,{' '}
            <strong>
              we will use the Web3 approach to buidl and maintain projects to
              promote the development of Web3
            </strong>
            .
          </Typography>{' '}
          <Typography
            marginTop={2}
            variant="body1"
            lineHeight="1.5em"
            fontSize={{ md: '24px', xs: '16px' }}
          >
            Our outputs include but are not limited to commercial projects, open
            source projects, public goods and performance art, etc. We also want
            to <strong>create a sustainable circular economy</strong> so that
            LXDAO can continue to operate.
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
