import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionHero = () => {
  return (
    <Box
      height="calc(100vh - 81px)"
      display="flex"
      paddingX={{ md: 10, xs: 6 }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" marginBottom="20px">
        LXDAO is an R&D-focused DAO in Web3.
      </Typography>
      <Typography
        marginBottom={6}
        fontSize={{ md: '24px', sm: '20px', xs: '18px' }}
        maxWidth={{ md: '700px', sm: '500px', xs: '300px' }}
      >
        Bringing together buidlers to buidl and maintain &quot;LX&quot; projects
        for Web3, in a sustainable manner.
      </Typography>
      <Box
        width={{ lg: '768px', md: '650px', sm: '450px', xs: '100%' }}
        height={{ lg: '432px', md: '367px', sm: '300px', xs: '250px' }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/TDkWZNSs9NU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </Box>
    </Box>
  );
};

export default SectionHero;
