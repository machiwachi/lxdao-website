import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import projects from '@/common/content/projects';

import Container from '@/components/Container';
import Button from '@/components/Button';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

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
      top: 26,
      bottom: 0,
      left: 19,
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

const SectionProjects = () => {
  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';
  const projectArray = isHomepage ? shuffle(projects).slice(0, 3) : projects;

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
          {projectArray.map((project, index) => {
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
                      pathname: '/projectDetail',
                      query: { id: index },
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
                    <CornerIcon index={`0${index}`} />
                  </Box>
                  <Typography
                    sx={{ marginBottom: '18px', fontFamily: 'Avenir medium' }}
                  >
                    {project.title}
                  </Typography>
                  <Typography marginTop={1}>
                    {project.type &&
                      project.type.map((type, index) => {
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
                  </Typography>
                  <Typography
                    marginY={2}
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
