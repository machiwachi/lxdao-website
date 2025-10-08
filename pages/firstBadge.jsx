import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; /* eslint-disable no-undef */
import { FaTelegram, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';
import { useAccount } from 'wagmi';
import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Container,
} from '@mui/material';

import { CardShow } from '@/components/CardShow';
import Layout from '@/components/Layout';

function IconContainer({ children }) {
  return (
    <Box
      sx={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: '1px solid #D0D5DD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function OneTask({ iconPath, desc }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '0.5px solid #D0D5DD',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: '6px',
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          alignItems: 'center',
          mb: { xs: 1, md: 0 },
        }}
      >
        <Box component="img" src={iconPath} width={'48px'} />
        <Typography variant="subtitle2" color="#101828" fontWeight={500}>
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

function MultiTasks() {
  return (
    <Stack
      sx={{
        // display: 'flex',
        border: '0.5px solid #D0D5DD',
        // justifyContent: 'space-between',
        alignItems: 'start',
        borderRadius: '6px',
        gap: { xs: 1, md: 5 },
        p: 3,
        width: '100%',
      }}
    >
      <Stack gap={2}>
        {[
          {
            icon: (
              <IconContainer>
                <FaTwitter size={24} color="#101828" />
              </IconContainer>
            ),
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Follow the official Twitter:{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="https://twitter.com/LXDAO_Official"
                >
                  https://twitter.com/LXDAO_Official
                </Link>
              </Typography>
            ),
          },
          {
            icon: (
              <IconContainer>
                <FaTwitter size={24} color="#101828" />
              </IconContainer>
            ),
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Follow the LXDAO Twitter List{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="https://twitter.com/i/lists/1576113456792551424"
                >
                  https://twitter.com/i/lists/1576113456792551424
                </Link>
              </Typography>
            ),
          },
          {
            icon: (
              <IconContainer>
                <SiNotion size={24} color="#101828" />
              </IconContainer>
            ),
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Notion{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="https://lxdao.notion.site/"
                >
                  https://lxdao.notion.site/
                </Link>
              </Typography>
            ),
          },
          {
            icon: (
              <IconContainer>
                <FaGithub size={24} color="#101828" />
              </IconContainer>
            ),
            desc: (
              <Typography
                variant="body1"
                color="#101828"
                fontWeight={500}
                // sx={{ wordBreak: 'break-all' }}
              >
                GitHub{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="https://github.com/lxdao-official"
                >
                  https://github.com/lxdao-official
                </Link>{' '}
                (for developers)
              </Typography>
            ),
          },
          {
            icon: (
              <IconContainer>
                <FaTelegram size={24} color="#101828" />
              </IconContainer>
            ),
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Join our Telegram group{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="https://t.me/LXDAO"
                  target="_blank"
                >
                  https://t.me/LXDAO
                </Link>
              </Typography>
            ),
          },
        ].map((val, index) => (
          <Box
            key={index}
            display="flex"
            gap="17px"
            justifyContent="start"
            alignItems="center"
            width="100%"
            sx={{ overflowWrap: 'anywhere' }}
          >
            {val.icon}
            {val.desc}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

function TaskItems({ children, order, title }) {
  return (
    <Stack>
      <Typography variant="subtitle2" fontWeight="800" marginBottom="24px">
        <span style={{ color: '#36AFF9' }}>{order} </span>
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

const FirstBadge = () => {
  const { address } = useAccount();
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    if (address) {
      setCurrentAddress(address);
    }
  }, [address]);

  return (
    <Layout>
      <Container
        sx={{
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          mb: '55px',
        }}
      >
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link href={`/buidlers/${currentAddress}?isFromOnboarding=true`}>
              <Typography variant="body1">Member profile</Typography>
            </Link>
            <Link underline="none" color="#437EF7" aria-current="page">
              <Typography variant="body1">Earn your first badge</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
        <CardShow
          title="first badge"
          path="/images/badge/first-badge.png"
          buttonText=""
          tip={
            <>
              Please complete the following 3 tasks and wait for the Community
              Manager to verify (contact{' '}
              <Link underline="none" color="#36AFF9">
                <a href="mailto: zqsanjingshou@gmail.com">Marcus</a>
              </Link>{' '}
              to check your status)
            </>
          }
        />
        <Stack sx={{ gap: 3, marginTop: '68px' }}>
          {[
            {
              order: '1st task',
              title: 'Introduce yourself',
              children: (
                <OneTask
                  iconPath="/images/badge/user.svg"
                  desc={
                    <Link
                      href="https://forum.lxdao.io/t/about-the-new-to-lxdao-introduction-category/162"
                      target="_blank"
                      sx={{ textDecoration: 'none' }}
                    >
                      Introduce yourself on the forum and let everyone get to
                      know you. {'->'}
                    </Link>
                  }
                />
              ),
            },
            {
              order: '2nd task',
              title: 'Stay connected',
              children: <MultiTasks />,
            },
            {
              order: '3rd task',
              title: 'Join a Community Call',
              children: (
                <OneTask
                  iconPath="/images/badge/clock.svg"
                  desc={
                    <Link
                      href="https://forum.lxdao.io/c/governance/community-call/22"
                      target="_blank"
                      sx={{ textDecoration: 'none' }}
                    >
                      Check the latest posts to join our weekly meeting (every
                      Saturday at 11:00 AM UTC+8). {'->'}
                    </Link>
                  }
                />
              ),
            },
          ].map((val, index) => (
            <TaskItems key={index} order={val.order} title={val.title}>
              {val.children}
            </TaskItems>
          ))}
        </Stack>
      </Container>
    </Layout>
  );
};

export default FirstBadge;
