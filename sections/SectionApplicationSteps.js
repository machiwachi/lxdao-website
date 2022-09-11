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
  const Step = ({ stepData }) => {
    const { label, description, icon } = stepData;
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap="12px">
        <Box
          width="60px"
          height="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="56px" component={'img'} src={icon} />
        </Box>
        <Typography variant="h5">{label}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    );
  };
  return (
    <Box backgroundColor="#F9FAFB" width="100%">
      <Container
        paddingY={{ md: '40px', xs: 8 }}
        textAlign="center"
        maxWidth="1200px"
        margin="0 auto"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" marginBottom={10} textAlign="center">
            How to become a LX Buidler
          </Typography>
          <Box
            display="flex"
            flexDirection={{ lg: 'row', xs: 'column' }}
            alignItems="center"
            gap={{ lg: '35px', sm: '80px', xs: '30px' }}
          >
            {steps.map((step, index) => {
              return (
                <Box key={index} position="relative" flex="1 1 25%">
                  <Step stepData={step} />
                  {index !== steps.length - 1 ? (
                    <>
                      <Box
                        position="absolute"
                        top="160px"
                        left="185px"
                        bottom="40px"
                        alignItems="center"
                        display={{ lg: 'none', sm: 'block', xs: 'none' }}
                      >
                        <Box
                          height="40px"
                          position="relative"
                          right="2px"
                          borderRight="1px dashed #101828"
                        />
                        <Box
                          width="5px"
                          height="5px"
                          borderRadius="100%"
                          backgroundColor="#000000"
                        />
                      </Box>

                      <Box
                        position="absolute"
                        top="30px"
                        left="185px"
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
                        />
                      </Box>
                    </>
                  ) : null}
                </Box>
              );
            })}
          </Box>
          <Link href="https://tally.so/r/3Ek62r" target="_blank">
            <Button marginTop={8} width="200px">
              Start your Application
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionApplicationSteps;
