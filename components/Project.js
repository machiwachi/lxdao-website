import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

function Project({ data }) {
  return (
    <Link
      href={`/projects/${data.project.number}`}
      target="_blank"
      color={'inherit'}
      sx={{
        textDecoration: 'none',
      }}
    >
      <Box
        display="flex"
        boxShadow={1}
        borderRadius={2}
        overflow="hidden"
        height="100%"
        flexDirection={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <Box flex="0 0 180px">
          <img
            style={{ display: 'block', width: '100%' }}
            src={data.project.logoLarge || '/images/placeholder.jpeg'}
            alt=""
          />
        </Box>

        <Box flex="auto" padding={3} position="relative">
          <Typography fontSize="20px" fontWeight="bold">
            {data.project.name}
          </Typography>
          <Typography
            color="#667085"
            sx={{
              position: {
                xs: 'none',
                lg: 'absolute',
              },
              top: '24px',
              right: '36px',
            }}
          >
            Project#{data.project.number}
          </Typography>
          <Grid container spacing={2} marginTop={3}>
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <Box>
                <Typography
                  marginBottom={1}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Project Role
                </Typography>
                <Typography fontSize="14px" color="#667085">
                  {data.projectRole.join(', ') || 'Unknown'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <Box>
                <Typography
                  marginBottom={1}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Started at
                </Typography>
                <Typography fontSize="14px" color="#667085">
                  {data.createdAt.split('T')[0]}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <Box>
                <Typography
                  marginBottom={1}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  Ended at
                </Typography>
                {/* todo add end date and feature */}
                <Typography fontSize="14px" color="#667085">
                  -
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  );
}

export default Project;
