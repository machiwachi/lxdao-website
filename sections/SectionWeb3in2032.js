import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import { formatAddress } from '@/utils/utility';
import Button from '@/components/Button';

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
];

// eslint-disable-next-line react/prop-types
const NFTCard = ({ data }) => (
  <Box
    padding="16px"
    borderRadius="8px"
    boxShadow="0 3px 6px 0 rgb(140 152 164 / 25%)"
    border="2px solid #000000"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    textAlign="left"
    gap="32px"
  >
    <Box>
      <Typography fontSize="14px" marginBottom="5px">
        {data.createTime}
      </Typography>
      <Typography color="#101828">{data.content}</Typography>
    </Box>
    <Box display="flex" justifyContent="space-between">
      <Typography fontSize="14px">
        {formatAddress(data.createAddress)}
      </Typography>
      <Typography color="#101828">WEB3 IN 2032</Typography>
    </Box>
  </Box>
);

const SectionWeb3in2032 = () => {
  return (
    <Box paddingY="96px" paddingX="80px" textAlign="center">
      <Typography variant="h4">
        What a day in the Web3 life look like in 2032?
      </Typography>
      <Typography fontSize="20px" marginTop="16px">
        Here are some messages from community shows what a day in the Web3 life.
      </Typography>

      <Box display="flex" flexWrap="wrap" marginTop="60px">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {web3in2032Data.map((data, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <NFTCard data={data} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box marginTop="60px" display="flex" justifyContent="center" gap="12px">
        <Button variant="outlined">View More</Button>
        <Button>Post your life in 2032</Button>
      </Box>
    </Box>
  );
};

export default SectionWeb3in2032;
