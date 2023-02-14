import OnBoardingLayout from '@/components/OnBoardingLayout';
import { Box, Typography, Link } from '@mui/material';

export default function Buddy() {
  const data = {
    nickname: 'BruceXu',
    avatart: '/images/bruce.jpeg',
  };
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
            sx={{ whiteSpace: 'pre-wrap', color: '#667085' }}
          >
            {`Answering any questions https://lxdao.io/buidlers/0xF7129631fad9C3a52a55EB6Ef96646C84e2161C4 from the new joiner. If you don’t know, ask your Buddy\n\nHelp the new joiner to involve in DAO activities: join the working group or project, join the community call, make proposals, etc.\n\nNotify the new joiner for the important meetings just in case they missed out, and get familiar with living in LXDAO\n\n`}
          </Typography>
          <Typography>
            <Link sx={{ textDecorationColor: '#101828', color: '#101828' }}>
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
            }}
          >
            <Typography color="#101828" fontWeight="600">
              Your Boddy{' '}
              <span style={{ color: '#36AFF9' }}>{data.nickname}</span>
            </Typography>
            <Box
              component="img"
              src={data.avatart}
              sx={{
                width: '76.95px',
                height: '80px',
                ml: '15px',
                border: '0.5px solid #E5E5E5',
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
