import React from 'react';
import { Box, Link } from '@mui/material';

const CommunityLinkGroup = () => (
  <Box display="flex" gap={2}>
    <Link href="https://twitter.com/LXDAO_Official" target="_blank">
      <Box component={'img'} src={'/icons/twitter-circle.svg'} />
    </Link>
    <Link href="https://discord.com/invite/HtcDdPgJ7D" target="_blank">
      <Box component={'img'} src={'/icons/discord-circle.svg'} />
    </Link>
    <Link href="https://t.me/LXDAO" target="_blank">
      <Box component={'img'} src={'/icons/telegram-circle.svg'} />
    </Link>
    <Link href="https://forum.lxdao.io/" target="_blank">
      <Box component={'img'} src={'/icons/forum-circle.svg'} />
    </Link>
  </Box>
);

export default CommunityLinkGroup;
