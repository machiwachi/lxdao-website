import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  Stack,
  Avatar,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Container from '@/components/Container';
import Button from '@/components/Button';
import ContributorCard from '@/components/ContributorCard';

import projects from '@/common/content/projects';
import { AddBox } from '@mui/icons-material';

const useStyles = makeStyles({
  tooltip: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
    width: '335px',
  },
});

const SectionProjectDetail = () => {
  const router = useRouter();
  const route = router.route;
  const projectItem = projects[router.query.id];
  if (!projectItem) return null;

  const [contributorData, setContributorData] = useState(
    projectItem?.contributors
  );

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
          <Box
            width="100%"
            aspectRatio="1 / 1"
            boxShadow="0px 4px 10px 3px rgba(0, 0, 0, 0.04)"
          >
            <img style={{ width: '100%' }} src={projectItem.logoLarge} />
          </Box>
        </Grid>
        <Grid item md={8} justify="flex-start">
          <Stack spacing={3.5}>
            <Box
              display={{ md: 'none', xs: 'flex' }}
              alignItems="flex-end"
              gap="12px"
            >
              <img style={{ width: '60px' }} src={projectItem.logoLarge} />
              <Typography variant="h4" align="left">
                {projectItem.title}
              </Typography>
            </Box>
            <Typography align="left">{projectItem.description}</Typography>
            <Typography align="left">
              {projectItem.type &&
                projectItem.type.map((type, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      label={type}
                      variant="outlined"
                      sx={{
                        marginRight: '5px',
                        borderRadius: '4px',
                        borderColor: '#000000',
                        fontSize: '12px',
                      }}
                    />
                  );
                })}
            </Typography>
            <Box display="flex" gap={5}>
              {projectItem.links &&
                projectItem.links.map((link, index) => {
                  return (
                    <Typography
                      target="_blank"
                      component="a"
                      href={link.url}
                      color="primary"
                    >
                      <Box
                        width="20px"
                        component={'img'}
                        src={`/icons/${link.name}.svg`}
                      />
                    </Typography>
                  );
                })}
            </Box>
            <Box align="left">
              <LabelText label="Creators" />
              <Stack direction="row" spacing={2}>
                {projectItem.contributors &&
                  projectItem.contributors.map((contributor, index) => {
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
            <Stack direction="row" spacing={8}>
              {projectItem.launchDate && (
                <Box align="left">
                  <LabelText label="Launch Date" />
                  <Typography fontSize="20px" color="#000000">
                    {projectItem.launchDate}
                  </Typography>
                </Box>
              )}
              <Box align="left">
                <LabelText label="Status" />
                <Typography fontSize="20px" color="#000000">
                  {projectItem.status}
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
