import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const SimpleProjectCard = ({ data, key }) => (
  <Box
    width={{ sm: '356px', xs: '300px' }}
    height={{ sm: '444px', xs: '375px' }}
    sx={{ background: '#ffffff' }}
    border="0.5px solid #D0D5DD"
    borderRadius="6px"
    key={key}
  >
    <Box
      height={{ sm: '146px', xs: '124px' }}
      width="100%"
      sx={{
        backgroundSize: 'cover',
        backgroundImage: `url(${data.banner})`,
      }}
    />
    <Box padding="10px 20px 20px 20px">
      <Box display="flex" alignItems="center" gap={2}>
        <Box height="48px" width="48px" component={'img'} src={data.logo} />
        <Link
          href={`/projects/${data.number}`}
          target="_blank"
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant="subtitle1" lineHeight="25px" fontWeight={600}>
            {data.name}
          </Typography>
        </Link>
      </Box>
      <Typography
        variant="body1"
        lineHeight={{ sm: '30px', xs: '26px' }}
        fontWeight={400}
        color="#666F85"
        marginTop={2}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {data.description}
      </Typography>
      <Typography
        variant="body1"
        lineHeight="19px"
        fontWeight={600}
        color="#101828"
        marginTop={2}
        marginBottom={1}
      >
        Buidlers
      </Typography>
      <Box display="flex" gap="10px">
        {!!data.buidlers &&
          data.buidlers.map((buidler, index) => {
            return (
              <Link
                key={index}
                href={`/buidlers/${buidler.address}`}
                target="_blank"
              >
                <Box
                  height={{ sm: '60px', xs: '40px' }}
                  width={{ sm: '60px', xs: '40px' }}
                  component={'img'}
                  src={buidler.avatar}
                  border="0.5px solid #D0D5DD"
                />
              </Link>
            );
          })}
      </Box>
    </Box>
  </Box>
);

export default SimpleProjectCard;
