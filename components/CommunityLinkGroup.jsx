import React from 'react';

import { Typography, Box, Link } from '@mui/material';
import StyledToolTip from './StyledToolTip';
import {
  BsWechat,
  BsGithub,
  BsTwitter,
  BsTelegram,
  BsDiscord,
} from 'react-icons/bs';

const CommunityLinkGroup = ({ marginBottom = 10 }) => (
  <Box display="flex" gap={4} marginBottom={marginBottom}>
    <Link href="https://twitter.com/LXDAO_Official" target="_blank">
      <BsTwitter size={24} />
    </Link>
    <Link href="https://t.me/LXDAO" target="_blank">
      <BsTelegram size={24} />
    </Link>
    <Link href="https://forum.lxdao.io" target="_blank">
      <BsDiscord size={24} />
    </Link>
    <Link href="https://github.com/lxdao-official" target="_blank">
      <BsGithub size={24} />
    </Link>

    <StyledToolTip
      title={
        <Box border={2} borderColor="primary.main">
          <img
            src="/images/wechat-channel-qrcode.png"
            alt=""
            width={240}
            height={240}
          />
          <Typography color="#666F85" textAlign="center" padding={2}>
            Scan using WeChat
          </Typography>
        </Box>
      }
      placement="top"
    >
      <Link href="#">
        <BsWechat size={24} />
      </Link>
    </StyledToolTip>
  </Box>
);

export default CommunityLinkGroup;
