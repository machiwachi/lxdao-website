import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';
import Button from '@/components/Button';

const steps = [
  {
    label: 'Application',
    description: 'Here is a brief description. Here is a brief description',
    icon: '/icons/application-step.svg',
  },
  {
    label: 'Vote',
    description: 'Here is a brief description. Here is a brief description',
    icon: '/icons/vote-step.svg',
  },
  {
    label: 'Onboarding Session',
    description: 'Here is a brief description. Here is a brief description',
    icon: '/icons/session-step.svg',
  },
  {
    label: 'Build Together',
    description: 'Here is a brief description. Here is a brief description',
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
            How to become a builder
          </Typography>
          <Box
            display="flex"
            flexDirection={{ lg: 'row', xs: 'column' }}
            alignItems="center"
            gap={{ lg: '35px', sm: '80px', xs: '30px' }}
          >
            {steps.map((step, index) => {
              return (
                <Box position="relative">
                  <Step key={index} stepData={step} />
                  {index !== steps.length - 1 ? (
                    <>
                      <Box
                        position="absolute"
                        top="160px"
                        left="185px"
                        bottom="40px"
                        display="flex"
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
                        display="flex"
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
          <Button marginTop={8} width="200px">
            Start
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionApplicationSteps;
