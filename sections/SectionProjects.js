import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionProjects = () => (
  <Box
    paddingY={{ md: '96px', xs: 8 }}
    paddingX={{ md: 10, xs: 6 }}
    textAlign="center"
    id="Projects-Section"
  >
    <Typography variant="h4">Projects</Typography>
    <Typography fontSize="20px" marginTop={2}>
      We buidl good, valuable, and useful things.
    </Typography>
    <Box
      display="flex"
      flexDirection={{ md: 'row', xs: 'column' }}
      gap={{ md: 8, xs: 4 }}
      alignItems={{ md: 'stretch', xs: 'center' }}
      marginTop={6}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={{ md: '320px', xs: '100%' }}
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
        width={{ md: '320px', xs: '100%' }}
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
            marginBottom={1}
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
