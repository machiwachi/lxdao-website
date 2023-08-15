import React from 'react';
import { Typography, Box, Link, Grid } from '@mui/material';

const WorkingGroupSimpleCard = ({ key, name, id, role }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Link
        href={`/workingGroups/${id}`}
        sx={{ textDecoration: 'none' }}
        target="_blank"
      >
        <Box
          borderRadius="6px"
          padding="20px 24px"
          backgroundColor="#ffffff"
          border="0.5px solid #D0D5DD"
        >
          <Typography variant="body1" fontSize="20px" fontWeight={600}>
            {name}
          </Typography>
          <Typography
            variant="body1"
            fontSize="14px"
            marginTop="24px"
            color="rgb(102, 111, 133)"
          >
            Role: {role[0]}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default WorkingGroupSimpleCard;
