import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';

const WorkingGroupCard = ({ image, name, link }) => {
  return (
    <Grid item xs={6} sm={6} md={6} lg={4}>
      <Link href={link} sx={{ textDecoration: 'none' }}>
        <Box
          backgroundColor="#F5F5F5"
          height="160px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px 6px 0 0"
        >
          <Box component="img" src={image} />
        </Box>
        <Typography
          variant="body1"
          lineHeight="19px"
          fontWeight={600}
          backgroundColor="#ffffff"
          padding="20px 24px"
          borderRadius="0 0 6px 6px"
        >
          {name}
        </Typography>
      </Link>
    </Grid>
  );
};

export default WorkingGroupCard;
