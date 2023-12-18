import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ActivityNotification = () => (
  <Link
    color="#ffffff"
    sx={{
      textDecoration: 'none',
    }}
    href="https://docs.lxdao.io/lxdao/gong-gong-ri-li"
    target={'_blank'}
    marginBottom={10}
  >
    <Box
      width={{ md: '610px', sm: '100%', xs: '100%' }}
      borderRadius="6px"
      display="flex"
      gap="11px"
      alignItems="center"
      color="#ffffff"
      padding="10px"
      sx={{
        background: 'linear-gradient(90deg, #3B80FD 0%, #1FE9D6 100%)',
      }}
    >
      {/* <Box display="flex" flexDirection="column" alignItems="center" gap="5px">
      <Typography variant="body2" lineHeight="24px" fontWeight={600}>
        Oct
      </Typography>
      <Typography variant="h4" lineHeight="24px" fontWeight={600}>
        28
      </Typography>
    </Box> */}
      <Box
        width="2px"
        height="40px"
        marginLeft="3px"
        sx={{ background: '#ffffff' }}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" lineHeight="24px" fontWeight={600}>
          Want to check out the latest LXDAO Events?
        </Typography>
        <Typography variant="body2" lineHeight="24px" fontWeight={500}>
          Click here to open the LXDAO Public Calendar -&gt;
        </Typography>
      </Box>
    </Box>
  </Link>
);

export default ActivityNotification;
