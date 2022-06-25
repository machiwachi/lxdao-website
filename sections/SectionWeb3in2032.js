import React from 'react';
import { t } from '@lingui/macro';
import { Box } from '@mui/material';
import styled from 'styled-components';

import formatAddress from '@/utils/utility';
import Container from '@/components/Container';
import Button from '@/components/Button';

const CardWrapper = styled.div`
  background-color: ${(props) => props.bgColor};
  color: #ffffff;
  width: 384px;
  display: flex;
`;

const CardContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 24px;
  margin: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 24px;
`;

const CardContent = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 24px;
`;

const CardInfoWrapper = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
`;

const CardDate = styled.span`
  font-size: 16px;
`;

const CardAddress = styled.span`
  font-size: 16px;
`;

const web3in2032Data = [
  {
    content:
      'ETH 2.0 finally released, now we can use it to build your own decentralized applications.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
    color: '#64CCEB',
  },
  {
    content: 'ETH 2.0 finally rns.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
    color: '#305FE8',
  },
  {
    content: 'ETH 2.0 finally released, now we can use it to build cations.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
    color: '#0F39D9',
  },
];

// eslint-disable-next-line react/prop-types
const NFTCard = ({ data }) => (
  <CardWrapper bgColor={data.color}>
    <CardContentContainer>
      <CardContent>{data.content}</CardContent>
      <CardInfoWrapper>
        <CardDate>{data.createTime}</CardDate>
        <CardAddress>{formatAddress(data.createAddress)}</CardAddress>
      </CardInfoWrapper>
    </CardContentContainer>
  </CardWrapper>
);

const SectionWeb3in2032 = () => (
  <Container title={t`lxdao-web3in2032-title`}>
    <Box
      marginBottom="48px"
      display="flex"
      flexDirection="column"
      gap="32px"
      alignItems="center"
    >
      <Box display="flex" gap="32px">
        {web3in2032Data.map((data, index) => {
          return <NFTCard data={data} key={index} />;
        })}
      </Box>
      <Button>Imagine my Web3 day in 2032</Button>
    </Box>
  </Container>
);

export default SectionWeb3in2032;
