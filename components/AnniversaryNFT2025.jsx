import React from 'react';

import { Box, Typography } from '@mui/material';

import Button from '@/components/Button';
import Container from '@/components/Container';

export default function AnniversaryNFT2025() {
  return (
    <Box
      sx={{
        width: { lg: '840px', xs: '100%' },
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        mt: '87px',
        py: { lg: '60px', xs: '24px' },
        px: { lg: '48px', xs: '12px' },
        borderRadius: '20px',
      }}
    >
      <Container
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        alignItems="center"
        gap="48px"
      >
        <Box
          sx={{
            width: '240px',
            height: '240px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '50%',
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/mp4/anniversaryNFT2025.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { md: 'flex-start', xs: 'center' },
            textAlign: 'left',
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: '32px', xs: '24px' },
              fontWeight: 'bold',
              lineHeight: '120%',
              mb: '16px',
            }}
          >
            LXDAO 3rd Anniversary NFT
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: '16px', xs: '14px' },
              lineHeight: '180%',
              mb: '24px',
              fontWeight: '600',
            }}
          >
            Available only from 2025-06-01 to 2025-06-13
          </Typography>
          <Button
            variant="gradient"
            borderRadius="100px"
            width="200px"
            onClick={() => window.open('/anniversary-nft', '_blank')}
          >
            MINT NOW
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
