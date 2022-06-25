import { t } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Parallax } from 'react-scroll-parallax';
import styled from 'styled-components';

import formatAddress from '@/utils/utility';
import Container from '@/components/Container';

const NFTContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 50px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  border: 1px solid #cccccc;
  padding: 10px;
  border-radius: 8px;
`;

const MessageContent = styled.p`
  margin: 0;
`;

const MessageInfoWrapper = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const MessageDate = styled.span`
  color: #a0aec0;
  font-size: 14px;
`;

const MessageAddress = styled.span`
  color: #a0aec0;
  font-size: 14px;
`;

const web3in2032Data = [
  {
    content:
      'ETH 2.0 finally released, now we can use it to build your own decentralized applications.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finally rns.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finally released, now we can use it to build cations.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finally rns.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finto build your own decentralized applications.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finally rns.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
  {
    content: 'ETH 2.0 finally released, now we can use it to build cations.',
    createTime: '2032-10-05',
    createAddress: '0x86DBe1f56dC3053b26522de1B38289E39AFCF884',
  },
];

const NFTMessage = ({ data }) => {
  return (
    <MessageWrapper>
      <MessageContent>{data.content}</MessageContent>
      <MessageInfoWrapper>
        <MessageDate>{data.createTime}</MessageDate>
        <MessageAddress>{formatAddress(data.createAddress)}</MessageAddress>
      </MessageInfoWrapper>
    </MessageWrapper>
  );
};

export default function SectionWeb3in2032({ id, bgcolor }) {
  return (
    <Container title={t`lxdao-web3in2032-title`}>
      <Box marginY="48px">
        <Parallax translateX={[-100, 100]}>
          <Box display="flex" marginBottom="50px" gap="12px">
            {web3in2032Data.map((data) => {
              return <NFTMessage data={data} />;
            })}
          </Box>
        </Parallax>
        <Parallax translateX={[0, -100]}>
          <Box display="flex" gap="12px">
            {web3in2032Data.map((data) => {
              return <NFTMessage data={data} />;
            })}
          </Box>
        </Parallax>
      </Box>
    </Container>
  );
}
