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
import LXButton from '@/components/Button';

import Layout from '@/components/Layout';

function OneTask({ iconPath, desc, buttonText, handleClick }) {
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
      <Button
        variant="outlined"
        size="large"
        sx={{
          border: '1px solid #D0D5DD',
          textTransform: 'capitalize',
        }}
        onClick={handleClick}
      >
        <Typography variant="body1" color="#101828">
          {buttonText}
        </Typography>
      </Button>
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
      <Box
        display="flex"
        justifyContent={{ xs: 'center', md: 'end' }}
        sx={{ width: '100%' }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{
            border: '1px solid #D0D5DD',
            textTransform: 'capitalize',
          }}
        >
          <Typography variant="body1" color="#101828">
            Done
          </Typography>
        </Button>
      </Box>
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
          // mt: 12,
          maxWidth: 1216,
          display: 'flex',
          flexDirection: 'column',
          mb: '55px',
          // alignItems: 'center',
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
        <Stack
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: { xs: 'center', md: 'left' },
            gap: 3,
            py: 6,
          }}
        >
          <Box
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            position="relative"
          >
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                borderBottom: '28.28px solid #d0d5dd',
                borderLeft: '28.28px solid transparent',
                borderRight: '28.28px solid transparent',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            ></Box>
            <Box
              sx={{
                position: 'absolute',
                width: '145.8px',
                height: '28.28px',
                textAlign: 'center',
                transform: 'rotate(-45deg)',
                top: 27.5,
                left: -31.5,
              }}
            >
              <Typography color="#fff" variant="body2" lineHeight="28.28px">
                To be earned
              </Typography>
            </Box>

            <Box
              component="img"
              src="/images/badge/first-badge.png"
              width="368px"
              height="180px"
            ></Box>
          </Box>

          <Typography
            fontFamily="Inter"
            fontSize="48px"
            lineHeight="44px"
            fontWeight="800"
          >
            Earn your first badge
          </Typography>
          <LXButton variant="gradient">Mint membership badge </LXButton>
          <Typography color="#666F85">
            Complete the 3 task below to earn the membership badge
          </Typography>
        </Stack>
        <Stack sx={{ gap: 3 }}>
          {[
            {
              order: '1st task',
              title: 'Introduce yourself',
              children: (
                <OneTask
                  iconPath="/images/badge/user.svg"
                  desc="Go to the forum to introduce yourself and let everyone know you"
                  buttonText="go to the forum"
                  handleClick={() => {
                    window.location.href = 'https://forum.lxdao.io/';
                  }}
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
                  buttonText="Done"
                  handleClick={() => {
                    // window.location.href = 'https://forum.lxdao.io/';
                  }}
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
