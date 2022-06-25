import React from 'react';
import { t } from '@lingui/macro';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const ProjectLogo = styled.img`
  position: relative;
  bottom: 32px;
  width: 64px;
`;

const SectionProjects = () => (
  <Container title={t`lxdao-projects-title`}>
    <Box display="flex" gap="32px">
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="#F9FAFB"
        borderRadius="16px"
        alignItems="center"
        width="384px"
        cursor="pointer"
        padding="0 24px 32px 24px"
        onClick={() => {
          window.open('https://gclx.xyz/', '_blank');
        }}
      >
        <ProjectLogo src="/images/gclx-logo.png" />
        <Typography
          fontSize="20px"
          lineHeight="30px"
          color="#101828"
          marginBottom="8px"
        >
          GuoChanLiangXin
        </Typography>
        <Typography fontSize="16px" lineHeight="24px" color="#667085">
          中国人不骗中国人！国产良心 NFT
          是专为中国人打造的一个存在于以太坊区块链上的由代码随机生成 1000
          个国产良心 NFT。国产良心 NFT
          的持有者将会获得一个头像，并且拥有扶持国产良心 NFT 的义务。For English
          speakers, we do not provide an English version, please consider
          learning Chinese or using Google Translate. Thanks.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="#F9FAFB"
        borderRadius="16px"
        alignItems="center"
        width="384px"
        cursor="pointer"
        padding="0 24px 32px 24px"
        onClick={() => {
          window.open('https://myfirstnft.info/', '_blank');
        }}
      >
        <ProjectLogo src="/images/mfnft-logo.png" />
        <Typography
          fontSize="20px"
          lineHeight="30px"
          color="#101828"
          marginBottom="8px"
        >
          My First NFT
        </Typography>
        <Typography fontSize="16px" lineHeight="24px" color="#667085">
          MyFirstNFT is a non-profit instructional project for Web3 newbies. Get
          a FREE NFT while learning about Web3, underlying values of NFT, and
          security principles.
        </Typography>
      </Box>
    </Box>
  </Container>
);

export default SectionProjects;
