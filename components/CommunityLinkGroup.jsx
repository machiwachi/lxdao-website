import { Box, Link, Typography } from '@mui/material';
import { BsGithub, BsTelegram, BsTwitter, BsWechat } from 'react-icons/bs';
import { MdForum } from 'react-icons/md';
import EXTERNAL_LINKS from '@/config/externalLinks';
import StyledToolTip from './StyledToolTip';

const CommunityLinkGroup = ({ marginBottom = 10 }) => (
  <Box display="flex" gap={4} marginBottom={marginBottom}>
    <Link href={EXTERNAL_LINKS.social.twitter} target="_blank">
      <BsTwitter size={24} />
    </Link>
    <Link href={EXTERNAL_LINKS.social.telegram} target="_blank">
      <BsTelegram size={24} />
    </Link>
    <Link href={EXTERNAL_LINKS.social.forum} target="_blank">
      <MdForum size={24} />
    </Link>
    <Link href={EXTERNAL_LINKS.social.github} target="_blank">
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
