import React from 'react';
import { Box, Typography } from '@mui/material';

import Container from '@/components/Container';

const SectionProjects = () => (
  <Container
    paddingY={{ md: '96px', xs: 8 }}
    textAlign="center"
    id="Projects-Section"
    maxWidth
  >
    <Typography variant="h4">Previous Projects</Typography>
    <Typography fontSize="20px" marginTop={2}>
      We buidl good, valuable, and useful things.
    </Typography>
    <Box
      display="flex"
      flexDirection={{ md: 'row', xs: 'column' }}
      gap={{ md: 8, xs: 4 }}
      alignItems={{ md: 'stretch', xs: 'center' }}
      marginTop={6}
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        width={{ md: '320px', xs: '100%' }}
        border="2px solid #000000"
        boxShadow="0 3px 6px 0 rgb(140 152 164 / 25%)"
        borderRadius="8px"
        overflow="hidden"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          window.open('https://gclx.xyz/', '_blank');
        }}
      >
        <Box
          width="100%"
          height="120px"
          sx={{
            backgroundImage: 'url("/images/gclx-banner.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Box padding="0 24px 24px 24px" boxSizing="border-box">
          <Box
            component="img"
            position="relative"
            bottom="27px"
            width="45px"
            src="/images/gclx-logo.png"
            padding={1}
            sx={{
              borderRadius: '50%',
              boxShadow: '0 3px 6px 0 rgb(140 152 164 / 25%)',
            }}
          ></Box>
          <Typography
            fontSize="20px"
            lineHeight="30px"
            color="#101828"
            marginBottom="8px"
          >
            GuoChanLiangXin
          </Typography>
          <Typography fontSize="16px" lineHeight="24px">
            GCLX NFT project is a Performance Art. It made by 1000 randomly
            generated NFTs, sold for 0.01 ETH. Using funny content to tell
            Chinese NFT players what NFTs truely are.
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width={{ md: '320px', xs: '100%' }}
        border="2px solid #000000"
        boxShadow="0 3px 6px 0 rgb(140 152 164 / 25%)"
        borderRadius="8px"
        overflow="hidden"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          window.open('https://myfirstnft.info/', '_blank');
        }}
      >
        <Box
          width="100%"
          height="120px"
          sx={{
            backgroundImage: 'url("/images/mfnft-banner.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Box padding="0 24px 24px 24px" boxSizing="border-box">
          <Box
            component="img"
            position="relative"
            bottom="27px"
            width="45px"
            src="/images/mfnft-logo.png"
            padding={1}
            sx={{
              borderRadius: '50%',
              boxShadow: '0 3px 6px 0 rgb(140 152 164 / 25%)',
            }}
          ></Box>
          <Typography
            fontSize="20px"
            lineHeight="30px"
            color="#101828"
            marginBottom={1}
          >
            My First NFT
          </Typography>
          <Typography fontSize="16px" lineHeight="24px">
            MyFirstNFT is a non-profit instructional project for Web3 newbies.
            Get a FREE NFT while learning about Web3, underlying values of NFT,
            and security principles.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Container>
);

export default SectionProjects;
