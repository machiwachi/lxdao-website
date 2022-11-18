import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';

const steps = [
  {
    label: 'Application',
    description:
      'Submit your application by clicking the "Start your Application" button below. ⬇️',
    icon: '/icons/application-step.svg',
  },
  {
    label: 'Vote',
    description:
      'The Onboarding committee will review your application. And vote. It takes 2-5 days.',
    icon: '/icons/vote-step.svg',
  },
  {
    label: 'Onboarding',
    description:
      '1v1 onboarding session after your application is approved. We will help you get started in LXDAO.',
    icon: '/icons/session-step.svg',
  },
  {
    label: 'Buidl',
    description:
      "Join the community, find the projects you want to build. Let's buidl together!",
    icon: '/icons/success-step.svg',
  },
];

const SectionApplicationSteps = () => {
  const Step = ({ stepData, index }) => {
    const { label, description, icon } = stepData;
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap="16px">
        <Box
          width="120px"
          height="120px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(16, 24, 40, 0.05)"
          borderRadius="100px"
        >
          <Box width="42px" component={'img'} src={icon} />
        </Box>
        <Typography fontWeight="500" color="#000" fontSize="20px">
          {label}
        </Typography>
        <Typography
          variant="body1"
          paddingX={index === 2 ? 0 : 2}
          lineHeight="30px"
          color="#667085"
        >
          {description}
        </Typography>
      </Box>
    );
  };
  return (
    <Box backgroundColor="#F9FAFB" width="100%">
      <Container
        paddingY={{ md: 5, xs: 3 }}
        textAlign="center"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            textTransform="uppercase"
            fontSize={{ sm: '48px', xs: '30px' }}
            fontWeight="600"
            color="#101828"
            marginBottom={4}
            textAlign="center"
            width={{ sm: 'auto', xs: '300px' }}
          >
            How to become a builder？
          </Typography>
          <Typography
            variant="h6"
            color="#101828"
            marginBottom={10}
            textAlign="center"
            width={{ sm: '900px', xs: '300px' }}
          >
            Please show your passion and commitment to the community. It&apos;s
            good to have some contributions first (get some LXPoints) to apply
            to join.
          </Typography>
          <Box
            display="flex"
            flexDirection={{ lg: 'row', xs: 'column' }}
            alignItems="center"
            gap={{ lg: '46px', sm: '80px', xs: '30px' }}
          >
            {steps.map((step, index) => {
              return (
                <Box key={index} position="relative" flex="1 1 25%">
                  <Step index={index} stepData={step} />
                  {index !== steps.length - 1 ? (
                    <>
                      <Box
                        position="absolute"
                        top="55px"
                        left="218px"
                        bottom="40px"
                        alignItems="center"
                        display={{ lg: 'block', xs: 'none' }}
                      >
                        <Box
                          width="140px"
                          position="relative"
                          top="3px"
                          borderTop="1px dashed #101828"
                        />
                        <Box
                          width="5px"
                          height="5px"
                          borderRadius="100%"
                          backgroundColor="#000000"
                          position="relative"
                          left="140px"
                        />
                      </Box>
                    </>
                  ) : null}
                </Box>
              );
            })}
          </Box>
          <Link
            sx={{ textDecoration: 'none' }}
            textTransform="uppercase"
            href="https://tally.so/r/3Ek62r"
            target="_blank"
            marginTop={4}
            paddingY={4}
          >
            <Button variant="gradient" width="260px">
              Start your Application
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionApplicationSteps;
