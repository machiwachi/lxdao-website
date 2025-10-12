import { Box, Link, Typography } from '@mui/material';
import {
  RiGithubFill,
  RiTelegram2Fill,
  RiTwitterXLine,
  RiWechat2Fill,
} from 'react-icons/ri';

import LINKS from '@/config/links';
import { MdForum } from 'react-icons/md';
import StyledToolTip from './StyledToolTip';

const CommunityLinkGroup = ({ marginBottom = 10 }) => (
  <Box display="flex" gap={4} marginBottom={marginBottom}>
    <Link href={LINKS.social.twitter} target="_blank">
      <RiTwitterXLine size={24} />
    </Link>
    <Link href={LINKS.social.telegram} target="_blank">
      <RiTelegram2Fill size={24} />
    </Link>
    <Link href={LINKS.social.forum} target="_blank">
      <MdForum size={24} />
    </Link>
    <Link href={LINKS.social.github} target="_blank">
      <RiGithubFill size={24} />
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
        <RiWechat2Fill size={24} />
      </Link>
    </StyledToolTip>
  </Box>
);

export default CommunityLinkGroup;
