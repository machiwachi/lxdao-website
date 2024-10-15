import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

import Button from '@/components/Button';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import Container from '@/components/Container';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';

import { getMemberFirstBadgeAmount } from '@/utils/utility';

import styled, { keyframes } from 'styled-components';

export default function NewSectionConnections() {
  return (
    <Box
      sx={{
        width: '100vw',
        background: `#C6F5F1`,
        position: 'relative',
        pt: '80px',
        pb: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        width="430px"
        src="/images/new/white.png"
        sx={{
          position: 'absolute',
          top: '76px',
          right: '-40px',
        }}
      />
      <Box
        position="relative"
        fontSize="40px"
        textAlign="center"
        fontWeight="700"
        width="fit-content"
      >
        <Box
          component="img"
          src="/images/new/quote-right.svg"
          sx={{
            position: 'absolute',
            left: '-80px',
          }}
        />
        Heart Form our community
        <Box
          component="img"
          src="/images/new/quote-left.svg"
          sx={{
            position: 'absolute',
            top: '40px',
            right: '-90px',
          }}
        />
      </Box>
      <Box
        width="100%"
        height="810px"
        sx={{
          overflow: 'scroll',

          top: '0',
          left: '0',
          mt: '150px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: '37px',
            height: '810px',
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              width="280px"
              sx={{
                p: '47px 34px',
                background: 'white',
                borderRadius: '20px',
              }}
            >
              <Box>
                qoutes from the community qoutes from the community qoutes from
                the community
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '12px',
                  mt: '48px',
                }}
              >
                <Box
                  width="40px"
                  height="40px"
                  sx={{
                    borderRadius: '50%',
                    background: 'red',
                  }}
                ></Box>
                <Box>
                  <Box>XXX</Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                    }}
                  >
                    @XXX
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
