import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionHero = () => {
  return (
    <Box
      height="calc(100vh - 81px)"
      display="flex"
      paddingX="80px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" marginBottom="20px">
        Let&apos;s buidl a better Web3 together!
      </Typography>
      <Typography marginBottom="48px" fontSize="24px" maxWidth="700px">
        Bringing together buidlers to buidl and maintain &quot;LX&quot; projects
        for Web3, in a sustainable manner.
      </Typography>
      <iframe
        width="768"
        height="432"
        src="https://www.youtube.com/embed/TDkWZNSs9NU"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </Box>
  );
};

export default SectionHero;
