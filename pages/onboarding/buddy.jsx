import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { Box, Typography, Link } from '@mui/material';

import OnBoardingLayout from '@/components/OnBoardingLayout';
import useBuidler from '@/components/useBuidler';

export default function Buddy() {
  const { address } = useAccount();
  const router = useRouter();
  const [loading, record, error, refresh] = useBuidler(address);
  const data = {
    address: record?.buddies[0]?.address,
    name: record?.buddies[0]?.name,
    avatar: record?.buddies[0]?.avatar,
  };
  let host = '';
  if (typeof window !== 'undefined') {
    host = window.location.protocol + '//' + window.location.host;
  }
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
            {`Answering any questions `}
            <Link href={`/buidlers/${data.address}`} color="#667085">
              {host + `/buidlers/${data.address}`}
            </Link>{' '}
            {`from the new joiner. If you don’t know, ask your Buddy\n\nHelp the new joiner to involve in DAO activities: join the working group or project, join the community call, make proposals, etc.\n\nNotify the new joiner for the important meetings just in case they missed out, and get familiar with living in LXDAO\n\n`}
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
            }}
            onClick={() => {
              router.push(`/buidlers/${data.address}`);
            }}
          >
            <Typography color="#101828" fontWeight="600" whiteSpace="pre-wrap">
              Your Boddy{'    '}
              <span style={{ color: '#36AFF9' }}>{data.name}</span>
            </Typography>
            <Box
              component="img"
              src={data.avatar}
              sx={{
                width: '80px',
                height: '80px',
                mx: '20px',
                border: '0.5px solid #E5E5E5',
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}
