import React from 'react';
import { Box, Typography } from '@mui/material';

function Project({ data }) {
  const project = data.project;
  return (
    <Box display="flex" boxShadow={1} borderRadius={2} overflow="hidden">
      <Box flexBasis="158px">
        <img
          style={{ display: 'block', width: 158 }}
          src={project.logoLarge}
          alt=""
        />
      </Box>
      <Box flex="auto" padding={3} position="relative">
        <Typography fontSize="20px" fontWeight="bold">
          {project.name}
        </Typography>
        <Box display="flex" marginTop={3}>
          <Box flex="1">
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
              Project Manager
            </Typography>
          </Box>
          <Box flex="1">
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
              2022-08-01
            </Typography>
          </Box>
          <Box flex="1">
            <Typography
              marginBottom={1}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Ended at
            </Typography>
            <Typography fontSize="14px" color="#667085">
              -
            </Typography>
          </Box>
        </Box>
        <Typography
          color="#667085"
          sx={{ position: 'absolute', top: '24px', right: '36px' }}
        >
          Project#{project.number}
        </Typography>
      </Box>
    </Box>
  );
}

export default Project;
