import React from 'react';
import { Box, Typography, Tooltip, Dialog, Button } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muistyle } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import useWindowSize from 'react-use/lib/useWindowSize';
import styled, { keyframes } from 'styled-components';
import Confetti from 'react-confetti';

import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';

const LightTooltip = muistyle(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
    color: '#666F85',
    fontSize: '16px',
    maxWidth: 400,
    lineHeight: '24px',
  },
}));

const RotateAni = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const RotateBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 46px;
  height: 46px;
  animation: ${RotateAni} 10s linear infinite;

  background-image: url('/icons/ani-border.svg');
`;

const RotateAniR = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;
const RotateContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(180deg, #00fb8c 0%, #36aff9 100%);
  cursor: pointer;
  animation: ${RotateAniR} 10s linear infinite;
`;

export default function OnBoardingAlertBtn() {
  const { address } = useAccount();
  const [, buidler] = useBuidler(address);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const router = useRouter();
  const { width, height } = useWindowSize();
  useEffect(() => {
    setSize({
      width: width,
      height: height,
    });
  }, [width, height]);

  const firstMemberBadgeAmount =
    buidler?.badges?.filter((badge) => badge.id === 'MemberFirstBadge')[0]
      ?.amount || 0;

  // TODO: add buidler badge status check for displaying the alert
  return (
    <>
      <Confetti
        width={size.width}
        height={size.height}
        recycle={false}
        run={open}
      />
      {buidler?.status == 'PENDING' && firstMemberBadgeAmount === 0 && (
        <Box
          display={
            router.asPath.includes('onboarding') ||
            router.asPath.includes('isFromOnboarding=true')
              ? 'none'
              : 'normal'
          }
        >
          <LightTooltip title="Click me to complete the onborading process.">
            <RotateBorder
              onClick={() => {
                if (buidler?.name) {
                  router.push(`/buidlers/${address}?isFromOnboarding=true`);
                } else {
                  router.push('/onboarding/profile');
                }
              }}
            >
              <RotateContent>
                <Box component="img" src="/icons/user-block.svg"></Box>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '900',
                    lineHeight: '20px',
                    backgroundColor: '#FF0000',
                    left: '52%',
                    bottom: '52%',
                    border: '2px solid #fff',
                  }}
                >
                  !
                </Box>
              </RotateContent>
            </RotateBorder>
          </LightTooltip>
        </Box>
      )}

      <Dialog open={open} maxWidth="714px">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '39px 50px 54px 50px',
            borderRadius: '12px',
          }}
        >
          <Box
            component="img"
            width="178px"
            src="/images/congratulate.png"
          ></Box>
          <Typography
            sx={{
              background:
                'linear-gradient(90deg, #0B7BFF 0%, #00FB8C 50.17%, rgba(255, 237, 54, 0.85) 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontSize: '32px',
              fontWeight: '600',
              mt: '10px',
            }}
          >
            Congratulations!
          </Typography>
          <Typography
            color="#666F85"
            fontWeight="400"
            variant="body1"
            textAlign="center"
            lineHeight="24px"
            maxWidth="604px"
            sx={{
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              mt: '17px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {address?.slice(0, 4) + '...' + address?.slice(-4, -1)}
            </span>
            , congratulations on successfully passing the hard voting process
            for the LXDAO Community. While you have made significant progress
            towards becoming a Builder for LXDAO, there are a few remaining
            steps that you must complete before becoming an official member.
          </Typography>
          <LXButton
            mb="20px"
            mt="66px"
            variant="gradient"
            onClick={() => {
              if (buidler?.status == 'READYTOMINT') {
                router.push('/onboarding/mint');
                return;
              }
              if (buidler?.contacts) {
                router.push('/onboarding/profile');
                return;
              }
              router.push('/onboarding/profile');
            }}
          >
            Onboarding
          </LXButton>
          <Button
            sx={{ color: '#666F85', textTransform: 'capitalize' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Do it later
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
