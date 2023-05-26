import NavigateNextIcon from '@mui/icons-material/NavigateNext'; /* eslint-disable no-undef */
import React from 'react';
import {
  Box,
  Stack,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Container,
} from '@mui/material';
// import { Button as LXButton } from '@/components/Button';
import { CardShow } from '@/components/CardShow';

import Layout from '@/components/Layout';

function OneTask({ iconPath, desc }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '0.5px solid #D0D5DD',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            icon: '/images/badge/twitter.svg',
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
            icon: '/images/badge/twitter.svg',
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
            icon: '/images/badge/discord.svg',
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Discord{' '}
                <Link
                  underline="none"
                  color="#36AFF9"
                  href="http://discord.lxdao.io/"
                >
                  http://discord.lxdao.io/
                </Link>
              </Typography>
            ),
          },
          {
            icon: '/images/badge/notion.svg',
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
            icon: '/images/badge/github.svg',
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
            icon: '/images/badge/email.svg',
            desc: (
              <Typography variant="body1" color="#101828" fontWeight={500}>
                Subscribe to newsletter (entry at right-bottom of the page)
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
            <Box component="img" src={val.icon} width={'48px'} />
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
      <Typography variant="subtitle2" fontWeight="800">
        <span style={{ color: '#36AFF9' }}>{order} </span>
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

export default function FirstBadge() {
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
            <Link underline="hover" color="inherit" href="/">
              <Typography variant="body1">Member profile</Typography>
            </Link>
            <Link underline="none" color="#437EF7" aria-current="page">
              <Typography variant="body1">Earn your first badge</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
        <CardShow title="first badge" path="/images/badge/first-badge.png" buttonText="" tip={<>Please complete the following 3 tasks and wait for the governance working group to verify (contact <Link underline='none' color="#36AFF9">Marcus</Link> to check the status)</>}/>
        <Stack sx={{ gap: 3 }}>
          {[
            {
              order: '1st task',
              title: 'Introduce yourself',
              children: (
                <OneTask
                  iconPath="/images/badge/user.svg"
                  desc="Go to the forum to introduce yourself and let everyone know you"
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
                  desc="Every Saturday at 10:00 am UTC+8"
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
}
