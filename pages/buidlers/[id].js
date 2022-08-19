/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Box, Typography, Link, Button, Tabs, Tab, Grid } from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from '@mui/lab';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { formatAddress } from '@/utils/utility';

function Tag(props) {
  return (
    <Box
      style={{
        border: '1px solid #D0D5DD',
        borderRadius: '2px',
        padding: '2px 6px',
        marginLeft: '4px',
        marginBottom: '4px',
      }}
    >
      {props.text}
    </Box>
  );
}

function Project(props) {
  return (
    <Box display="flex" boxShadow={2} borderRadius={1} overflow="hidden">
      <Box flexBasis="158px">
        <img
          style={{ display: 'block', width: 158 }}
          src="/projects/2032-logo-square.png"
          alt=""
        />
      </Box>
      <Box flex="auto" padding={2} position="relative">
        <Typography variant="h5">Web3 In 2032</Typography>
        <Box display="flex" marginTop={2}>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Project Role
            </Typography>
            <Typography>Project Manager</Typography>
          </Box>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Started at
            </Typography>
            <Typography>2022-08-01</Typography>
          </Box>
          <Box flex="1">
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#101828',
              }}
            >
              Ended at
            </Typography>
            <Typography>-</Typography>
          </Box>
        </Box>
        <Typography sx={{ position: 'absolute', top: '24px', right: '36px' }}>
          Project#002
        </Typography>
      </Box>
    </Box>
  );
}

function BuidlerDetails() {
  const [details, setDetails] = useState('buidlerCard');

  return (
    <Container paddingY={10}>
      <Box display="flex">
        <Box marginRight={6}>
          <Box width="150px" borderRadius="50%" overflow="hidden">
            <img
              style={{ display: 'block', width: 150 }}
              src="/images/kuncle.jpeg"
              alt=""
            />
          </Box>
          <Box textAlign="center" marginTop={4}>
            <Button size="small" variant="outlined">
              Edit
            </Button>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <Typography variant="h4">Wang Teng</Typography>
              <Typography>
                I am a UI designer with 7 years of work experience, I hope to
                learn more knowledge in WEB3.
              </Typography>
            </Box>
            <Box>
              <Box borderRight="1px solid #D0D5DD">
                <Link
                  marginRight={5}
                  target="_blank"
                  href="https://twitter.com/LXDAO_Official"
                >
                  <Box
                    width="18px"
                    component={'img'}
                    src={'/icons/website.svg'}
                  />
                </Link>
                <Link
                  marginRight={5}
                  target="_blank"
                  href="https://twitter.com/LXDAO_Official"
                >
                  <Box
                    width="18px"
                    component={'img'}
                    src={'/icons/twitter.svg'}
                  />
                </Link>
                <Link
                  marginRight={5}
                  target="_blank"
                  href="https://twitter.com/LXDAO_Official"
                >
                  <Box
                    width="18px"
                    component={'img'}
                    src={'/icons/discord.svg'}
                  />
                </Link>
                <Link
                  marginRight={5}
                  target="_blank"
                  href="https://twitter.com/LXDAO_Official"
                >
                  <Box
                    width="18px"
                    component={'img'}
                    src={'/icons/ellipsis.svg'}
                  />
                </Link>
              </Box>
              <Box>
                {formatAddress('0x147b166fb4f1Aa9581D184596Dbabe2980ba4b14')}
              </Box>
            </Box>
          </Box>
          <Box display="flex">
            <Box flex="1">
              <Typography variant="h5">Role</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="Buidler" />
                <Tag text="Core" />
                <Tag text="Investor" />
                <Tag text="Project Manager" />
              </Box>
            </Box>
            <Box flex="1">
              <Typography variant="h5">Skills</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="UI Design" />
                <Tag text="PM" />
                <Tag text="FrontEnd" />
                <Tag text="Project Manager" />
              </Box>
            </Box>
            <Box flex="1">
              <Typography variant="h5">Interests</Typography>
              <Box display="flex" flexWrap="wrap">
                <Tag text="DAO" />
                <Tag text="DeFI" />
                <Tag text="Solidity" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value="project">
            <Tab label="Project 2" value="project" />
          </Tabs>
        </Box>
        <Box display="flex" marginTop={4}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Project />
            </Grid>
            <Grid item xs={6}>
              <Project />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box marginTop={10}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={details}
            onChange={(event, value) => {
              setDetails(value);
            }}
          >
            <Tab label="Buidler Card" value="buidlerCard" />
            <Tab label="My LXPoints" value="lxPoints" />
          </Tabs>
        </Box>
        <Box padding={2}>
          {details === 'buidlerCard' && (
            <Box>
              <img
                style={{ display: 'block', width: 150 }}
                src="/images/kuncle.jpeg"
                alt=""
              />
            </Box>
          )}
          {details === 'lxPoints' && (
            <Box>
              <Box>
                <Typography variant="h4">Accumulated LXPoints</Typography>
                <Typography>180</Typography>
              </Box>
              <Box>
                <Typography variant="h4">Reason</Typography>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      text for the reason，text for the reasontext for the
                      reasontext for the reason
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      text for the reason，text for the reasontext for the
                      reasontext for the reason
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default function Buidler() {
  return (
    <Layout>
      <Header />
      <BuidlerDetails />
      <Footer />
    </Layout>
  );
}
