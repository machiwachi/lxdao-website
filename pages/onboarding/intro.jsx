/* eslint-disable no-undef */
import React from 'react';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OnBoardingLayout from '@/components/onboarding/OnBoardingLayout';

export default function Intro() {
  const data = [
    {
      svg: '/icons/mission.svg',
      title: 'Mission',

      content: `LXDAO is an R&D-driven DAO building an Infinite Cycle to help sustain open-source projects and public goods.`,
    },
    {
      svg: '/icons/vision.svg',
      title: 'Vision',
      content: `Our Vision & Consensus - The technologies, concepts and ideas of Web3 will be used by a billion people in a decade.`,
    },
    {
      svg: '/icons/value.svg',
      title: 'Value',
      content: `LX = 良心 = Conscience`,
    },
    {
      svg: '/icons/bad.svg',
      title: 'Things We Depreciate',
      content: (
        <div>
          1. Sensitive topics such as politics, religion, and policies, as well
          as malicious content such as pornography, violence, gambling, scams,
          viruses, and pyramid schemes.
          <br /> 2. Malicious behavior such as abusive language, harassment,
          spamming, and phishing is forbidden.
          <br /> 3. Uncivilized speech is not allowed, and differing opinions
          should be discussed rationally without attacking or threatening
          others.
          <br /> 4. No invitations or advertising allowed without permission
          from the community administrators.
          <br />
          <br /> Violations of these rules will result in a warning for the
          first offense and removal from the community for the second offense.
        </div>
      ),
    },
  ];
  return (
    <OnBoardingLayout
      title="Learning about LXDAO"
      next="/onboarding/profile"
      currentStep={1}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: '24px',
          px: 0,
          gap: '24px',
        }}
      >
        {data.map((value, index) => (
          <Box width="100%" key={index}>
            <Accordion
              key={index}
              sx={{
                boxShadow: 'none',
                border: '0.5px solid #D0D5DD',
                borderRadius: '6px',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: '20px' }}
              >
                <Box
                  width="30px"
                  marginRight="38px"
                  component={'img'}
                  src={value.svg}
                  sx={{
                    display: 'block',
                  }}
                />
                <Typography fontSize="20px" lineHeight="30px" fontWeight={800}>
                  {value.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: '#FAFAFA',
                  padding: '20px 24px',
                  borderTop: '0.5px solid #D0D5DD',
                }}
              >
                <Typography
                  color="#666F85"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight={400}
                >
                  {value.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </OnBoardingLayout>
  );
}
