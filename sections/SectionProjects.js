import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { shuffle } from '@/utils/utility';

import Container from '@/components/Container';
import Button from '@/components/Button';

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
        src="/projects/number-bg.png"
        className={classes.rect}
        width="75px"
        height="75px"
      />
      <div className={classes.desc}></div>
    </>
  );
};

const homepageProjects = (indexArray, projects) => {
  return indexArray.map((index) => {
    return projects[index];
  });
};

const SectionProjects = () => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';

  useEffect(() => {
    axios
      .get(`${process.env.LXDAO_API_SYNC_URL}/project?page=1&per_page=12`)
      .then((res) => {
        if (res?.data?.data) {
          const IndexArray = [0, 1, 2, 4];
          const homepageProjectIndexs = shuffle(IndexArray).slice(0, 3);
          setProjects(
            isHomepage
              ? homepageProjects(homepageProjectIndexs, res?.data?.data)
              : res?.data?.data
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Projects-Section"
      maxWidth="1200px"
    >
      <Typography variant="h4">Projects</Typography>
      <Typography fontSize="20px" marginTop={2}>
        We buidl good, valuable, and useful things.
      </Typography>
      <Box marginTop={6}>
        <Grid container spacing={3} alignItems="stretch">
          {projects.length > 0 &&
            projects.map((project, index) => {
              return (
                <Grid
                  key={index}
                  item
                  sm={6}
                  xs={12}
                  md={4}
                  display="flex"
                  alignItems="stretch"
                >
                  <Card
                    sx={{
                      position: 'relative',
                      borderRadius: 4,
                      paddingBottom: 4,
                      cursor: 'pointer',
                      overflow: 'visible',
                    }}
                    onClick={() => {
                      router.push({
                        pathname: `/projects/${project.number}`,
                      });
                    }}
                  >
                    <Box>
                      <img style={{ width: '100%' }} src={project.banner} />
                      <img
                        src={project.logo}
                        style={{
                          width: '30%',
                          height: '30%',
                          marign: '0 auto',
                          marginTop: '-15%',
                        }}
                      />
                      <CornerIcon index={project.number} />
                    </Box>
                    <Typography
                      sx={{
                        marginBottom: '18px',
                        fontFamily: 'Avenir medium',
                      }}
                    >
                      {project.name}
                    </Typography>
                    <Box
                      marginX="20px"
                      display="flex"
                      gap="5px"
                      flexWrap="wrap"
                      justifyContent="center"
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
                    </Box>
                    <Typography
                      marginTop={1}
                      marginX={2.5}
                      color="#666f85"
                      textAlign="left"
                    >
                      {project.description}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {isHomepage ? (
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() => {
              router.push('/projects');
            }}
          >
            View More
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default SectionProjects;
