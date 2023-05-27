import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { Steps, Step } from '@/components/Steps';
import OnBoardingBottom from '@/components/OnBoardingBottom';

export default function OnBoardingLayout({
  children,
  title,
  back,
  next,
  disableNext,
  step,
  hideButton,
  layoutTitle,
}) {
  const stepsData = [
    { label: 'Step1', step: 1 },
    { label: 'Step2', step: 2 },
    { label: 'Step3', step: 3 },
  ];
  const [activeStep, setActiveStep] = useState(1);
  const handleClickStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Layout title={layoutTitle}>
      <Container paddingY={{ md: 12, xs: 8 }} maxWidth={1216}>
        <Steps>
          {stepsData.map((step) => {
            return (
              <Step
                key={step.step}
                label={step.label}
                active={activeStep === step.step}
                onClick={() => {
                  handleClickStep(step.step);
                }}
              />
            );
          })}
        </Steps>
        <Typography
          fontSize="48px"
          lineHeight="44px"
          color="#101828"
          letterSpacing="-0.02em"
          mt="36px"
          mb="48px"
          sx={{ fontWeight: 800 }}
        >
          {title}
        </Typography>
        {children}
        <OnBoardingBottom back={back} next={next} disableNext={disableNext} />
      </Container>
    </Layout>
  );
}
