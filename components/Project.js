import React from 'react';
import { Img3 } from '@lxdao/img3';
import { Box, Typography, Grid, Link } from '@mui/material';
import { removeItem, getIpfsCid } from '@/utils/utility';
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
        border="0.5px solid #D0D5DD"
        borderRadius="6px"
        overflow="hidden"
        height="100%"
        flexDirection="row"
      >
        <Box flex="0 0 148px">
          <Box
            component="img"
            src={data.project.logoLarge || '/images/placeholder.jpeg'}
            style={{ display: 'block', width: '148px' }}
          />
        </Box>

        <Box flex="auto" padding={3} position="relative">
          <Typography color="#101828" fontWeight="600" variant="subtitle1">
            {data.project.name}
          </Typography>

          <Grid item>
            <Box>
              <Typography
                display="inline-block"
                marginBottom={1}
                fontWeight="400"
                variant="body2"
                color="#666F85"
              >
                Role:
              </Typography>{' '}
              {data.projectRole?.includes('Project Manager') ? (
                <Typography
                  display="inline-block"
                  fontWeight="400"
                  variant="body2"
                  color="#36AFF9"
                >
                  Project Manager
                </Typography>
              ) : null}
              <Typography
                display="inline-block"
                fontWeight="400"
                variant="body2"
                color="#666F85"
              >
                {data.projectRole?.length === 0
                  ? 'Unknown'
                  : removeItem(data.projectRole, 'Project Manager').join(', ')}
              </Typography>
            </Box>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Box>
                <Typography fontSize="14px" color="#667085">
                  {`${data.startAt ? data.startAt.split('T')[0] : ''} ${
                    data.startAt || data.endedAt ? '-' : ''
                  } ${data.endedAt ? data.endedAt.split('T')[0] : ''}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            <Typography
              display="inline-block"
              fontWeight="500"
              variant="body1"
              color="#101828"
            >
              More →
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default Project;
