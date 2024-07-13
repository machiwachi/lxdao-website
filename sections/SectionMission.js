import React, { useEffect, useState } from 'react';

import { Box, Link, Tooltip, Typography } from '@mui/material';

import Container from '@/components/Container';

import { erc20Abi } from 'viem';

import { useReadContracts } from 'wagmi';

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

const SectionMission = ({ projectAmount, buidlerAmount }) => {
  const usdtAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const usdcAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const daiAmount = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: ['0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2'],
      },
    ],
  });

  const [totalTreasury, setTotalTreasury] = useState(0);

  useEffect(() => {
    if (usdtAmount.data && usdcAmount.data && daiAmount.data) {
      const sum =
        parseFloat(usdtAmount.data[0]) / 1e6 +
        parseFloat(usdcAmount.data[0]) / 1e6 +
        parseFloat(daiAmount.data[0]) / 1e18;
      setTotalTreasury(sum);
    }
  }, [usdtAmount.data, usdcAmount.data, daiAmount.data]);

  return (
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
            Supporting valuable Web3 Public Good and Open Source sustainably.
          </Typography>
          <Box
            display="flex"
            flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
            gap={2}
          >
            <DataBox
              number="16k+"
              name="Influence"
              detail={
                <div>
                  <div>
                    <span>Discord: </span>
                    <span>955+</span>
                  </div>
                  <div>
                    <span>Media: </span>
                    <span>12k+</span>
                  </div>
                  <div>
                    <span>WeChat: </span>
                    <span>3k+</span>
                  </div>
                </div>
              }
            />
            <DataBox
              number={buidlerAmount}
              name="Registered members"
              link="/buidlers"
            />
            <DataBox number={projectAmount} name="Projects" link="/projects" />
            <DataBox
              number={`$${(totalTreasury / 1e3).toFixed(0)}k+`}
              name="Treasury"
              link="https://app.safe.global/home?safe=eth:0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionMission;
