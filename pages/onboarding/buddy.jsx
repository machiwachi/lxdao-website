import React from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { Box, Typography, Link } from '@mui/material';
import OnBoardingLayout from '@/components/onboarding/OnBoardingLayout';
import useBuidler from '@/components/useBuidler';

export default function Buddy() {
  const { address } = useAccount();
  const router = useRouter();
  const [, record] = useBuidler(address);
  const data = {
    address: record?.buddies[0]?.address,
    name: record?.buddies[0]?.name,
    avatar: record?.buddies[0]?.avatar,
  };
  // let host = '';
  // if (typeof window !== 'undefined') {
  //   host = window.location.protocol + '//' + window.location.host;
  // }
  return (
    <OnBoardingLayout
      title="LXDAO Introduction"
      desc="How a buddy can help you?"
      back="/onboarding/flow"
      next="/onboarding/follow"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '108px',
          mb: '48px',
        }}
      >
        <Box
          component="img"
          src="/images/onboarding/buddy.png"
          width={411}
          height={432}
        ></Box>
        <Box>
          <Typography
            maxWidth={'720px'}
            sx={{
              whiteSpace: 'pre-wrap',
              color: '#667085',
              wordBreak: 'break-all',
            }}
          >
            {`As a new joiner in LXDAO, don't hesitate to ask any questions you may have. Your Buddy`}{' '}
            <Link href={`/buidlers/${data.address}`} color="#667085">
              {data.name}
            </Link>{' '}
            {`is here to assist you and provide answers if needed. \n\nWe encourage you to participate in DAO activities, such as joining a project, attending community calls, and submitting proposals.\n\nAdditionally, your Buddy will notify you of important meetings to ensure you don't miss out. Our aim is to help you get acquainted with living in LXDAO and make the most out of your experience.\n\n`}
          </Typography>
          <Typography>
            <Link
              sx={{
                textDecorationColor: '#101828',
                color: '#101828',
                cursor: 'pointer',
              }}
              //todo: add href
            >
              Learn more →
            </Link>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 17px',
              width: '370px',
              height: '120px',
              mt: '30px',
              background: '#FFFFFF',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              cursor: 'pointer',
              gap: '50px',
            }}
            onClick={() => {
              router.push(`/buidlers/${data.address}`);
            }}
          >
            <Typography color="#101828" fontWeight="600" whiteSpace="pre-wrap">
              Your Buddy{'    '}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                color="#36AFF9"
                fontWeight="600"
                whiteSpace="pre-wrap"
                display="inline"
              >
                {data.name}
              </Typography>
              <Box
                component="img"
                src={data?.avatar}
                alt="avatar"
                style={{
                  width: '80px',
                  height: '80px',
                  marginLeft: '20px',
                  border: '0.5px solid #E5E5E5',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
