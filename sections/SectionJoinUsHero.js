import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionHero from './SectionHero';
import Container from '@/components/Container';

const SectionJoinUsHero = () => {
  const Title = () => {
    return (
      <>
        <Typography
          fontSize={{ md: '98px', xs: '62px' }}
          fontWeight="700"
          marginBottom={6}
          textTransform="uppercase"
          textAlign="left"
          color="#101828"
        >
          JOIN US
        </Typography>
      </>
    );
  };
  return (
    <Box>
      <SectionHero
        leftContent={
          <Box>
            <Box width={{ sm: '592px', xs: '350px' }}>
              <Title />
              <Typography
                variant="subtitle1"
                lineHeight="36px"
                color="#667085"
                textAlign="left"
              >
                LXDAO is formed by a group of Web3 buidlers who enjoy building
                high-quality valuable Web3 products. We believe that in ten
                years,there will be one billion people using Web3 technologies,
                products and ideas every day. Therefore, as a pioneer, we will
                use the Web3 approach to buidl and maintain projects to promote
                the development of Web3.
              </Typography>
              <Typography
                marginTop={3}
                variant="subtitle1"
                lineHeight="36px"
                color="#667085"
                textAlign="left"
              >
                Our outputs include but are not limited to commercial projects,
                open source projects, public goods and performance art, etc. We
                also want to create a sustainable circular economy so that LXDAO
                can continue to operate.
              </Typography>
            </Box>
          </Box>
        }
        rightContent={
          <Box width={{ sm: '574px', xs: '350px' }}>
            <img src="/images/to-the-moon.png" width="100%" />
          </Box>
        }
      />

      <Container
        minHeight={{ md: '400px', xs: '660px' }}
        display="flex"
        flexDirection={{ lg: 'row', xs: 'column-reverse' }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={{ lg: '300px', sm: '100px', xs: '40px' }}
      >
        <Box
          padding="0 36px"
          display="flex"
          flexDirection="column"
          alignItems={{ lg: 'flex-start', xs: 'center' }}
          textAlign={{ lg: 'left', xs: 'center' }}
        >
          <Box width={{ sm: '400px', xs: '350px' }}>
            <img src="/images/brainstorm.svg" width="100%" />
          </Box>
        </Box>
        <Box>
          <Box width={{ sm: '592px', xs: '350px' }}>
            <Typography
              variant="subtitle1"
              lineHeight="36px"
              color="#667085"
              textTransform="capitalize"
              textAlign="left"
            >
              LXDAO wants to attract people who want to build conscientiously in
              any role, whether you are a programmer, designer, artist,
              operation or product manager, we welcome you to join us.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Container
        minHeight={{ md: '362px', xs: '600px' }}
        display="flex"
        flexDirection={{ lg: 'row', xs: 'column' }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={{ md: '200px', sm: '100px', xs: '40px' }}
        marginBottom={{ md: 10, sm: 8, xs: 3 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ lg: 'flex-start', xs: 'center' }}
          textAlign={{ lg: 'left', xs: 'center' }}
        >
          <Box width={{ sm: '592px', xs: '350px' }}>
            <Typography
              variant="subtitle1"
              lineHeight="36px"
              color="#667085"
              textTransform="capitalize"
              textAlign="left"
            >
              In LXDAO you can buidl many web3 projects with like-minded
              buidlers in the web3 way, you can not only increase your web3
              experience and get paid with LXPoints,but also make a lot of good
              friends.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box width={{ sm: '400px', xs: '350px' }}>
            <img src="/images/build-project.svg" width="100%" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionJoinUsHero;
