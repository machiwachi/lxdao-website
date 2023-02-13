/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';

import Layout from '@/components/Layout';
import LXButton from '@/components/Button';
import OnBoardingBottom from '@/components/OnBoardingBottom';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import { maxWidth } from '@mui/system';

export default function Intro() {
  const data = [
    {
      svg: '/icons/mission.svg',
      title: 'MISSION',
      content: `LXDAO is an R&D-focused DAO in Web3. our mission is Bringing together buidlers to buidl and maintain "LX" projects for Web3, in a sustainable manner.`,
    },
    {
      svg: '/icons/Vision.svg',
      title: 'VISION',
      content: `We push and make it happen soon. So we hope in 2032, LXDAO, with over 1000 registered builders, has just completed its 100th Web3 project. More than 10 million users use these products every day.`,
    },
    {
      svg: '/icons/mission.svg',
      title: 'VALUE',
      content: `First, you must have a LX (LX = 良心 = Conscience). You should be a Web3 believer and long-termist. You want to buidl or contribute to some valuable projects in Web3.`,
    },
  ];
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="LXDAO INTRODUCTION"
      next="/onboarding/flow"
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
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
            }}
          >
            <CardContent sx={{ paddingTop: '77px', paddingX: '19px' }}>
              <Box component={'img'} src={value.svg} />

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
