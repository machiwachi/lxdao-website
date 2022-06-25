import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';

export default function Header() {
  const router = useRouter();
  const lastPathnameRef = React.useRef(router.pathname);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="60px"
    >
      <Typography variant="h4" paddingLeft="24px">{t`LXDAO`}</Typography>
      <Box>
        <Typography
          target="_blank"
          component="a"
          href="https://twitter.com/LXDAO_Official"
          color="primary"
          marginRight={2}
        >
          <Box width="50px" component={'img'} src={'/icons/twitter.svg'} />
        </Typography>
        <Typography
          target="_blank"
          component="a"
          href="https://discord.gg/UBAmmtBs"
          color="primary"
          marginRight={2}
        >
          <Box width="50px" component={'img'} src={'/icons/discord.svg'} />
        </Typography>
      </Box>
    </Box>
  );
}
