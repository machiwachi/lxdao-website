import { useEffect, useState } from 'react';

import { Box, Card, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

import { erc20Abi } from 'viem';

import { useReadContracts } from 'wagmi';

import API from '@/common/API';
import { SNAPSHOTURL, queryProposals } from '@/graphql/snapshot';

import { request } from 'graphql-request';

export default function NewSectionPG() {
  return (
    <Container py="100px">
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '725px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            fontSize="48px"
            fontWeight="800"
            maxWidth="514px"
            lineHeight="140%"
          >
            Why the{' '}
            <span
              style={{
                color: '#10D7C4',
              }}
            >
              Public Goods
            </span>{' '}
            is undervalued
            <br /> and needs
            <br /> our attention?
          </Typography>
          <Box
            sx={{
              width: '441px',
              pt: '80px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              Why
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <Box
            sx={{
              width: '441px',
              pt: '100px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              What
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '441px',
              pt: '80px',
            }}
          >
            <Typography fontWeight="700" fontSize="28px" color="#10D7C4">
              How
            </Typography>
            <Box
              component="img"
              mt="12px"
              src="/images/new/Union.svg"
              height="21px"
            />
            <Typography letterSpacing={'-0.32px'} lineHeight="160%" mt="48px">
              In the Web3 context, public goods are resources that everyone can
              access and no one can be excluded from using. ShapeShift dApp
              exemplifies this through its decentralized, open-source software
              that anyone can use, modify, and improve.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
