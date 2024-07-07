import React from 'react';
import { Typography } from '@mui/material';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { Steps, Step } from '@/components/onboarding/Steps';
import OnBoardingBottom from '@/components/OnBoardingBottom';

export default function OnBoardingLayout({
  children,
  title,
  back,
  next,
  disableNext,
  currentStep,
  hideButton,
  layoutTitle,
}) {
  const stepsData = [
    { label: 'Step1', step: 1 },
    { label: 'Step2', step: 2 },
    { label: 'Step3', step: 3 },
  ];

  return (
    <Layout title={layoutTitle}>
      <Container paddingY={4} maxWidth={1216}>
        <Steps>
          {stepsData.map((step, index) => {
            return (
              <Step
                key={step.step}
                label={step.label}
                index={index}
                active={currentStep === step.step}
              />
            );
          })}
        </Steps>
        <Typography
          fontSize="36px"
          lineHeight="40px"
          color="#101828"
          letterSpacing="-0.02em"
          mt="36px"
          mb="48px"
          sx={{ fontWeight: 800 }}
        >
          {title}
        </Typography>
        {children}
        {!hideButton && (
          <OnBoardingBottom
            back={back}
            next={next}
            step={currentStep}
            disableNext={disableNext}
          />
        )}
      </Container>
    </Layout>
  );
}
