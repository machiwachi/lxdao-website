import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import API from '@/common/API';

import Container from '@/components/Container';
import BuidlerCard from '@/components/BuidlerCard';

const useStyles = makeStyles({
  tooltip: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
    width: '335px',
  },
});

const SectionProjectDetail = ({ projectId }) => {
  const [project, setProject] = useState(null);

  const PROJECT_STATUS = {
    WIP: 'WORK IN PROGRESS',
    LAUNCHED: 'LAUNCHED',
  };

  useEffect(() => {
    API.get(`/project/${projectId}`)
      .then((res) => {
        if (res?.data?.data) {
          setProject(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();

  const LabelText = ({ label }) => {
    return (
      <Typography
        color="#666F85"
        fontSize="16px"
        textAlign="left"
        marginBottom={1.5}
      >
        {label}
      </Typography>
    );
  };

  const handleDisplayBuidlerTooltip = (data, status) => {
    const cloneProjectData = { ...project };
    cloneProjectData?.buidlersOnProject.forEach((item) => {
      if (item.id === data.id) {
        item.showTooltip = status === 'open';
      }
    });
    setProject(cloneProjectData);
  };

  if (!project) return null;

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Project-Detail-Section"
      maxWidth="1200px"
      minHeight="calc(100vh - 280px)"
    >
      <Grid container spacing={4}>
        <Grid item xs={4} display={{ md: 'block', xs: 'none' }}>
          <img
            style={{
              width: '100%',
              boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
            }}
            src={project.logoLarge}
          />
        </Grid>
        <Grid item md={8} justify="flex-start">
          <Stack spacing={3.5}>
            <Box
              display={{ md: 'none', xs: 'flex' }}
              alignItems="flex-end"
              gap="12px"
            >
              <img style={{ width: '50px' }} src={project.logoLarge} />
              <Typography variant="h5" align="left">
                {project.name}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              align="left"
              display={{ md: 'block', xs: 'none' }}
            >
              {project.name}
            </Typography>
            <Typography align="left">{project.description}</Typography>
            <Box align="left" display="flex" gap="5px" flexWrap="wrap">
              {project.type &&
                project.type.map((type, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      label={type}
                      variant="outlined"
                      sx={{
                        borderRadius: '4px',
                        borderColor: '#000000',
                        fontSize: '12px',
                      }}
                    />
                  );
                })}
            </Box>
            <Box display="flex" gap={4} flexWrap="wrap">
              {project.links &&
                Object.keys(project.links).map((key, index) => {
                  return (
                    <Typography
                      target="_blank"
                      component="a"
                      href={project.links[key]}
                      color="primary"
                      key={index}
                    >
                      <Box
                        width="20px"
                        component={'img'}
                        src={`/icons/${key}.svg`}
                      />
                    </Typography>
                  );
                })}
            </Box>
            {project?.buidlersOnProject?.length > 0 && (
              <Box align="left">
                <LabelText label="Buidlers" />
                <Stack direction="row" spacing={2}>
                  {project.buidlersOnProject.map((buidler, index) => {
                    return (
                      <Tooltip
                        key={index}
                        title={<BuidlerCard buidlerInfo={buidler} />}
                        open={buidler.showTooltip}
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={() =>
                          handleDisplayBuidlerTooltip(buidler, 'close')
                        }
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Avatar
                          key={index}
                          alt={buidler?.buidler?.name}
                          src={buidler?.buidler?.image}
                          sx={{ cursor: 'pointer' }}
                          onMouseOver={() =>
                            handleDisplayBuidlerTooltip(buidler, 'open')
                          }
                        />
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={8}>
              {project.launchDate && (
                <Box align="left">
                  <LabelText label="Launch Date" />
                  <Typography
                    fontSize={{ md: '20px', xs: '18px' }}
                    color="#000000"
                  >
                    {format(new Date(project.launchDate), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
              )}
              <Box align="left">
                <LabelText label="Status" />
                <Typography
                  fontSize={{ md: '20px', xs: '18px' }}
                  color="#000000"
                >
                  {PROJECT_STATUS[project.status]}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionProjectDetail;
