import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { keyframes } from '@mui/system';

import Button from '@/components/Button';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import Container from '@/components/Container';

export default function NewSectionOnBoarding() {
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundImage: `url('/images/new/top-bg.svg'), url('/images/new/hero-bg.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom, top',
      }}
    >
      <Container
        minHeight={{ md: '990px', xs: '660px' }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        pt="70px"
      >
        <Box
          alignSelf="end"
          component="img"
          width="590px"
          src="/images/new/infinite.gif"
        ></Box>
        <Box alignSelf="start" mt="60px">
          <Typography
            fontSize="40px"
            maxWidth="674px"
            fontWeight="500"
            textAlign="left"
          >
            We are committed to creating an{' '}
            <span
              style={{
                fontWeight: '700',
              }}
            >
              infinite cycle
            </span>{' '}
            that promotes public goods and open source for an&nbsp;
            <span
              style={{
                fontWeight: '700',
              }}
            >
              {''}open and beautiful
            </span>
            society.
          </Typography>
          <br />
          <Typography fontSize="32px" textAlign="left">
            Here is how we make it real.
          </Typography>
        </Box>
      </Container>
      <OnBoardingSection
        title="Education"
        description="We held various events to let the ideas about Public Goods reach more people."
        index="1"
      >
        <Box
          sx={{
            width: '100%',
            overflow: 'scroll',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              width: 'fit-content',
              borderRadius: '24px',
              ml: 'calc((100vw - Min(90vw, 1216px))/2)',
              backgroundColor: '#CEE8F8',
              padding: '12px',
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end',
                  width: '300px',
                  height: '400px',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url('/images/new/example.png')`,
                }}
              >
                <Typography fontSize="28px" fontWeight="600">
                  EDCON
                </Typography>
                <Box fontSize="14px" leading="10px">
                  <Typography>2024.07</Typography>
                  <Typography>@Tokyo</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </OnBoardingSection>
    </Box>
  );
}

function OnBoardingSection({ title, description, index, children }) {
  return (
    <Box paddingTop="120px" paddingBottom="100px">
      <Box
        maxWidth="1216px"
        boxSizing="border-box"
        marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Typography fontSize="80px" fontWeight="700">
            {index}
          </Typography>
          <Box ml="20px">
            <Typography fontSize="32px" fontWeight="700">
              {title}
            </Typography>
            <Typography fontSize="20px" fontWeight="500">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        {children}
        {/* <Box
        sx={{
          width: '100%',
          overflow: 'scroll',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            width: 'fit-content',
            borderRadius: '24px',
            ml: 'calc((100vw - Min(90vw, 1216px))/2)',
            backgroundColor: '#CEE8F8',
            padding: '12px',
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                width: '300px',
                height: '400px',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 20px',
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url('/images/new/example.png')`,
              }}
            >
              <Typography fontSize="28px" fontWeight="600">
                EDCON
              </Typography>
              <Box fontSize="14px">
                <Typography>2024.07</Typography>
                <Typography>@Tokyo</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box> */}
      </Box>
    </Box>
  );
}

function OnBoardingTitle({ title, description, index }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Typography fontSize="80px" fontWeight="700">
        01
      </Typography>
      <Box ml="20px">
        <Typography fontSize="32px" fontWeight="700">
          {title}
        </Typography>
        <Typography fontSize="20px" fontWeight="500">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
