import { Box } from '@mui/material';

import AirdropCard from './AirdropCard';

export default function AirdropDashboard() {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AirdropCard />
    </Box>
  );
}
