import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionProjects = () => (
  <Box paddingY="96px" paddingX="80px" textAlign="center">
    <Typography variant="h4">Projects</Typography>
    <Typography fontSize="20px" marginTop="16px">
      We buidl good, valuable, and useful things.
    </Typography>
    <Box display="flex" gap="64px" marginTop="48px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="425px"
        border="1px solid #000000"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          window.open('https://gclx.xyz/', '_blank');
        }}
      >
        <Box component="img" width="100%" src="/images/gclx-banner.png"></Box>
        <Box padding="0 24px 24px 24px">
          <Box
            component="img"
            position="relative"
            bottom="27px"
            width="45px"
            src="/images/gclx-logo.png"
          ></Box>
          <Typography
            fontSize="20px"
            lineHeight="30px"
            color="#101828"
            marginBottom="8px"
          >
            GuoChanLiangXin
          </Typography>
          <Typography fontSize="16px" lineHeight="24px">
            中国人不骗中国人！国产良心 NFT
            是专为中国人打造的一个存在于以太坊区块链上的由代码随机生成 1000
            个国产良心 NFT。国产良心 NFT
            的持有者将会获得一个头像，并且拥有扶持国产良心 NFT 的义务。For
            English speakers, we do not provide an English version, please
            consider learning Chinese or using Google Translate. Thanks.
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="425px"
        border="1px solid #000000"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          window.open('https://myfirstnft.info/', '_blank');
        }}
      >
        <Box component="img" width="100%" src="/images/mfnft-banner.png"></Box>
        <Box padding="0 24px 24px 24px">
          <Box
            component="img"
            position="relative"
            bottom="27px"
            width="45px"
            src="/images/mfnft-logo.png"
          ></Box>
          <Typography
            fontSize="20px"
            lineHeight="30px"
            color="#101828"
            marginBottom="8px"
          >
            My First NFT
          </Typography>
          <Typography fontSize="16px" lineHeight="24px">
            MyFirstNFT is a non-profit instructional project for Web3 newbies.
            Get a FREE NFT while learning about Web3, underlying values of NFT,
            and security principles.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default SectionProjects;
