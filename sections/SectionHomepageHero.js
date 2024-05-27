import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, Dialog, Link, Typography } from '@mui/material';
import Button from '@/components/Button';
import Container from '@/components/Container';
import CommunityLinkGroup from '@/components/CommunityLinkGroup';
import ActivityNotification from '@/components/ActivityNotification';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import useBuidler from '../components/useBuidler';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const textColorGradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const HightlightText = styled.span`
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #366eff, #23e5ff, #ff7fdb);
  -webkit-background-clip: text;
  animation: ${textColorGradient} 10s ease infinite;
  color: transparent;
  font-size: 98px;
  line-height: 100px;
  font-weight: 700;
  @media screen and (max-width: 900px) {
    font-size: 4.902rem;
    line-height: 1.02;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5625rem;
    line-height: 1.02;
  }
`;

const SectionHomepageHero = () => {
  const { address, isConnected } = useAccount();
  const [record, setRecord] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [finishInfo, setFinishInfo] = useState(false);
  const router = useRouter();

  //
  const [, buidler, ,] = useBuidler(address);

  //
  useEffect(() => {
    if (buidler && !record) {
      setRecord(buidler);
      setIsMember(
        buidler?.badges?.find((badge) => {
          return badge?.id === 'MemberFirstBadge';
        })?.amount > 0
      );
    }
  }, [buidler, record]);

  //
  const Title = () => {
    return (
      <Box marginTop="112px">
        <Box>
          <Typography variant="h1">LXDAO is an</Typography>
          <HightlightText>R&amp;D</HightlightText>
          <Typography variant="h1" display="inline">
            -focused DAO
          </Typography>
          <Typography variant="h1">in Web3</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container
      minHeight={{ md: '800px', xs: '660px' }}
      display="flex"
      flexDirection={{ lg: 'row', xs: 'column' }}
      justifyContent="flex-start"
      alignItems="center"
      textAlign="center"
      gap={{ lg: '120px', xs: '40px' }}
    >
      {finishInfo && (
        <Dialog
          maxWidth="383px"
          onClose={() => {
            setFinishInfo(false);
          }}
          open={finishInfo}
        >
          <Box
            sx={{
              borderRadius: '6px',
              background: '#fff',
              width: '383px',
              padding: '32px',
            }}
          >
            <Typography
              component="h3"
              textAlign="center"
              fontWeight="700"
              fontSize="18px"
              marginBottom={2}
            >
              Onboarding process
            </Typography>
            <Typography variant="div" fontWeight="500" color="#000">
              <Typography variant="p">
                This member has not yet completed the onboarding，Please attend
                a community call to introduce yourself
              </Typography>
              <br />
              <Typography variant="p">
                Community call time: Every Saturday at 10am (UTC+8)
              </Typography>
              <br />
              <Typography variant="p">
                Community call link: (
                <Link
                  target="_blank"
                  sx={{ wordBreak: 'break-all', color: 'rgb(60, 122, 255)' }}
                  href={`https://forum.lxdao.io/c/governance/community-call/22`}
                >
                  join
                </Link>
                )
              </Typography>
            </Typography>
          </Box>
        </Dialog>
      )}
      <Box
        display="flex"
        flexDirection="column"
        gap={6}
        alignItems="flex-start"
        textAlign="left"
      >
        <Title />
        <Box display={{ md: 'block', sm: 'none', xs: 'none' }}>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            A solution on supporting valuable Web3 <strong>Public Goods</strong>{' '}
            and <strong>Open Source</strong> sustainably.
          </Typography>
        </Box>
        <Box display={{ md: 'none', sm: 'block', xs: 'block' }}>
          <Typography variant="subtitle1" lineHeight="36px" color="#667085">
            A solution on supporting valuable Web3 <strong>Public Goods</strong>{' '}
            and <strong>Open Source</strong> sustainably.
          </Typography>
        </Box>
        {isMember ? null : address && isConnected ? (
          <Button
            variant="gradient"
            width="180px"
            marginBottom={2}
            onClick={() => {
              const hasCard = record?.badges?.find((badge) => {
                return badge?.id === 'MemberFirstBadge';
              });
              if (!buidler?.name) {
                router.push('/onboarding/intro');
              } else if (buidler?.name && !hasCard) {
                setFinishInfo(true);
              }
            }}
          >
            JOIN US
          </Button>
        ) : (
          <ConnectButton.Custom>
            {({ openConnectModal }) => {
              return (
                <Button
                  variant="gradient"
                  width="180px"
                  marginBottom={2}
                  onClick={openConnectModal}
                >
                  JOIN US
                </Button>
              );
            }}
          </ConnectButton.Custom>
        )}

        <CommunityLinkGroup marginBottom={0} />
        <ActivityNotification />
      </Box>
    </Container>
  );
};

export default SectionHomepageHero;
