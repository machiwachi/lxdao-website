import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const CornerIcon = (props) => {
  const useStyles = makeStyles({
    rect: {
      position: 'absolute',
      left: '-6px',
      top: '-6px',
    },
    desc: {
      '&::before': {
        display: 'inline-block',
        content: `"No.${props.index}"`,
        transform: 'rotateZ(-45deg)',
        transformOrigin: 'bottom left',
      },
      position: 'absolute',
      top: 30,
      bottom: 0,
      left: 15,
      zIndex: 100,
      color: '#fff',
      fontSize: '14px',
    },
  });
  const classes = useStyles();

  return (
    <>
      <img
        src="/images/projects/number-bg.png"
        className={classes.rect}
        width="75px"
        height="75px"
      />
      <div className={classes.desc}></div>
    </>
  );
};
const ProjectCard = ({ project, index }) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 4,
        paddingY: 4,
        paddingX: 2,
        cursor: 'pointer',
        overflow: 'visible',
        width: '100%',
      }}
      onClick={() => {
        router.push({
          pathname: `/projects/${project.number}`,
        });
      }}
    >
      <Box sx={{ display: 'flex' }} marginBottom={8}>
        <Box sx={{ marginRight: '26px' }}>
          <Box sx={{ position: 'relative' }}>
            <img
              src={project.logo}
              style={{
                width: '60px',
                height: '60px',
              }}
            />
            <Typography
              sx={{
                background: '#36AFF9',
                width: '38px',
                height: '16px',
                fontSize: '12px',
                lineHeight: '15px',
                color: '#fff',
                position: 'absolute',
                bottom: 2,
                left: '11px',
              }}
            >
              {'#' + project.number}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              marginBottom: '18px',
              fontFamily: 'Avenir medium',
            }}
          >
            {project.name}
          </Typography>
          <Box>
            {project.status && (
              <Chip
                size="small"
                label={project.status}
                variant="outlined"
                sx={{
                  borderRadius: '4px',
                  color: '#4DCC9E',
                  borderColor: '#4DCC9E',
                  fontSize: '12px',
                }}
              />
            )}
          </Box>
          <Box
            display="flex"
            gap="8px"
            flexWrap="wrap"
            justifyContent="center"
            maxHeight={60}
          >
            {project.tags &&
              project.tags.map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    size="small"
                    label={tag}
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
        </Box>
      </Box>
      <Box
        sx={{
          width: '351px',
          height: '200px',
          background: '#FFFFFF',
          border: '0.5px solid #D0D5DD',
          boxShadow: '0px 6px 60px rgba(0, 0, 0, 0.06)',
          borderRadius: '6px',
        }}
      >
        <img style={{ width: '100%' }} src={project.banner} />
      </Box>
      <Typography marginTop={1} color="#666f85" textAlign="left">
        {project.description}
      </Typography>
      <Typography
        color="#101828"
        variant="body1"
        textAlign="left"
        marginTop={4}
        marginBottom={2}
      >
        Builder
      </Typography>
      <Box display="flex" gap="10px" flexWrap="wrap" justifyContent="center">
        {project.builder &&
          project.builder.map((builder) => (
            <Box width={60} height={60} sx={{ position: 'relative' }}>
              <img />
              <Typography
                width={30}
                height={16}
                sx={{ position: 'absolute', top: 0, left: 0 }}
              >
                PM
              </Typography>
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default ProjectCard;
