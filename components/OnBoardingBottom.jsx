import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useAccount } from 'wagmi';
export default function OnBoardingBottom({
  back = '',
  next = '',
  disableNext = false,
}) {
  const { address } = useAccount();
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        alignItems: 'center',
      }}
    >
      {
        <Box
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            router.push(back);
          }}
          sx={{
            display: 'flex',
            visibility: back ? 'visibility' : 'hidden',
            width: '223px',
            cursor: 'pointer',
            color: '#666F85',
            borderRadius: '6px',
            outline: 'none',
            padding: '12px 20px',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '600',
            mx: '8px',
            background: '#F4F6F8',
            mb: { xs: '10px', md: 0 },
          }}
        >
          Back
        </Box>
      }

      {next && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          visibility={next ? 'visible' : 'hidden'}
          onClick={() => {
            if (next == 'done') {
              router.push(`/buidlers/${address}`);
              return;
            }
            router.push(next);
          }}
          sx={{
            width: '223px',
            cursor: 'pointer',
            color: '#ffffff',
            borderRadius: '6px',
            outline: 'none',
            padding: '12px 20px',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '600',
            mx: '8px',
            pointerEvents: disableNext ? 'none' : 'normal',
            background: disableNext
              ? 'linear-gradient(89.57deg, rgba(41,117,223,0.5) 0.27%, rgba(58,207,227,0.5) 105.82%)'
              : 'linear-gradient(90deg, #305FE8 0%, #3AD9E3 100%)',
          }}
        >
          {next == 'done' ? 'Done' : 'I Got'}
        </Box>
      )}
    </Box>
  );
}
