/* eslint-disable no-undef */
import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';

import OnBoardingLayout from '@/components/OnBoardingLayout';

export default function Intro() {
  const data = [
    {
      svg: '/icons/mission.svg',
      title: 'MISSION',
      content: `LXDAO is an R&D-focused DAO in Web3. Our mission is gathering the power of buidlers to buidl and support “LX” (valuable) Web3 projects sustainably and welcome 1 billion users into Web3.`,
    },
    {
      svg: '/icons/vision.svg',
      title: 'VISION',
      content: `Our Vision & Consensus - The technologies, concepts and ideas of Web3 will be used by a billion people in a decade.`,
    },
    {
      svg: '/icons/value.svg',
      title: 'VALUE',
      content: `LX = 良心 = Conscience`,
    },
  ];
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="LXDAO INTRODUCTION"
      next="/onboarding/follow"
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
          mb: { xs: '30px', md: '53px' },
          mt: { xs: '40px', md: '70px' },
          px: 0,
        }}
      >
        {data.map((value, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: 300, lg: 389 },
              height: 460,
              marginBottom: '20px',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              position: 'relative',
            }}
          >
            <CardContent sx={{ paddingTop: '77px', paddingX: '19px' }}>
              <Box component={'img'} src={value.svg} height="92px" />
              <Typography
                mt="77px"
                sx={{
                  fontWeight: 800,
                  position: 'relative',
                }}
                variant="subtitle1"
                component="div"
              >
                {value.title}
                <Box
                  component={'div'}
                  mt="16px"
                  sx={{
                    width: 99,
                    height: 12,
                    backgroundColor: '#36AFF9',
                    opacity: 0.6,
                    position: 'absolute',
                    bottom: '7px',
                  }}
                ></Box>
              </Typography>
              <Typography mt="27px" variant="body2" color="text.secondary">
                {value.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </OnBoardingLayout>
  );
}
