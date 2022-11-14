import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ActivityNotification = () => (
  <Box
    width={{ md: '610px', sm: '100%', xs: '100%' }}
    borderRadius="6px"
    display="flex"
    gap="11px"
    alignItems="center"
    color="#ffffff"
    padding="10px"
    marginBottom="129px"
    sx={{
      background: 'linear-gradient(90deg, #3B80FD 0%, #1FE9D6 100%)',
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap="5px">
      <Typography variant="body2" lineHeight="24px" fontWeight={600}>
        Oct
      </Typography>
      <Typography variant="h4" lineHeight="24px" fontWeight={600}>
        28
      </Typography>
    </Box>
    <Box
      width="2px"
      height="40px"
      marginLeft="3px"
      sx={{ background: '#ffffff' }}
    />
    <Box display="flex" flexDirection="column" gap="6px">
      <Typography variant="body1" lineHeight="24px" fontWeight={600}>
        🎉 Congratulation! The proposal"Donate3 " already passed!
      </Typography>
      <Typography variant="body2" lineHeight="24px" fontWeight={500}>
        Time: 13:00 pm sep 28. <Link color="#ffffff">Learn more →</Link>
      </Typography>
    </Box>
  </Box>
);

export default ActivityNotification;
