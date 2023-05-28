import React from 'react';
import LXButton from './Button';
import { Stack, Box, Typography } from '@mui/material';
export function CardShow({ path, title, buttonText, tip }) {
  return (
    <Stack
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: { xs: 'center', md: 'left' },
        gap: 3,
        py: 6,
      }}
    >
      <Box border="0.5px solid #D0D5DD" borderRadius="6px" position="relative">
        <Box
          sx={{
            position: 'absolute',
            width: '145.8px',
            borderBottom: '28.28px solid #d0d5dd',
            borderLeft: '28.28px solid transparent',
            borderRight: '28.28px solid transparent',
            textAlign: 'center',
            transform: 'rotate(-45deg)',
            top: 27.5,
            left: -31.5,
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            width: '145.8px',
            height: '28.28px',
            textAlign: 'center',
            transform: 'rotate(-45deg)',
            top: 27.5,
            left: -31.5,
          }}
        >
          <Typography color="#fff" variant="body2" lineHeight="28.28px">
            To be earned
          </Typography>
        </Box>

        <Box component="img" src={path} width="368px" height="180px"></Box>
      </Box>

      <Typography
        fontFamily="Inter"
        fontSize="48px"
        lineHeight="44px"
        fontWeight="800"
        marginY="24px"
      >
        Earn your {title}
      </Typography>
      {buttonText != '' && (
        <LXButton width="227px" variant="gradient">
          {buttonText}
        </LXButton>
      )}
      <Typography color="#666F85">{tip}</Typography>
    </Stack>
  );
}
