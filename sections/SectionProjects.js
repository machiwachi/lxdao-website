import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Grid, CircularProgress, Link } from '@mui/material';

import API from '@/common/API';
import { getRandom } from '@/utils/utility';

import Container from '@/components/Container';
import Button from '@/components/Button';
import DebouncedInput from '@/components/DebouncedInput';
import ProjectCard from '@/components/ProjectCard';

const SectionProjects = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const route = router.route;
  const isHomepage = route === '/';

  useEffect(() => {
    searchList();
  }, []);

  const realProjects = isHomepage ? getRandom(projects, 3) : projects;

  const searchList = async (
    search = '',
    currentPage = 0,
    isAddMore = false
  ) => {
    let query = `/project?`;
    let params = [];
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      params.push('search=' + trimmedSearch);
    }
    params.push('page=' + (currentPage || current));
    params.push('per_page=9');
    query += params.join('&');

    if (!isAddMore) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    try {
      const res = await API.get(query);
      const result = res.data;
      if (result.status !== 'SUCCESS') {
        // error todo Muxin add common alert, wang teng design
        return;
      }
      const records = result.data;

      let tempList = [];
      records.forEach((record) => {
        tempList.push(record);
      });
      setHasMore(tempList.length === 6);

      isAddMore
        ? setProjects([...projects, ...tempList])
        : setProjects(tempList);
    } catch (err) {
      console.error(err);
    }
    if (!isAddMore) {
      setLoading(false);
    } else {
      setLoadingMore(false);
    }
  };

  return (
    <Container
      paddingY={{ md: 12, xs: 8 }}
      textAlign="center"
      id="Projects-Section"
      maxWidth="1200px"
      width="auto"
    >
      <Typography
        fontSize="70px"
        fontWeight="600"
        lineHeight="70px"
        color="#101828"
      >
        LXDAO Projects
      </Typography>
      <Typography
        variant="subtitle1"
        lineHeight="30px"
        fontWeight={400}
        color="#666F85"
        marginTop={4}
      >
        We buidl good, valuable, and useful things.If you have a perfect idea
        want to become true, please write a proposal first.
      </Typography>
      <Button variant="gradient" width="200px" margin="0 auto" marginTop={6}>
        <Link
          href="https://www.notion.so/lxdao/How-do-we-work-93038c708217465384cc7d9f377547c5"
          target="_blank"
          sx={{ textDecoration: 'none', color: '#ffffff' }}
        >
          Buidl Your Own
        </Link>
      </Button>
      <Box marginTop={12}>
        <DebouncedInput
          value={search}
          onChange={(value) => {
            setCurrent(1);
            setSearch(value);
            searchList(value, 1);
          }}
          label="Search"
          placeholder="Search project"
          sx={{ maxWidth: '389px', height: '54px' }}
        />
      </Box>
      {loading ? (
        <Box marginTop={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box marginTop={6}>
          <Grid container spacing={3} alignItems="stretch">
            {realProjects.map((project, index) => {
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
                  <ProjectCard project={project} index={index} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
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
      ) : (
        <Box
          marginTop={{ md: 8, xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
        >
          {loadingMore ? (
            <Box marginTop={10} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : hasMore ? (
            <Button
              variant="outlined"
              onClick={() => {
                setCurrent(current + 1);
                searchList(search, current + 1, true);
              }}
            >
              View More
            </Button>
          ) : null}
        </Box>
      )}
    </Container>
  );
};

export default SectionProjects;
