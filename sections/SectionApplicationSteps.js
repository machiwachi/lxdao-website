import React from 'react';
import { Box, Typography, Link } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';

const steps = [
  {
    label: 'Create profile',
    description:
      'Join the LXDAO community by filling out your profile with your unique info and interests.',
    icon: '/icons/application-step.svg',
  },
  {
    label: 'Contribute',
    description:
      'Make a difference and earn USDT or LXP by contributing to projects.',
    icon: '/icons/contribute-step.svg',
  },
  {
    label: 'Earn badges',
    description:
      'Unlock rewards for your governance rights and reputation with our badge system.',
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
            fontSize={{ sm: '48px', xs: '30px' }}
            fontWeight="600"
            color="#101828"
            marginBottom={4}
            textAlign="center"
            width={{ sm: 'auto', xs: '300px' }}
          >
            How to contribute？
          </Typography>
          <Typography
            variant="body1"
            fontWeight="400"
            lineHeight="28px"
            textAlign="left"
            color="#667085"
            marginBottom={5}
          >
            <b>Note:</b> We are refreshing the onboarding process, you may
            contact <b>Marcus</b> by{' '}
            <a href="mailto: zqsanjingshou@gmail.com">
              zqsanjingshou@gmail.com
            </a>{' '}
            if you want to onboard ASAP.
          </Typography>
          <Box
            display="flex"
            flexDirection={{ lg: 'row', xs: 'column' }}
            alignItems="center"
            gap={{ lg: '38px', sm: '80px', xs: '30px' }}
          >
            {steps.map((step, index) => {
              return (
                <Box key={index} position="relative" flex="1 1 33%">
                  <Step index={index} stepData={step} />
                  {index !== steps.length - 1 ? (
                    <>
                      <Box
                        position="absolute"
                        top="55px"
                        left="288px"
                        bottom="40px"
                        alignItems="center"
                        display={{ lg: 'block', xs: 'none' }}
                      >
                        <Box
                          width="200px"
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
                          left="200px"
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
            href="/onboarding/intro"
            target="_blank"
            marginTop={4}
            paddingY={4}
          >
            <Button variant="gradient" width="260px">
              Start
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionApplicationSteps;
