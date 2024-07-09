import { Box, Grid, Link, Typography } from '@mui/material';

import LXButton from '@/components/Button';
import Project from '@/components/Project';

export default function ProjectsBox({ record }) {
  const projects = record.projects.filter((project) => {
    return project.status === 'ACTIVE';
  });
  return (
    <Box marginTop={3}>
      <Box>
        <Typography
          color="#101828"
          fontWeight="600"
          variant="body1"
          marginBottom={2}
        >
          Project
        </Typography>
      </Box>
      <Box display="flex" marginTop={2}>
        {projects.length ? (
          <Grid container spacing={4}>
            {projects.map((project) => {
              return (
                <Grid item xs={12} md={6} key={project.id}>
                  <Project data={project} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="148px"
            alignItems="center"
            border="0.5px solid #D0D5DD"
            borderRadius="6px"
            padding={2}
          >
            <Typography
              marginTop={{ xs: 0, sm: 2 }}
              marginBottom={{ xs: '16px', sm: '21px' }}
              color="#D0D5DD"
              variant="body1"
              fontWeight="400"
            >
              You have not participated in the project, Go and choose one to
              join.
            </Typography>
            <LXButton size="small" variant="outlined">
              <Link
                href={`/projects`}
                target="_blank"
                sx={{
                  textDecoration: 'none',
                }}
              >
                View Product List
              </Link>
            </LXButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
