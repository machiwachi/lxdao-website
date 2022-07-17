/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const web3in2032Data = [
  {
    content:
      'After getting up, I signed in chat app by using Connect Wallet and checking the messages from other addresses.',
    createTime: '2032-01-05',
    createAddress: '',
  },
  {
    content:
      'Just joined an awesome metaverse music event with my friends and VR. Purchased the limited NFT music album.',
    createTime: '2032-03-05',
    createAddress: '',
  },
  {
    content:
      'Yesterday, I found a new DAO which I want to join. We have the same consensus, values, and goals. And I can contribute my efforts to the project and share the tokens.',
    createTime: '2032-10-05',
    createAddress: '',
  },
  {
    content:
      'Had a good lunch in a new restaurant, paid for the food with the tokens, and got a visitor SBT. My friends ask me about the taste after they saw the SBT.',
    createTime: '2032-05-15',
    createAddress: '',
  },
  {
    content:
      'Found a great NFT art after lunch. I purchased it after I checked the SBTs of that address. It is a trusted creator.',
    createTime: '2032-04-23',
    createAddress: '',
  },
  {
    content:
      'Just finished my creation of the NFT music album. Many fans purchased it and I got most of the ETHs to focus on creating more.',
    createTime: '2032-08-12',
    createAddress: '',
  },
];

const NFTCard = ({ data }) => (
  <Box
    padding="16px 20px"
    borderRadius="13px"
    boxShadow="0px 4px 10px 3px rgba(0, 0, 0, 0.04)"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    textAlign="left"
    gap="32px"
    width="100%"
  >
    <Box>
      <Typography fontSize="14px" marginBottom="10px">
        {data.createTime}
      </Typography>
      <Typography color="#101828">{data.content}</Typography>
    </Box>
    {/* <Box display="flex" justifyContent="space-between">
      <Typography fontSize="14px">
        {formatAddress(data.createAddress)}
      </Typography>
    </Box> */}
  </Box>
);

const SectionWeb3in2032 = () => {
  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      maxWidth="1200px"
    >
      <Typography variant="h4">
        What a day in the Web3 life look like in 2032?
      </Typography>
      <Typography fontSize="20px" marginTop={2}>
        Here are some messages from the community showing what a day in the Web3
        life.
      </Typography>

      <Box display="flex" flexWrap="wrap" marginTop={{ md: 8, xs: 4 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {web3in2032Data.map((data, index) => {
            return (
              <Grid display="flex" item xs={4} sm={4} md={4} key={index}>
                <NFTCard data={data} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* <Box
        marginTop={{ md: 8, xs: 4 }}
        display="flex"
        justifyContent="center"
        gap={2}
      >
        <Button variant="outlined">View More</Button>
        <Button>Describe your life in 2032</Button>
      </Box> */}
      <Typography variant="body1" marginTop={4}>
        The future of Web3 should be colorful, free, and exciting. We're going
        to buidl projects to make it happen.
      </Typography>
    </Container>
  );
};

export default SectionWeb3in2032;
