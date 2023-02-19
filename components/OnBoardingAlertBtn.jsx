import { useState } from 'react';

import {
  Box,
  Typography,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  Button,
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled as muistyle } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styled, { keyframes } from 'styled-components';

import LXButton from '@/components/Button';
import Congratulate from './Congratulate';

const LightTooltip = muistyle(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
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
  const [open, setOpen] = useState(false);
  return (
    <>
      <LightTooltip title="Click me to complete the onborading process.">
        <RotateBorder
          onClick={() => {
            setOpen(true);
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
      <Dialog open={open} maxWidth="714px">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '39px 50px 54px 70px',
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
            Congratulate
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
            DaoDAO，恭喜你通过了LXDAO Community
            voting（Snapshot），在正式加入LXDAO成为其中伟大的Builder一员之前，还差几步骤，以便你能够更好的了解LXDAO和融入其中。
          </Typography>
          <LXButton mb="29px" mt="66px" variant="gradient">
            On Boarding!
          </LXButton>
          <Button
            sx={{ color: '#666F85' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            等等再看
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
