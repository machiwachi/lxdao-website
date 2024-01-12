import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Avatar,
  Card,
  Chip,
  Link,
  Skeleton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Img3 } from '@lxdao/img3';
import { getImg3DidStrFromUrl } from '@/utils/utility';

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
        paddingY: 4,
        paddingX: 2,
        cursor: 'pointer',
        overflow: 'visible',
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
      }}
      onClick={() => {
        router.push({
          pathname: `/projects/${project.number}`,
        });
      }}
      key={index}
    >
      <Box sx={{ display: 'flex' }} marginBottom={4}>
        <Box sx={{ marginRight: '26px' }}>
          <Box sx={{ position: 'relative' }}>
            <Img3
              src={getImg3DidStrFromUrl(project.logo)}
              style={{
                width: '60px',
                height: '60px',
                border: '0.5px solid #D0D5DD',
                borderRadius: '50%',
              }}
            />

            <Typography
              sx={{
                background: '#36AFF9',
                width: '38px',
                height: '16px',
                fontSize: '12px',
                lineHeight: '16px',
                color: '#fff',
                position: 'absolute',
                bottom: '2px',
                left: '11px',
                textAlign: 'center',
              }}
            >
              {'#' + project.number}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="left">
          <Typography
            sx={{
              marginBottom: { xs: '8px', md: '16px' },
              fontWeight: 600,
              color: '#101828',
            }}
            textAlign="left"
            variant="subtitle1"
          >
            {project.name}
          </Typography>
          <Box
            display="flex"
            gap={{ md: '8px', xs: '4px' }}
            flexWrap="wrap"
            justifyContent="flex-start"
            height={60}
          >
            {project.status && (
              <Chip
                size="small"
                label={project.status}
                variant="outlined"
                sx={{
                  borderRadius: '4px',
                  fontSize: '14px',
                  background: 'rgba(77, 204, 158, 0.1)',
                  color: '#4DCC9E',
                  border: 'none',
                }}
              />
            )}
            {project.tags &&
              project.tags.map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    size="small"
                    label={tag}
                    variant="outlined"
                    sx={{
                      borderRadius: '2px',
                      fontSize: '14px',
                      border: 'none',
                      color: '#36AFF9',
                      background: 'rgba(54, 175, 249, 0.1)',
                    }}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          background: '#FFFFFF',
          border: '0.5px solid #D0D5DD',
          boxShadow: '0px 6px 60px rgba(0, 0, 0, 0.06)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <Img3
          src={getImg3DidStrFromUrl(project.banner)}
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </Box>
      {project.description ? (
        <Typography
          marginTop={1}
          color="#666f85"
          textAlign="left"
          variant="body1"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
          }}
        >
          {project.description}
        </Typography>
      ) : (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={72}
          sx={{ marginTop: 1 }}
        />
      )}
      {project.buidlersOnProject.length > 0 ? (
        <>
          <Typography
            color="#101828"
            variant="body1"
            textAlign="left"
            fontWeight={600}
            marginTop={4}
            marginBottom={2}
          >
            Buidler
          </Typography>
          <Box
            display="flex"
            gap="10px"
            flexWrap="noWrap"
            justifyContent="flex-start"
            overflow="hidden"
          >
            {project.buidlersOnProject
              .sort((a, b) => {
                if (a.projectRole.includes('Project Manager')) return -1;
                if (b.projectRole.includes('Project Manager')) return 1;
                return 0;
              })
              .map((buidler, index) => {
                return (
                  <Link
                    key={index}
                    href={`/buidlers/${buidler?.buidler?.address}`}
                  >
                    <Box
                      width={60}
                      height={60}
                      sx={{
                        position: 'relative',
                        border: '0.5px solid #D0D5DD',
                        borderRadius: '2px',
                      }}
                    >
                      <Img3
                        key={index}
                        src={getImg3DidStrFromUrl(buidler?.buidler?.avatar)}
                        style={{
                          cursor: 'pointer',
                          zIndex: 2,
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      {buidler?.projectRole.includes('Project Manager') && (
                        <Typography
                          position="absolute"
                          sx={{
                            left: 0,
                            top: 0,
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#fff',
                            background: '#36AFF9',
                            width: '30px',
                            zIndex: 3,
                            textAlign: 'center',
                          }}
                        >
                          PM
                        </Typography>
                      )}
                      {buidler.status == 'PENDING' && (
                        <Box
                          position="absolute"
                          width="100%"
                          height="100%"
                          sx={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '2px',
                            top: 0,
                            left: 0,
                            zIndex: 3,
                          }}
                        ></Box>
                      )}
                    </Box>
                  </Link>
                );
              })}
          </Box>
        </>
      ) : null}
    </Card>
  );
};

export default ProjectCard;
