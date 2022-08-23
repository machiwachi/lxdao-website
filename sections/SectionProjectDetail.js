import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
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

import Container from '@/components/Container';
import ContributorCard from '@/components/ContributorCard';

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
  // const [contributorData, setContributorData] = useState(
  //   projectItem?.contributors
  // );

  const PROJECT_STATUS = {
    WIP: 'WORK IN PROGRESS',
    LAUNCHED: 'LAUNCHED',
  };

  useEffect(() => {
    axios
      .get(`${process.env.LXDAO_API_SYNC_URL}/project/${projectId}`)
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

  const handleDisplayContributorTooltip = (data, status) => {
    const cloneContributorData = [...contributorData];
    cloneContributorData.forEach((item) => {
      if (item.name === data.name) {
        item.showTooltip = status === 'open';
      }
    });
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
            {project.contributors && (
              <Box align="left">
                <LabelText label="Buidlers" />
                <Stack direction="row" spacing={2}>
                  {project.contributors.map((contributor, index) => {
                    return (
                      <Tooltip
                        title={
                          <ContributorCard contributorInfo={contributor} />
                        }
                        open={contributor.showTooltip}
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={() =>
                          handleDisplayContributorTooltip(contributor, 'close')
                        }
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Avatar
                          key={index}
                          alt={contributor.name}
                          src={contributor.avatar}
                          sx={{ cursor: 'pointer' }}
                          onMouseover={() =>
                            handleDisplayContributorTooltip(contributor, 'open')
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
                    {moment(project.launchDate).format('YYYY-MM-DD')}
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
