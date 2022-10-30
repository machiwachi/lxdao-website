import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import API from '@/common/API';

import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';

const SectionHomePageProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get(`/project?page=1&per_page=12`)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setProjects(res?.data?.data);
        } else {
          // todo Muxin common error handling, function invocation
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Box sx={{ background: 'linear-gradient(#FFF4EA 0%, #FFFFFF 100%)' }}>
      <Box paddingY={{ md: '112px', xs: 8 }}>
        <Typography
          variant="h2"
          lineHeight="44px"
          fontWeight={600}
          letterSpacing="-0.02em"
          maxWidth="1216px"
          margin="0 auto"
          marginBottom={3}
        >
          PROJECTS
        </Typography>
        <Typography
          variant="subtitle1"
          ineHeight="30px"
          fontWeight={400}
          color="#666F85"
          maxWidth="1216px"
          margin="0 auto"
          marginBottom={8}
        >
          We buidl good, valuable, and useful things. If you have a perfect idea
          want to become true, please write a proposal first.
        </Typography>
        <Box marginTop={6} overflow="scroll">
          <Box display="flex" alignItems="stretch" flexWrap="nowrap" gap={3}>
            {projects.map((project, index) => {
              return (
                <Box
                  width="500px"
                  key={index}
                  flexShrink={0}
                  sx={{
                    paddingLeft:
                      index === 0 ? 'calc((100vw - Min(1216px, 90vw))/ 2)' : 0,
                    paddingRight:
                      index === projects.length - 1
                        ? 'calc((100vw - Min(1216px, 90vw))/ 2)'
                        : 0,
                  }}
                >
                  <ProjectCard project={project} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box maxWidth="1216px" margin="0 auto" marginTop="110px">
          <Button variant="gradient" width="200px">
            Buidl Your Own
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionHomePageProjects;
