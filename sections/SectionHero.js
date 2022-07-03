import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledToolTip from '../components/StyledToolTip';

const SectionHero = () => {
  return (
    <Box
      minHeight="calc(100vh - 81px)"
      display="flex"
      paddingY={8}
      paddingX={{ md: 10, xs: 6 }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h3" marginBottom="20px">
        LXDAO is an{' '}
        <StyledToolTip
          placement="top"
          title={
            <Box
              sx={{
                background: '#fff',
                boxShadow: 4,
                padding: '4px 16px',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">Research and Development</Typography>
            </Box>
          }
        >
          <span
            style={{
              borderBottom: '4px dashed #101828',
              cursor: 'pointer',
              fontWeight: '700',
            }}
          >
            R&amp;D
          </span>
        </StyledToolTip>
        -focused DAO in Web3.
      </Typography>
      <Typography
        marginBottom={6}
        fontSize={{ md: '24px', sm: '20px', xs: '18px' }}
        maxWidth={{ md: '700px', sm: '500px', xs: '300px' }}
      >
        Bringing together buidlers to buidl and maintain &quot;
        <StyledToolTip
          placement="top"
          title={
            <Box
              sx={{
                background: '#fff',
                boxShadow: 4,
                padding: '8px 16px',
                borderRadius: 2,
                color: '#101828',
              }}
            >
              <Typography variant="body1">LX = 良心 = Conscience</Typography>
              <Typography variant="body1">
                Core Values: Buidl valuable things
              </Typography>
            </Box>
          }
        >
          <span
            style={{
              borderBottom: '3px dashed #667085',
              cursor: 'pointer',
              fontWeight: '700',
            }}
          >
            LX
          </span>
        </StyledToolTip>
        &quot; projects for Web3, in a sustainable manner.
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
