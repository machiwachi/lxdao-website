import React from 'react';
import { Box, Typography, Link, Tooltip } from '@mui/material';

import Container from '@/components/Container';

const DataBox = ({ number, name, link, detail }) => (
  <Link
    href={link}
    color="#ffffff"
    sx={{ textDecoration: 'none' }}
    flex={1}
    gap={2}
  >
    {detail ? (
      <Tooltip title={detail} placement="bottom">
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            border: '0.5px solid #ffffff',
            borderRadius: '6px',
            background: 'transpant',
          }}
          paddingY="30px"
        >
          <Typography variant="h3" lineHeight="51px" fontWeight={700}>
            {number}
          </Typography>
          <Typography variant="subtitle1" lineHeight="25px" fontWeight={400}>
            {name}
          </Typography>
        </Box>
      </Tooltip>
    ) : (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          border: '0.5px solid #ffffff',
          borderRadius: '6px',
          background: 'transpant',
        }}
        paddingY="30px"
      >
        <Typography variant="h3" lineHeight="51px" fontWeight={700}>
          {number}
        </Typography>
        <Typography variant="subtitle1" lineHeight="25px" fontWeight={400}>
          {name} →
        </Typography>
      </Box>
    )}
  </Link>
);

const SectionMission = ({ projectAmount, buidlerAmount }) => (
  <Box
    sx={{ background: 'linear-gradient(90deg, #2A76DF 0%, #0FDBC2 100%)' }}
    width="100%"
    color="#ffffff"
  >
    <Container paddingY={{ md: '112px', xs: 8 }} margin="0 auto">
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        gap={{ md: '64px', sm: '56px', xs: '56px' }}
      >
        <Typography variant="subtitle1" lineHeight="30px" fontWeight={500}>
          Our Mission
        </Typography>
        <Typography
          variant="h2"
          lineHeight={{ md: '70px', sm: '50px', xs: '50px' }}
          fontWeight={500}
        >
          Gather the power of buidlers to buidl and support “LX” (valuable) Web3
          projects sustainably and welcome 1 billion users into Web3.
        </Typography>
        <Box
          display="flex"
          flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
          gap={2}
        >
          <DataBox
            number="12k+"
            name="Influence"
            detail={
              <div>
                <div>
                  <span>Discord: </span>
                  <span>700+</span>
                </div>
                <div>
                  <span>Twitter: </span>
                  <span>6.5k+</span>
                </div>
                <div>
                  <span>WeChat: </span>
                  <span>3k+</span>
                </div>
                <div>
                  <span>WeChat Official Accounts: </span>
                  <span>1.8k+</span>
                </div>
              </div>
            }
          />
          <DataBox
            number={buidlerAmount}
            name="Buidler card holders"
            link="/buidlers"
          />
          <DataBox number={projectAmount} name="Projects" link="/projects" />
          <DataBox
            number="120k+ USDC"
            name="Treasury"
            link="https://gnosis-safe.io/app/eth:0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2/home"
          />
        </Box>
      </Box>
    </Container>
  </Box>
);

export default SectionMission;
