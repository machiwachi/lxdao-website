import OnBoardingLayout from '@/components/OnBoardingLayout';
import { useAccount } from 'wagmi';
import { Box, Typography } from '@mui/material';
import LXButton from '@/components/Button';
import useBuidler from '@/components/useBuidler';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Mint() {
  const { address } = useAccount();
  const [cardUrl, setCardUrl] = useState('');
  useEffect(() => {
    setCardUrl(
      `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${address}/card`
    );
  }, [address]);
  return (
    <OnBoardingLayout
      title="Free, Only gas."
      desc="Mint your LXDAO Buidler Card"
      back="/onboarding/profile"
      next="done"
    >
      <Box
        sx={{
          display: 'flex',
          paddingTop: '32px',
          paddingBottom: '107px',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        <Box
          marginBottom={'83px'}
          margin="auto"
          sx={{ width: { xs: '100%', md: '545px' } }}
        >
          <img
            crossOrigin="anonymous"
            width={'100%'}
            style={{ objectFit: 'contain' }}
            src={cardUrl}
            alt=""
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'start' },
          }}
        >
          <Typography variant="subtitle1" fontWeight="800" color="#101828">
            HOW MINT
          </Typography>
          <Typography
            variant="body1"
            color="#666F85"
            whiteSpace={'pre-wrap'}
            lineHeight="24px"
            mt={4}
          >
            {
              '1. Contact your Buddy and make an appointment\n2. Your Buddy will review your profile and answer your questions\n3. Your Buddy enables your LXDAO Buidler Card mint access'
            }
          </Typography>
          <LXButton variant="gradient" width="148px" my={4}>
            Mint
          </LXButton>
          <Typography variant="body2" color="#666F85" whiteSpace={'pre-wrap'}>
            {
              'Free, Only gas.\nMinti success meaning officially become an LXDAO Buidler'
            }
          </Typography>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
