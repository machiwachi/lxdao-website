import React from 'react';
import styled from 'styled-components';
import Mailchimp from 'react-mailchimp-form';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';

import Container from '@/components/Container';

const SignupFormWrapper = styled.div`
  margin-top: 20px;

  & form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;

    ${(props) => props.theme.breakpoints.up('sm')} {
      flex-direction: row;
      justify-content: start;
    }
  }

  & input,
  & button {
    font-size: 16px;
    line-height: 24px;
  }

  & input {
    width: 240px;
    height: 24px;
    padding: 12px 14px;
    margin-right: 16px;
    border-radius: 8px;
    border: 1px solid #d0d5dd;

    ${(props) => props.theme.breakpoints.up('sm')} {
      width: 360px;
    }
  }

  & button {
    background-color: #000000;
    padding: 12px 20px;
    outline: none;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 0;
    }
  }

  & .msg-alert > p {
    color: #00fb8c !important;
  }
`;

const ActiveStepCircle = styled.div`
  background-image: linear-gradient(#236adf, #64cceb);
`;

const UnStartedStepCircle = styled.div`
  background-color: #d9d9d9;
`;

const steps = [
  {
    label: 'Initial Funding 10th July 2022',
    description: `We have raised 200,000 USDC from ourselves, friends, community, and buidlers who share our vision, and the funds will be used for getting LXDAO up and running, and Web3 projects development.`,
    highlightDescription: 'All funds are from individuals, no VCs.',
  },
  {
    label: 'Next Round Seed Funding',
    description:
      'Please provide your email address if you are interested in getting more about our upcoming round of funding. We will get in touch with you as soon as there are any significant changes to our product or when funding becomes available.',
    emailCollector: true,
  },
];

const SectionFinancing = () => {
  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiStepLabel-root': {
        padding: '12px 0',
      },
      '& .MuiStepLabel-label': {
        color: '#000000',
        fontSize: '20px',
        lineHeight: '32px',
        fontWeight: '600',
      },
      '& .MuiStepContent-root': {
        marginLeft: '19px',
        paddingLeft: '58px',
      },
      '& .MuiStepConnector-root': {
        marginLeft: '19px',
      },
      '& .step-circle': {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        color: '#ffffff',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '30px',
      },
    },
  }));

  const styles = useStyles();
  const theme = useTheme();

  const iconStep = {
    1: ActiveStepCircle,
    2: UnStartedStepCircle,
  };

  const StepIconComponent = (props) => {
    const Icon = iconStep[props.icon];

    return <Icon className="step-circle">{props.icon}</Icon>;
  };

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Invest-Section"
      maxWidth="800px"
    >
      <Typography variant="h3" marginBottom={12}>
        Invest LXDAO
      </Typography>
      <Stepper activeStep={1} orientation="vertical" className={styles.root}>
        {steps.map((step, index) => (
          <Step key={step.label} active={index === 0 || index === 1}>
            <StepLabel StepIconComponent={StepIconComponent}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography
                textAlign="left"
                color="#667085"
                fontSize="20px"
                lineHeight="32px"
                fontWeight="400"
              >
                {step.description}
              </Typography>
              {step.highlightDescription && (
                <Typography
                  textAlign="left"
                  color="#000000"
                  fontSize="20px"
                  lineHeight="32px"
                  fontWeight="600"
                  marginTop={3}
                >
                  {step.highlightDescription}
                </Typography>
              )}
              {step.emailCollector && (
                <SignupFormWrapper theme={theme}>
                  <Mailchimp
                    action="https://lxdao.us12.list-manage.com/subscribe/post?u=4e96be73f764bc67c7f964f51&amp;id=eaa29be54b"
                    fields={[
                      {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true,
                      },
                    ]}
                  />
                </SignupFormWrapper>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default SectionFinancing;
